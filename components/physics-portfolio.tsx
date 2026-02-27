"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import type { ProjectWithStats } from "@/lib/github";

type PhysicsPortfolioProps = {
  projects: ProjectWithStats[];
  query: string;
};

type Vec2 = { x: number; y: number };
type Positioned = Record<string, Vec2>;

const TOP_PADDING = 130;

function hashSeed(text: string): number {
  let hash = 1779033703;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash ^ text.charCodeAt(i)) * 3432918353;
    hash = (hash << 13) | (hash >>> 19);
  }
  return Math.abs(hash >>> 0);
}

function rng(seed: number): () => number {
  let t = seed + 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let m = Math.imul(t ^ (t >>> 15), t | 1);
    m ^= m + Math.imul(m ^ (m >>> 7), m | 61);
    return ((m ^ (m >>> 14)) >>> 0) / 4294967296;
  };
}

function formatUpdatedAt(value: string): string {
  if (!value) {
    return "unknown";
  }

  const then = new Date(value).getTime();
  const now = Date.now();
  const diffInDays = Math.floor((now - then) / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) return "today";
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  return `${Math.floor(diffInMonths / 12)}y ago`;
}

function getCardMetrics(size: ProjectWithStats["size"]) {
  if (size === "hero") {
    return { width: 360, radius: 180 };
  }
  return { width: 300, radius: 148 };
}

function nonOverlappingPositions(projects: ProjectWithStats[], width: number, height: number): Positioned {
  const positions: Positioned = {};
  const placed: Array<{ x: number; y: number; r: number }> = [];
  const margin = 28;
  const random = rng(hashSeed(`w:${width}-h:${height}-n:${projects.length}`));

  const sorted = [...projects].sort((a, b) => (a.size === "hero" ? -1 : 1) - (b.size === "hero" ? -1 : 1));

  for (const project of sorted) {
    const { radius } = getCardMetrics(project.size);
    let chosen: Vec2 | null = null;

    for (let i = 0; i < 2200; i += 1) {
      const x = margin + radius + random() * (width - margin * 2 - radius * 2);
      const y = TOP_PADDING + radius + random() * (height - TOP_PADDING - margin - radius * 2);

      const overlaps = placed.some((other) => {
        const dx = x - other.x;
        const dy = y - other.y;
        const distance = Math.hypot(dx, dy);
        return distance < radius + other.r + 16;
      });

      if (!overlaps) {
        chosen = { x, y };
        break;
      }
    }

    if (!chosen) {
      const index = placed.length;
      const cols = Math.max(2, Math.floor(width / 330));
      const col = index % cols;
      const row = Math.floor(index / cols);
      chosen = {
        x: 90 + col * ((width - 180) / Math.max(1, cols - 1)),
        y: TOP_PADDING + 70 + row * 170
      };
    }

    positions[project.repo] = chosen;
    placed.push({ x: chosen.x, y: chosen.y, r: radius });
  }

  return positions;
}

function magnetPositions(matches: ProjectWithStats[], width: number, height: number): Positioned {
  const target: Positioned = {};
  const cols = Math.max(1, Math.min(4, Math.floor(width / 320)));
  const cardW = 300;
  const cardH = 208;
  const gap = 22;
  const rows = Math.ceil(matches.length / cols);
  const blockW = cols * cardW + (cols - 1) * gap;
  const blockH = rows * cardH + (rows - 1) * gap;
  const startX = width / 2 - blockW / 2 + cardW / 2;
  const startY = Math.max(TOP_PADDING + 30, height / 2 - blockH / 2 + cardH / 2);

  matches.forEach((project, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    target[project.repo] = {
      x: startX + col * (cardW + gap),
      y: startY + row * (cardH + gap)
    };
  });

  return target;
}

function cursorPush(point: Vec2, cursor: Vec2 | null): Vec2 {
  if (!cursor) return { x: 0, y: 0 };

  const dx = point.x - cursor.x;
  const dy = point.y - cursor.y;
  const distance = Math.hypot(dx, dy);
  const influence = 210;
  if (distance === 0 || distance > influence) return { x: 0, y: 0 };

  const force = ((influence - distance) / influence) ** 1.3;
  return {
    x: (dx / distance) * force * 26,
    y: (dy / distance) * force * 26
  };
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
        <div>
          <h3 className={`${isHero ? "text-2xl" : "text-xl"} font-extrabold text-primary`}>{project.name}</h3>
          {isHero && (
            <span className="mt-1 inline-flex rounded-full bg-brand px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
              Hero
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-white transition hover:bg-sky-500"
            >
              Site
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
  const [viewport, setViewport] = useState({ width: 1280, height: 880 });
  const [cursor, setCursor] = useState<Vec2 | null>(null);

  useEffect(() => {
    const onResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const matches = useMemo(() => {
    if (!isSearching) return projects;
    return projects.filter((project: ProjectWithStats) => {
      const haystack = [project.name, project.description, ...project.tags].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [isSearching, normalizedQuery, projects]);

  const worldHeight = useMemo(() => {
    const approxRows = Math.ceil(projects.length / Math.max(2, Math.floor(viewport.width / 320)));
    return Math.max(viewport.height, TOP_PADDING + approxRows * 176 + 180);
  }, [projects.length, viewport.height, viewport.width]);

  const basePositions = useMemo(
    () => nonOverlappingPositions(projects, Math.max(720, viewport.width - 24), worldHeight),
    [projects, viewport.width, worldHeight]
  );

  const magnet = useMemo(
    () => magnetPositions(matches, Math.max(720, viewport.width - 24), viewport.height),
    [matches, viewport.height, viewport.width]
  );

  const matchSet = useMemo(() => new Set(matches.map((project: ProjectWithStats) => project.repo)), [matches]);

  return (
    <section
      className="relative h-[100dvh] w-full overflow-auto"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setCursor({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top + event.currentTarget.scrollTop
        });
      }}
      onPointerLeave={() => setCursor(null)}
    >
      <div className="relative" style={{ height: worldHeight }}>
        {projects.map((project: ProjectWithStats) => {
          const metrics = getCardMetrics(project.size);
          const base = basePositions[project.repo] ?? { x: viewport.width / 2, y: viewport.height / 2 };
          const matched = matchSet.has(project.repo);
          const target = isSearching && matched ? magnet[project.repo] ?? base : base;
          const force = cursorPush(target, cursor);
          const seed = hashSeed(project.repo);
          const amp = isSearching ? 5 : 10;

          return (
            <motion.div
              key={project.repo}
              drag
              dragElastic={0.22}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                left: target.x,
                top: target.y,
                opacity: !isSearching || matched ? 1 : 0.18,
                scale: !isSearching || matched ? 1 : 0.9
              }}
              transition={{
                left: { type: "spring", stiffness: isSearching ? 200 : 110, damping: 24 },
                top: { type: "spring", stiffness: isSearching ? 200 : 110, damping: 24 },
                opacity: { duration: 0.28 },
                scale: { type: "spring", stiffness: 180, damping: 18 }
              }}
              className="absolute"
              style={{
                width: metrics.width,
                maxWidth: "min(94vw, 360px)",
                transform: "translate(-50%, -50%)",
                x: force.x,
                y: force.y,
                zIndex: project.size === "hero" ? 12 : 8
              }}
            >
              <motion.div
                animate={{
                  x: [0, amp, -amp * 0.8, amp * 0.4, 0],
                  y: [0, -amp * 0.9, amp * 0.6, -amp * 0.4, 0]
                }}
                transition={{
                  duration: 8 + (seed % 5),
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: (seed % 7) * 0.15
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
