"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { ProjectWithStats } from "@/lib/github";

type PhysicsPortfolioProps = {
  projects: ProjectWithStats[];
  query: string;
  onTagClick: (tag: string) => void;
};

type Body = {
  repo: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  mass: number;
  homeX: number;
  homeY: number;
};

type Vec2 = { x: number; y: number };

type Category = "app" | "dictionary" | "userscript" | "data" | "tooling" | "other";

type DragState = {
  repo: string | null;
  pointerId: number | null;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  lastX: number;
  lastY: number;
  lastT: number;
};

const TOP_PADDING = 116;
const EDGE_PADDING = 10;

const categoryClasses: Record<Category, string> = {
  app: "border-emerald-300/80",
  dictionary: "border-sky-300/80",
  userscript: "border-fuchsia-300/80",
  data: "border-amber-300/80",
  tooling: "border-cyan-300/80",
  other: "border-slate-300/80"
};

const categoryBadgeClasses: Record<Category, string> = {
  app: "bg-emerald-100 text-emerald-700",
  dictionary: "bg-sky-100 text-sky-700",
  userscript: "bg-fuchsia-100 text-fuchsia-700",
  data: "bg-amber-100 text-amber-700",
  tooling: "bg-cyan-100 text-cyan-700",
  other: "bg-slate-100 text-slate-700"
};

function toCategory(project: ProjectWithStats): Category {
  const tags = new Set(project.tags.map((tag: string) => tag.toLowerCase()));
  const name = project.name.toLowerCase();

  if (tags.has("userscript") || tags.has("tampermonkey") || name.includes("userscript")) return "userscript";
  if (tags.has("dictionary") || tags.has("yomitan") || tags.has("yomichan")) return "dictionary";
  if (tags.has("dataset") || tags.has("data-pipeline") || tags.has("analytics-dashboard")) return "data";
  if (tags.has("desktop") || tags.has("web-game") || tags.has("nextjs") || tags.has("react")) return "app";
  if (tags.has("library") || tags.has("tool") || tags.has("automation") || tags.has("bun")) return "tooling";
  return "other";
}

function hashSeed(text: string): number {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function rng(seed: number): () => number {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let m = Math.imul(t ^ (t >>> 15), t | 1);
    m ^= m + Math.imul(m ^ (m >>> 7), m | 61);
    return ((m ^ (m >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function formatUpdatedAt(value: string): string {
  if (!value) return "unknown";
  const then = new Date(value).getTime();
  const now = Date.now();
  const days = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function getCardSize(project: ProjectWithStats) {
  if (project.size === "hero") {
    return { width: 350, height: 152, mass: 1.38 };
  }
  return { width: 238, height: 114, mass: 1 };
}

function buildInitialBodies(projects: ProjectWithStats[], width: number, height: number): Body[] {
  const random = rng(hashSeed(`${width}-${height}-${projects.length}`));
  const bodies: Body[] = [];

  for (const project of projects) {
    const size = getCardSize(project);
    let x = width / 2;
    let y = height / 2;

    for (let i = 0; i < 1800; i += 1) {
      const px = EDGE_PADDING + size.width / 2 + random() * (width - EDGE_PADDING * 2 - size.width);
      const py =
        TOP_PADDING +
        EDGE_PADDING +
        size.height / 2 +
        random() * (height - TOP_PADDING - EDGE_PADDING * 2 - size.height);

      const overlaps = bodies.some((other) => {
        const minX = (size.width + other.width) / 2 + 8;
        const minY = (size.height + other.height) / 2 + 8;
        return Math.abs(px - other.x) < minX && Math.abs(py - other.y) < minY;
      });

      if (!overlaps) {
        x = px;
        y = py;
        break;
      }
    }

    bodies.push({
      repo: project.repo,
      x,
      y,
      vx: (random() - 0.5) * 16,
      vy: (random() - 0.5) * 16,
      width: size.width,
      height: size.height,
      mass: size.mass,
      homeX: x,
      homeY: y
    });
  }

  return bodies;
}

function ProjectCard({
  project,
  expanded,
  onTagClick,
  category
}: {
  project: ProjectWithStats;
  expanded: boolean;
  onTagClick: (tag: string) => void;
  category: Category;
}) {
  const isHero = project.size === "hero";

  return (
    <article
      className={`rounded-bubble border bg-surface p-4 shadow-float backdrop-blur-md transition-all duration-200 ${categoryClasses[category]} ${
        isHero ? "ring-2 ring-brand/35 bg-gradient-to-br from-sky-50/85 to-white/95" : ""
      } ${expanded ? "scale-[1.12] shadow-[0_30px_55px_-25px_rgba(58,176,255,0.42)]" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className={`${isHero ? "text-xl" : "text-base"} font-extrabold leading-tight text-primary`}>{project.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-secondary">
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-sm font-extrabold text-amber-700">★ {project.stars}</span>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onTagClick(category);
              }}
              className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold uppercase ${categoryBadgeClasses[category]}`}
            >
              {category}
            </button>
            <span>{formatUpdatedAt(project.updatedAt)}</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-sky-500"
            >
              Visit
            </a>
          )}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand transition hover:bg-brand hover:text-white"
          >
            Repo
          </a>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-200 ${expanded ? "mt-3 max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-xs font-medium text-secondary">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag: string) => (
            <button
              key={tag}
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onTagClick(tag);
              }}
              className="cursor-pointer rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-bold text-sky-700 transition hover:bg-brand hover:text-white"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-secondary">
          {project.archived && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-slate-700">Archived</span>}
          {project.role && <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-cyan-700">{project.role}</span>}
        </div>
      </div>
    </article>
  );
}

export function PhysicsPortfolio({ projects, query, onTagClick }: PhysicsPortfolioProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [viewport, setViewport] = useState({ width: 1280, height: 820 });
  const [bodies, setBodies] = useState<Body[]>([]);
  const [hoveredRepo, setHoveredRepo] = useState<string | null>(null);

  const mouseRef = useRef<{ x: number; y: number; vx: number; vy: number; active: boolean }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    active: false
  });
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

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const matches = useMemo(() => {
    if (!isSearching) return projects;
    return projects.filter((project: ProjectWithStats) => {
      const haystack = [project.name, project.description, ...project.tags].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [isSearching, normalizedQuery, projects]);

  const matchSet = useMemo(() => new Set(matches.map((project: ProjectWithStats) => project.repo)), [matches]);
  const heroSet = useMemo(
    () => new Set(projects.filter((project: ProjectWithStats) => project.size === "hero").map((project: ProjectWithStats) => project.repo)),
    [projects]
  );
  const categoryByRepo = useMemo(() => {
    const mapped: Record<string, Category> = {};
    projects.forEach((project: ProjectWithStats) => {
      mapped[project.repo] = toCategory(project);
    });
    return mapped;
  }, [projects]);

  const magnets = useMemo(() => {
    const cols = Math.max(1, Math.min(4, Math.floor(viewport.width / 290)));
    const cardW = 250;
    const cardH = 150;
    const gap = 16;
    const rows = Math.max(1, Math.ceil(matches.length / cols));
    const blockW = cols * cardW + (cols - 1) * gap;
    const blockH = rows * cardH + (rows - 1) * gap;
    const startX = viewport.width / 2 - blockW / 2 + cardW / 2;
    const startY = Math.max(TOP_PADDING + 35, viewport.height / 2 - blockH / 2 + cardH / 2);

    const mapped: Record<string, Vec2> = {};
    matches.forEach((project: ProjectWithStats, index: number) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      mapped[project.repo] = {
        x: startX + col * (cardW + gap),
        y: startY + row * (cardH + gap)
      };
    });
    return mapped;
  }, [matches, viewport.height, viewport.width]);

  const heroTargets = useMemo(() => {
    const heroes = projects.filter((project: ProjectWithStats) => project.size === "hero");
    const mapped: Record<string, Vec2> = {};
    if (heroes.length === 0) {
      return mapped;
    }

    const centerX = viewport.width / 2;
    const centerY = Math.max(TOP_PADDING + 120, viewport.height * 0.46);
    const radiusX = Math.min(170, Math.max(70, viewport.width * 0.14));
    const radiusY = Math.min(105, Math.max(45, viewport.height * 0.1));

    if (heroes.length === 1) {
      mapped[heroes[0].repo] = { x: centerX, y: centerY };
      return mapped;
    }

    heroes.forEach((hero: ProjectWithStats, index: number) => {
      const angle = (-Math.PI / 2) + (index / heroes.length) * Math.PI * 2;
      mapped[hero.repo] = {
        x: centerX + Math.cos(angle) * radiusX,
        y: centerY + Math.sin(angle) * radiusY
      };
    });

    return mapped;
  }, [projects, viewport.height, viewport.width]);

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
    if (!bodies.length) return;

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

            const rA = Math.max(a.width, a.height) * 0.32;
            const rB = Math.max(b.width, b.height) * 0.32;
            const minDist = rA + rB;

            const multiplier = a.repo === hoveredRepo || b.repo === hoveredRepo ? 0.24 : 1;
            const repel = Math.min(12000, ((980 * rA * rB) / (dist * dist)) * multiplier);

            const fx = nx * repel;
            const fy = ny * repel;
            a.vx -= (fx / a.mass) * dt;
            a.vy -= (fy / a.mass) * dt;
            b.vx += (fx / b.mass) * dt;
            b.vy += (fy / b.mass) * dt;

            if (!isSearching && categoryByRepo[a.repo] === categoryByRepo[b.repo] && dist > minDist * 1.35) {
              const attract = Math.min(220, (dist - minDist * 1.35) * 0.32);
              a.vx += (nx * attract * dt) / a.mass;
              a.vy += (ny * attract * dt) / a.mass;
              b.vx -= (nx * attract * dt) / b.mass;
              b.vy -= (ny * attract * dt) / b.mass;
            }

            if (dist < minDist) {
              const overlap = minDist - dist;
              const push = overlap * 0.42;
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
            const influence = 280;

            if (dist < influence) {
              const nX = dx / dist;
              const nY = dy / dist;
              const tangentX = -nY;
              const tangentY = nX;
              const power = ((influence - dist) / influence) ** 1.55;
              const speedBoost = Math.min(2, mouseSpeed / 720);
              const spinSign = Math.sign(mouse.vx * nY - mouse.vy * nX) || 1;

              const pullStrength = 60 + speedBoost * 160;
              const swirlStrength = 110 + speedBoost * 260;

              body.vx += (nX * pullStrength + tangentX * swirlStrength * spinSign) * power * dt;
              body.vy += (nY * pullStrength + tangentY * swirlStrength * spinSign) * power * dt;

              if (mouseSpeed > 35) {
                const dirX = mouse.vx / mouseSpeed;
                const dirY = mouse.vy / mouseSpeed;
                const ahead = dx * dirX + dy * dirY;
                const side = Math.abs(dx * -dirY + dy * dirX);

                if (ahead > -90 && ahead < 180 && side < 130) {
                  const wake = (1 - side / 130) * (1 - clamp(ahead, 0, 180) / 180);
                  body.vx += dirX * wake * speedBoost * 180 * dt;
                  body.vy += dirY * wake * speedBoost * 180 * dt;
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
              body.vx += (heroTarget.x - body.x) * 1.15 * dt;
              body.vy += (heroTarget.y - body.y) * 1.15 * dt;
            } else {
              const seed = hashSeed(body.repo);
              const time = now / 1000;
              const wanderX = Math.sin(time * 0.34 + seed * 0.0009) * 44;
              const wanderY = Math.cos(time * 0.28 + seed * 0.0007) * 34;
              const targetX = body.homeX + wanderX;
              const targetY = body.homeY + wanderY;

              body.vx += (targetX - body.x) * 0.58 * dt;
              body.vy += (targetY - body.y) * 0.58 * dt;

              const swirl = Math.sin(time * 0.7 + seed * 0.0004) * 12;
              body.vx += ((seed % 2 === 0 ? 1 : -1) * swirl * dt) / body.mass;
            }
          }

          const damping = isHovered ? 0.94 : isHero ? 0.989 : isSearching ? 0.985 : 0.989;
          body.vx *= damping;
          body.vy *= damping;

          body.x += body.vx * dt;
          body.y += body.vy * dt;

          if (body.x < minX) {
            body.x = minX;
            body.vx = Math.abs(body.vx) * 0.74;
          } else if (body.x > maxX) {
            body.x = maxX;
            body.vx = -Math.abs(body.vx) * 0.74;
          }

          if (body.y < minY) {
            body.y = minY;
            body.vy = Math.abs(body.vy) * 0.74;
          } else if (body.y > maxY) {
            body.y = maxY;
            body.vy = -Math.abs(body.vy) * 0.74;
          }
        }

        return next;
      });

      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [bodies.length, categoryByRepo, heroSet, heroTargets, hoveredRepo, isSearching, magnets, matchSet, viewport.height, viewport.width]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full select-none overflow-hidden touch-none"
      onPointerMove={(event) => {
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
      }}
      onPointerUp={(event) => {
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
      }}
      onPointerCancel={() => {
        dragRef.current.repo = null;
        dragRef.current.pointerId = null;
      }}
      onPointerLeave={() => {
        mouseRef.current.active = false;
        mouseRef.current.vx = 0;
        mouseRef.current.vy = 0;
        lastMouseRef.current = null;
        dragRef.current.repo = null;
        dragRef.current.pointerId = null;
        setHoveredRepo(null);
      }}
    >
      {projects.map((project: ProjectWithStats) => {
        const body = bodyMap.get(project.repo);
        if (!body) return null;
        const matched = matchSet.has(project.repo);
        const isHovered = hoveredRepo === project.repo;

        return (
          <div
            key={project.repo}
            className="absolute"
            onPointerDown={(event) => {
              const target = event.target as HTMLElement;
              if (target.closest("a,button")) {
                return;
              }

              if (!containerRef.current) {
                return;
              }

              const containerRect = containerRef.current.getBoundingClientRect();
              const pointerX = event.clientX - containerRect.left;
              const pointerY = event.clientY - containerRect.top;

              const now = performance.now();
              dragRef.current.repo = project.repo;
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
            }}
            onPointerEnter={() => setHoveredRepo(project.repo)}
            onPointerLeave={() => setHoveredRepo((current: string | null) => (current === project.repo ? null : current))}
            style={{
              left: body.x,
              top: body.y,
              width: body.width,
              maxWidth: "min(93vw, 360px)",
              transform: "translate(-50%, -50%)",
              opacity: !isSearching || matched ? 1 : 0.18,
              zIndex: isHovered ? 70 : project.size === "hero" ? 14 : 9,
              transition: "opacity 150ms ease, z-index 20ms linear",
              cursor: dragRef.current.repo === project.repo ? "grabbing" : "grab"
            }}
          >
            <ProjectCard
              project={project}
              expanded={isHovered || project.size === "hero"}
              onTagClick={onTagClick}
              category={categoryByRepo[project.repo] ?? "other"}
            />
          </div>
        );
      })}
    </section>
  );
}
