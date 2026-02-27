import type { ProjectWithStats } from "@/lib/github";

import { EDGE_PADDING, TOP_PADDING } from "@/components/physics/constants";
import type { Body, Category, Vec2 } from "@/components/physics/types";

export function toCategory(project: ProjectWithStats): Category {
  const tags = new Set(project.tags.map((tag: string) => tag.toLowerCase()));
  const name = project.name.toLowerCase();

  if (tags.has("userscript") || tags.has("tampermonkey") || name.includes("userscript")) return "userscript";
  if (tags.has("dictionary") || tags.has("yomitan") || tags.has("yomichan")) return "dictionary";
  if (tags.has("dataset") || tags.has("data-pipeline") || tags.has("analytics-dashboard")) return "data";
  if (tags.has("desktop") || tags.has("web-game") || tags.has("nextjs") || tags.has("react")) return "app";
  if (tags.has("library") || tags.has("tool") || tags.has("automation") || tags.has("bun")) return "tooling";
  return "other";
}

export function hashSeed(text: string): number {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

export function rng(seed: number): () => number {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let m = Math.imul(t ^ (t >>> 15), t | 1);
    m ^= m + Math.imul(m ^ (m >>> 7), m | 61);
    return ((m ^ (m >>> 14)) >>> 0) / 4294967296;
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function formatUpdatedAt(value: string): string {
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

export function getCardSize(project: ProjectWithStats) {
  if (project.size === "hero") {
    return { width: 350, height: 152, mass: 1.38 };
  }
  return { width: 268, height: 120, mass: 1 };
}

export function buildInitialBodies(projects: ProjectWithStats[], width: number, height: number): Body[] {
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

export function createMagnetTargets(matches: ProjectWithStats[], width: number, height: number): Record<string, Vec2> {
  const cols = Math.max(1, Math.min(4, Math.floor(width / 290)));
  const cardW = 250;
  const cardH = 150;
  const gap = 16;
  const rows = Math.max(1, Math.ceil(matches.length / cols));
  const blockW = cols * cardW + (cols - 1) * gap;
  const blockH = rows * cardH + (rows - 1) * gap;
  const startX = width / 2 - blockW / 2 + cardW / 2;
  const startY = Math.max(TOP_PADDING + 35, height / 2 - blockH / 2 + cardH / 2);

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
}

export function createHeroTargets(projects: ProjectWithStats[], width: number, height: number): Record<string, Vec2> {
  const heroes = projects.filter((project: ProjectWithStats) => project.size === "hero");
  const mapped: Record<string, Vec2> = {};
  if (heroes.length === 0) {
    return mapped;
  }

  const centerX = width / 2;
  const centerY = Math.max(TOP_PADDING + 120, height * 0.46);
  const radiusX = Math.min(170, Math.max(70, width * 0.14));
  const radiusY = Math.min(105, Math.max(45, height * 0.1));

  if (heroes.length === 1) {
    mapped[heroes[0].repo] = { x: centerX, y: centerY };
    return mapped;
  }

  heroes.forEach((hero: ProjectWithStats, index: number) => {
    const angle = -Math.PI / 2 + (index / heroes.length) * Math.PI * 2;
    mapped[hero.repo] = {
      x: centerX + Math.cos(angle) * radiusX,
      y: centerY + Math.sin(angle) * radiusY
    };
  });

  return mapped;
}
