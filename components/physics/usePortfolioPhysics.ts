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
  const isDenseViewport = viewport.width < 1280;

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
      const dt = Math.min(0.018, Math.max(0.001, (now - last) / 1000));
      last = now;
      const time = now / 1000;

      setBodies((prev: Body[]) => {
        const next = prev.map((body: Body) => ({ ...body }));
        const drag = dragRef.current;
        const mouse = mouseRef.current;
        const mouseSpeed = Math.hypot(mouse.vx, mouse.vy);

        const getTarget = (body: Body): { x: number; y: number } => {
          if (isSearching && matchSet.has(body.repo)) {
            return magnets[body.repo] ?? { x: body.homeX, y: body.homeY };
          }

          const heroTarget = heroTargets[body.repo];
          if (!isSearching && heroTarget) {
            return heroTarget;
          }

          const seed = hashSeed(body.repo);
          const orbitX = isCompactViewport ? 8 : isDenseViewport ? 12 : 18;
          const orbitY = isCompactViewport ? 6 : isDenseViewport ? 10 : 14;

          return {
            x: body.homeX + Math.sin(time * 0.33 + seed * 0.0009) * orbitX,
            y: body.homeY + Math.cos(time * 0.27 + seed * 0.0007) * orbitY
          };
        };

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
            const comfortDist = (rA + rB) * (isCompactViewport ? 0.72 : isDenseViewport ? 0.78 : 0.84);

            if (dist < comfortDist) {
              const overlap = comfortDist - dist;
              const hoverMultiplier = a.repo === hoveredRepo || b.repo === hoveredRepo ? 0.15 : 1;
              const push = overlap * (isCompactViewport ? 0.2 : isDenseViewport ? 0.24 : 0.28) * hoverMultiplier;
              a.x -= nx * push;
              a.y -= ny * push;
              b.x += nx * push;
              b.y += ny * push;

              const impulse = overlap * (isCompactViewport ? 0.35 : isDenseViewport ? 0.45 : 0.55) * hoverMultiplier;
              a.vx -= nx * impulse;
              a.vy -= ny * impulse;
              b.vx += nx * impulse;
              b.vy += ny * impulse;
            }
          }
        }

        for (const body of next) {
          const isHovered = body.repo === hoveredRepo;
          const isDragging = drag.repo === body.repo;
          const isHero = heroSet.has(body.repo);
          const target = getTarget(body);

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

          const targetStrength = isSearching && matchSet.has(body.repo)
            ? isCompactViewport
              ? 0.75
              : isDenseViewport
                ? 0.9
                : 1.1
            : isHero
              ? isCompactViewport
                ? 0.2
                : isDenseViewport
                  ? 0.28
                  : 0.36
              : isCompactViewport
                ? 0.12
                : isDenseViewport
                  ? 0.16
                  : 0.2;

          body.vx += (target.x - body.x) * targetStrength * dt;
          body.vy += (target.y - body.y) * targetStrength * dt;

          if (mouse.active && !isHovered && mouseSpeed > 12) {
            const dx = mouse.x - body.x;
            const dy = mouse.y - body.y;
            const dist = Math.max(1, Math.hypot(dx, dy));
            const influence = isCompactViewport ? 110 : isDenseViewport ? 130 : 160;

            if (dist < influence) {
              const nX = dx / dist;
              const nY = dy / dist;
              const tangentX = -nY;
              const tangentY = nX;
              const power = ((influence - dist) / influence) ** 1.9;
              const speedBoost = Math.min(2, mouseSpeed / 720);
              const spinSign = Math.sign(mouse.vx * nY - mouse.vy * nX) || 1;

              const advectStrength = isCompactViewport ? 0.009 : isDenseViewport ? 0.012 : 0.015;
              const swirlStrength = (isCompactViewport ? 6 : isDenseViewport ? 8 : 10) * power;

              body.vx += mouse.vx * power * speedBoost * advectStrength * dt;
              body.vy += mouse.vy * power * speedBoost * advectStrength * dt;
              body.vx += tangentX * swirlStrength * spinSign * dt;
              body.vy += tangentY * swirlStrength * spinSign * dt;
            }
          }

          const softWall = isCompactViewport ? 18 : isDenseViewport ? 22 : 28;
          const wallPull = isCompactViewport ? 0.5 : isDenseViewport ? 0.65 : 0.8;
          if (body.x < minX + softWall) body.vx += (minX + softWall - body.x) * wallPull * dt;
          if (body.x > maxX - softWall) body.vx -= (body.x - (maxX - softWall)) * wallPull * dt;
          if (body.y < minY + softWall) body.vy += (minY + softWall - body.y) * wallPull * dt;
          if (body.y > maxY - softWall) body.vy -= (body.y - (maxY - softWall)) * wallPull * dt;

          const damping = isDragging
            ? 0.84
            : isHovered
              ? 0.48
              : isCompactViewport
                ? 0.86
                : isDenseViewport
                  ? 0.88
                  : isHero
                    ? 0.9
                    : isSearching
                      ? 0.89
                      : 0.9;
          body.vx *= damping;
          body.vy *= damping;

          const maxSpeed = isCompactViewport ? 90 : isDenseViewport ? 120 : 150;
          const speed = Math.hypot(body.vx, body.vy);
          if (speed > maxSpeed) {
            const velocityScale = maxSpeed / speed;
            body.vx *= velocityScale;
            body.vy *= velocityScale;
          }

          if (isHovered && !isDragging) {
            if (speed < 2.5) {
              body.vx = 0;
              body.vy = 0;
            }
          } else if (speed < 0.25) {
            body.vx = 0;
            body.vy = 0;
          }

          body.x += body.vx * dt;
          body.y += body.vy * dt;

          if (body.x < minX) {
            body.x = minX;
            if (body.vx < 0) body.vx *= -0.08;
          } else if (body.x > maxX) {
            body.x = maxX;
            if (body.vx > 0) body.vx *= -0.08;
          }

          if (body.y < minY) {
            body.y = minY;
            if (body.vy < 0) body.vy *= -0.08;
          } else if (body.y > maxY) {
            body.y = maxY;
            if (body.vy > 0) body.vy *= -0.08;
          }

          const targetDistance = Math.hypot(target.x - body.x, target.y - body.y);
          if (!isDragging && speed < (isCompactViewport ? 0.18 : 0.25) && targetDistance < 0.8) {
            body.vx = 0;
            body.vy = 0;
          }
        }

        return next;
      });

      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [
    bodies.length,
    disablePhysics,
    heroSet,
    heroTargets,
    hoveredRepo,
    isCompactViewport,
    isDenseViewport,
    isSearching,
    magnets,
    matchSet,
    physicsReady,
    viewport.height,
    viewport.width
  ]);

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
