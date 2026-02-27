"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { ProjectWithStats } from "@/lib/github";

type PhysicsPortfolioProps = {
  projects: ProjectWithStats[];
  query: string;
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
};

type Vec2 = {
  x: number;
  y: number;
};

const TOP_PADDING = 116;
const EDGE_PADDING = 12;

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
    return { width: 350, height: 250, mass: 1.25 };
  }
  return { width: 300, height: 230, mass: 1 };
}

function buildInitialBodies(projects: ProjectWithStats[], width: number, height: number): Body[] {
  const random = rng(hashSeed(`${width}-${height}-${projects.length}`));
  const bodies: Body[] = [];

  for (const project of projects) {
    const size = getCardSize(project);
    let x = width / 2;
    let y = height / 2;

    for (let i = 0; i < 2000; i += 1) {
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
      vx: (random() - 0.5) * 28,
      vy: (random() - 0.5) * 28,
      width: size.width,
      height: size.height,
      mass: size.mass
    });
  }

  return bodies;
}

function ProjectCard({ project }: { project: ProjectWithStats }) {
  const isHero = project.size === "hero";

  return (
    <article
      className={`rounded-bubble border border-white/70 bg-surface p-5 shadow-float backdrop-blur-md ${
        isHero ? "ring-2 ring-brand/35 bg-gradient-to-br from-sky-50/85 to-white/95" : ""
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className={`${isHero ? "text-2xl" : "text-xl"} font-extrabold text-primary`}>{project.name}</h3>
        <div className="flex gap-2">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-sky-500"
            >
              Visit site
            </a>
          )}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand transition hover:bg-brand hover:text-white"
          >
            Repo
          </a>
        </div>
      </div>
      <p className="text-sm font-medium text-secondary">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag: string) => (
          <span key={tag} className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-700">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-secondary">
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-sm font-extrabold text-amber-700">★ {project.stars}</span>
        <span>Updated {formatUpdatedAt(project.updatedAt)}</span>
        {project.archived && <span className="rounded-full bg-slate-200 px-2 py-1 text-slate-700">Archived</span>}
      </div>
    </article>
  );
}

export function PhysicsPortfolio({ projects, query }: PhysicsPortfolioProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [viewport, setViewport] = useState({ width: 1280, height: 820 });
  const [bodies, setBodies] = useState<Body[]>([]);

  const mouseRef = useRef<{ x: number; y: number; vx: number; vy: number; active: boolean }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    active: false
  });
  const lastMouseRef = useRef<{ x: number; y: number; t: number } | null>(null);

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

  const magnets = useMemo(() => {
    const cols = Math.max(1, Math.min(4, Math.floor(viewport.width / 320)));
    const cardW = 300;
    const cardH = 220;
    const gap = 22;
    const rows = Math.max(1, Math.ceil(matches.length / cols));
    const blockW = cols * cardW + (cols - 1) * gap;
    const blockH = rows * cardH + (rows - 1) * gap;
    const startX = viewport.width / 2 - blockW / 2 + cardW / 2;
    const startY = Math.max(TOP_PADDING + 40, viewport.height / 2 - blockH / 2 + cardH / 2);

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

            const rA = Math.max(a.width, a.height) * 0.34;
            const rB = Math.max(b.width, b.height) * 0.34;
            const minDist = rA + rB;

            const repel = Math.min(62000, (8200 * rA * rB) / (dist * dist));
            const fx = nx * repel;
            const fy = ny * repel;
            a.vx -= (fx / a.mass) * dt;
            a.vy -= (fy / a.mass) * dt;
            b.vx += (fx / b.mass) * dt;
            b.vy += (fy / b.mass) * dt;

            if (dist < minDist) {
              const overlap = minDist - dist;
              const push = overlap * 0.5;
              a.x -= nx * push;
              a.y -= ny * push;
              b.x += nx * push;
              b.y += ny * push;

              a.vx -= nx * overlap * 9;
              a.vy -= ny * overlap * 9;
              b.vx += nx * overlap * 9;
              b.vy += ny * overlap * 9;
            }
          }
        }

        const mouse = mouseRef.current;

        for (const body of next) {
          if (mouse.active) {
            const dx = body.x - mouse.x;
            const dy = body.y - mouse.y;
            const dist = Math.max(1, Math.hypot(dx, dy));
            const influence = 220;

            if (dist < influence) {
              const nX = dx / dist;
              const nY = dy / dist;
              const power = ((influence - dist) / influence) ** 1.25;

              body.vx += nX * power * 780 * dt + mouse.vx * power * 0.4;
              body.vy += nY * power * 780 * dt + mouse.vy * power * 0.4;
            }
          }

          if (isSearching && matchSet.has(body.repo)) {
            const target = magnets[body.repo];
            if (target) {
              body.vx += (target.x - body.x) * 2.2 * dt;
              body.vy += (target.y - body.y) * 2.2 * dt;
            }
          }

          const drag = isSearching ? 0.988 : 0.992;
          body.vx *= drag;
          body.vy *= drag;

          body.x += body.vx * dt;
          body.y += body.vy * dt;

          const minX = EDGE_PADDING + body.width / 2;
          const maxX = viewport.width - EDGE_PADDING - body.width / 2;
          const minY = TOP_PADDING + body.height / 2;
          const maxY = viewport.height - EDGE_PADDING - body.height / 2;

          if (body.x < minX) {
            body.x = minX;
            body.vx = Math.abs(body.vx) * 0.78;
          } else if (body.x > maxX) {
            body.x = maxX;
            body.vx = -Math.abs(body.vx) * 0.78;
          }

          if (body.y < minY) {
            body.y = minY;
            body.vy = Math.abs(body.vy) * 0.78;
          } else if (body.y > maxY) {
            body.y = maxY;
            body.vy = -Math.abs(body.vy) * 0.78;
          }
        }

        return next;
      });

      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [bodies.length, isSearching, magnets, matchSet, viewport.height, viewport.width]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full overflow-hidden"
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
      }}
      onPointerLeave={() => {
        mouseRef.current.active = false;
        mouseRef.current.vx = 0;
        mouseRef.current.vy = 0;
        lastMouseRef.current = null;
      }}
    >
      {projects.map((project: ProjectWithStats) => {
        const body = bodies.find((item: Body) => item.repo === project.repo);
        if (!body) return null;
        const matched = matchSet.has(project.repo);

        return (
          <div
            key={project.repo}
            className="absolute"
            style={{
              left: body.x,
              top: body.y,
              width: body.width,
              maxWidth: "min(94vw, 360px)",
              transform: "translate(-50%, -50%)",
              opacity: !isSearching || matched ? 1 : 0.2,
              zIndex: project.size === "hero" ? 12 : 8,
              transition: "opacity 180ms ease"
            }}
          >
            <ProjectCard project={project} />
          </div>
        );
      })}
    </section>
  );
}
