import { useEffect, useMemo, useRef, useState, type PointerEvent, type PointerEventHandler } from "react";

import type { ProjectWithStats } from "@/lib/github";

import { EDGE_PADDING, TOP_PADDING } from "@/components/physics/constants";
import type { Body, Category, DragState, PointerState } from "@/components/physics/types";
import { buildInitialBodies, clamp, createHeroTargets, createMagnetTargets, hashSeed, toCategories } from "@/components/physics/utils";

type UsePortfolioPhysicsArgs = {
  projects: ProjectWithStats[];
  query: string;
  disablePhysics?: boolean;
};

function normalizeSearch(value: string): string {
  return value.toLowerCase().replace(/[-_/]+/g, " ").replace(/\s+/g, " ").trim();
}

export function usePortfolioPhysics({ projects, query, disablePhysics = false }: UsePortfolioPhysicsArgs) {
  const containerRef = useRef<HTMLElement>(null);
  const [viewport, setViewport] = useState({ width: 1280, height: 820 });
  const [bodies, setBodies] = useState<Body[]>([]);
  const [hoveredRepo, setHoveredRepo] = useState<string | null>(null);
  const [physicsReady, setPhysicsReady] = useState(false);

  const mouseRef = useRef<PointerState>({ x: 0, y: 0, vx: 0, vy: 0, active: false });
  const lastMouseRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragRef = useRef<DragState>({
    repo: null,
    pointerId: null,
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0
  });

  const categoryByRepo = useMemo(() => {
    const mapped: Record<string, Category[]> = {};
    projects.forEach((project: ProjectWithStats) => {
      mapped[project.repo] = toCategories(project);
    });
    return mapped;
  }, [projects]);

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;
  const isCompactViewport = viewport.width < 900;

  const matches = useMemo(() => {
    if (!isSearching) return projects;

    const terms = normalizeSearch(normalizedQuery)
      .split(" ")
      .filter(Boolean);

    return projects.filter((project: ProjectWithStats) => {
      const categories = categoryByRepo[project.repo] ?? ["tooling"];
      const searchable = [
        project.name,
        project.description,
        ...project.tags,
        ...categories,
        ...categories.map((category: Category) => category.replace(/-/g, " "))
      ].join(" ");

      const haystack = normalizeSearch(searchable);
      return terms.every((term: string) => haystack.includes(term));
    });
  }, [categoryByRepo, isSearching, normalizedQuery, projects]);

  const matchSet = useMemo(() => new Set(matches.map((project: ProjectWithStats) => project.repo)), [matches]);
  const heroSet = useMemo(
    () => new Set(projects.filter((project: ProjectWithStats) => project.size === "hero").map((project: ProjectWithStats) => project.repo)),
    [projects]
  );

  const hasCategoryOverlap = (a: Category[], b: Category[]): boolean => a.some((category: Category) => b.includes(category));

  const magnets = useMemo(() => createMagnetTargets(matches, viewport.width, viewport.height), [matches, viewport.height, viewport.width]);
  const heroTargets = useMemo(() => createHeroTargets(projects, viewport.width, viewport.height), [projects, viewport.height, viewport.width]);
  const bodyMap = useMemo(() => new Map(bodies.map((body: Body) => [body.repo, body])), [bodies]);

  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setViewport({ width: Math.max(360, rect.width), height: Math.max(520, rect.height) });
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setBodies(buildInitialBodies(projects, viewport.width, viewport.height));
  }, [projects, viewport.height, viewport.width]);

  useEffect(() => {
    if (disablePhysics) {
      setPhysicsReady(false);
      return;
    }

    if (physicsReady) return;

    let cancelled = false;
    const start = () => {
      if (!cancelled) {
        setPhysicsReady(true);
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in globalThis) {
      const idleId = window.requestIdleCallback(start, { timeout: 450 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timerId = setTimeout(start, 180);
    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [disablePhysics, physicsReady]);

  useEffect(() => {
    if (disablePhysics || !bodies.length || !physicsReady) return;

    let frame = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.03, (now - last) / 1000);
      last = now;

      setBodies((prev: Body[]) => {
        const next = prev.map((body: Body) => ({ ...body }));

        for (let i = 0; i < next.length; i += 1) {
          const a = next[i];

          for (let j = i + 1; j < next.length; j += 1) {
            const b = next[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.max(1, Math.hypot(dx, dy));
            const nx = dx / dist;
            const ny = dy / dist;

            const rA = Math.max(a.width, a.height) * 0.34;
            const rB = Math.max(b.width, b.height) * 0.34;
            const minDist = (rA + rB) * 1.08;
            const avoidDist = minDist * 1.28;

            const multiplier = a.repo === hoveredRepo || b.repo === hoveredRepo ? 0.08 : 1;
            const compactForceScale = isCompactViewport ? 0.42 : 1;
            const baseRepel = ((560 * rA * rB) / (dist * dist)) * compactForceScale;
            const nearBoost = dist < avoidDist ? 1 + ((avoidDist - dist) / avoidDist) * (isCompactViewport ? 1.35 : 2.2) : 1;
            const repel = Math.min(20000, baseRepel * nearBoost * multiplier);

            const fx = nx * repel;
            const fy = ny * repel;
            a.vx -= (fx / a.mass) * dt;
            a.vy -= (fy / a.mass) * dt;
            b.vx += (fx / b.mass) * dt;
            b.vy += (fy / b.mass) * dt;

            if (
              !isSearching &&
              hasCategoryOverlap(categoryByRepo[a.repo] ?? ["tooling"], categoryByRepo[b.repo] ?? ["tooling"]) &&
              a.repo !== hoveredRepo &&
              b.repo !== hoveredRepo &&
              dist > avoidDist * 1.25
            ) {
              const attract = Math.min(isCompactViewport ? 36 : 70, (dist - avoidDist * 1.25) * (isCompactViewport ? 0.06 : 0.1));
              a.vx += (nx * attract * dt) / a.mass;
              a.vy += (ny * attract * dt) / a.mass;
              b.vx -= (nx * attract * dt) / b.mass;
              b.vy -= (ny * attract * dt) / b.mass;
            }

            if (dist < minDist) {
              const overlap = minDist - dist;
              const push = overlap * 0.46;
              a.x -= nx * push;
              a.y -= ny * push;
              b.x += nx * push;
              b.y += ny * push;

              a.vx -= nx * overlap * 2.2;
              a.vy -= ny * overlap * 2.2;
              b.vx += nx * overlap * 2.2;
              b.vy += ny * overlap * 2.2;
            }
          }
        }

        const mouse = mouseRef.current;
        const mouseSpeed = Math.hypot(mouse.vx, mouse.vy);
        const drag = dragRef.current;

        for (const body of next) {
          const isHovered = body.repo === hoveredRepo;
          const isDragging = drag.repo === body.repo;
          const isHero = heroSet.has(body.repo);

          const minX = EDGE_PADDING + body.width / 2;
          const maxX = viewport.width - EDGE_PADDING - body.width / 2;
          const minY = TOP_PADDING + body.height / 2;
          const maxY = viewport.height - EDGE_PADDING - body.height / 2;

          if (isDragging) {
            const targetX = clamp(drag.x - drag.offsetX, minX, maxX);
            const targetY = clamp(drag.y - drag.offsetY, minY, maxY);
            body.x = targetX;
            body.y = targetY;
            body.vx = drag.vx * 0.72;
            body.vy = drag.vy * 0.72;
            continue;
          }

          if (mouse.active && !isHovered && mouseSpeed > 10) {
            const dx = mouse.x - body.x;
            const dy = mouse.y - body.y;
            const dist = Math.max(1, Math.hypot(dx, dy));
            const influence = isCompactViewport ? 160 : 220;

            if (dist < influence) {
              const nX = dx / dist;
              const nY = dy / dist;
              const tangentX = -nY;
              const tangentY = nX;
              const power = ((influence - dist) / influence) ** 1.55;
              const speedBoost = Math.min(2, mouseSpeed / 720);
              const spinSign = Math.sign(mouse.vx * nY - mouse.vy * nX) || 1;

              const pullStrength = (isCompactViewport ? 20 : 36) + speedBoost * (isCompactViewport ? 64 : 110);
              const swirlStrength = (isCompactViewport ? 34 : 56) + speedBoost * (isCompactViewport ? 90 : 150);

              body.vx += (nX * pullStrength + tangentX * swirlStrength * spinSign) * power * dt;
              body.vy += (nY * pullStrength + tangentY * swirlStrength * spinSign) * power * dt;

              if (mouseSpeed > 35) {
                const dirX = mouse.vx / mouseSpeed;
                const dirY = mouse.vy / mouseSpeed;
                const ahead = dx * dirX + dy * dirY;
                const side = Math.abs(dx * -dirY + dy * dirX);

                if (ahead > -90 && ahead < 180 && side < 130) {
                  const wake = (1 - side / 130) * (1 - clamp(ahead, 0, 180) / 180);
                  const wakeStrength = isCompactViewport ? 70 : 110;
                  body.vx += dirX * wake * speedBoost * wakeStrength * dt;
                  body.vy += dirY * wake * speedBoost * wakeStrength * dt;
                }
              }
            }
          }

          if (isSearching && matchSet.has(body.repo)) {
            const target = magnets[body.repo];
            if (target) {
              body.vx += (target.x - body.x) * 1.9 * dt;
              body.vy += (target.y - body.y) * 1.9 * dt;
            }
          }

          if (!isSearching) {
            const heroTarget = heroTargets[body.repo];
            if (heroTarget) {
              const heroPull = isCompactViewport ? 0.72 : 0.95;
              body.vx += (heroTarget.x - body.x) * heroPull * dt;
              body.vy += (heroTarget.y - body.y) * heroPull * dt;
            } else {
              const seed = hashSeed(body.repo);
              const time = now / 1000;
              const wanderX = Math.sin(time * 0.34 + seed * 0.0009) * 44;
              const wanderY = Math.cos(time * 0.28 + seed * 0.0007) * 34;
              const targetX = body.homeX + wanderX;
              const targetY = body.homeY + wanderY;

              const homePull = isCompactViewport ? 0.36 : 0.46;
              body.vx += (targetX - body.x) * homePull * dt;
              body.vy += (targetY - body.y) * homePull * dt;

              const swirl = Math.sin(time * 0.7 + seed * 0.0004) * (isCompactViewport ? 6 : 9);
              body.vx += ((seed % 2 === 0 ? 1 : -1) * swirl * dt) / body.mass;
            }
          }

          const damping = isDragging
            ? 0.92
            : isHovered
              ? 0.72
              : isCompactViewport
                ? 0.955
                : isHero
                  ? 0.979
                  : isSearching
                    ? 0.972
                    : 0.975;
          body.vx *= damping;
          body.vy *= damping;

          const speed = Math.hypot(body.vx, body.vy);
          if (isHovered && !isDragging) {
            if (speed < 8) {
              body.vx = 0;
              body.vy = 0;
            }
          } else if (speed < 0.7) {
            body.vx = 0;
            body.vy = 0;
          }

          body.x += body.vx * dt;
          body.y += body.vy * dt;

          if (body.x < minX) {
            body.x = minX;
            body.vx = Math.abs(body.vx) * (isCompactViewport ? 0.42 : 0.56);
          } else if (body.x > maxX) {
            body.x = maxX;
            body.vx = -Math.abs(body.vx) * (isCompactViewport ? 0.42 : 0.56);
          }

          if (body.y < minY) {
            body.y = minY;
            body.vy = Math.abs(body.vy) * (isCompactViewport ? 0.42 : 0.56);
          } else if (body.y > maxY) {
            body.y = maxY;
            body.vy = -Math.abs(body.vy) * (isCompactViewport ? 0.42 : 0.56);
          }
        }

        return next;
      });

      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [bodies.length, categoryByRepo, disablePhysics, heroSet, heroTargets, hoveredRepo, isCompactViewport, isSearching, magnets, matchSet, physicsReady, viewport.height, viewport.width]);

  const onSurfacePointerMove: PointerEventHandler<HTMLElement> = (event) => {
    if (disablePhysics) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const now = performance.now();

    const prev = lastMouseRef.current;
    if (prev) {
      const dt = Math.max(0.01, (now - prev.t) / 1000);
      mouseRef.current.vx = (x - prev.x) / dt;
      mouseRef.current.vy = (y - prev.y) / dt;
    }

    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.active = true;
    lastMouseRef.current = { x, y, t: now };

    const drag = dragRef.current;
    if (drag.repo && drag.pointerId === event.pointerId) {
      const dt = Math.max(0.01, (now - drag.lastT) / 1000);
      drag.vx = (x - drag.lastX) / dt;
      drag.vy = (y - drag.lastY) / dt;
      drag.x = x;
      drag.y = y;
      drag.lastX = x;
      drag.lastY = y;
      drag.lastT = now;
    }
  };

  const onSurfacePointerUp: PointerEventHandler<HTMLElement> = (event) => {
    if (disablePhysics) {
      return;
    }

    const drag = dragRef.current;
    if (drag.repo && drag.pointerId === event.pointerId) {
      setBodies((prev: Body[]) =>
        prev.map((body: Body) => {
          if (body.repo !== drag.repo) return body;
          return {
            ...body,
            vx: drag.vx * 0.72,
            vy: drag.vy * 0.72
          };
        })
      );
      drag.repo = null;
      drag.pointerId = null;
    }
  };

  const onSurfacePointerCancel = () => {
    if (disablePhysics) {
      return;
    }

    dragRef.current.repo = null;
    dragRef.current.pointerId = null;
  };

  const onSurfacePointerLeave = () => {
    if (disablePhysics) {
      return;
    }

    mouseRef.current.active = false;
    mouseRef.current.vx = 0;
    mouseRef.current.vy = 0;
    lastMouseRef.current = null;
    dragRef.current.repo = null;
    dragRef.current.pointerId = null;
    setHoveredRepo(null);
  };

  const startCardDrag = (projectRepo: string, body: Body, event: PointerEvent<HTMLDivElement>) => {
    if (disablePhysics) {
      return;
    }

    if (!containerRef.current) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const pointerX = event.clientX - containerRect.left;
    const pointerY = event.clientY - containerRect.top;

    const now = performance.now();
    dragRef.current.repo = projectRepo;
    dragRef.current.pointerId = event.pointerId;
    dragRef.current.offsetX = pointerX - body.x;
    dragRef.current.offsetY = pointerY - body.y;
    dragRef.current.x = pointerX;
    dragRef.current.y = pointerY;
    dragRef.current.vx = 0;
    dragRef.current.vy = 0;
    dragRef.current.lastX = pointerX;
    dragRef.current.lastY = pointerY;
    dragRef.current.lastT = now;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  return {
    containerRef,
    bodyMap,
    hoveredRepo,
    setHoveredRepo,
    isSearching,
    matchSet,
    categoryByRepo,
    onSurfacePointerMove,
    onSurfacePointerUp,
    onSurfacePointerCancel,
    onSurfacePointerLeave,
    startCardDrag,
    isDragging: (repo: string) => dragRef.current.repo === repo
  };
}
