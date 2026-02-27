import type { ProjectWithStats } from "@/lib/github";

export type PhysicsPortfolioProps = {
  projects: ProjectWithStats[];
  query: string;
  onTagClick: (tag: string) => void;
};

export type Body = {
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

export type Vec2 = { x: number; y: number };

export type Category =
  | "web-app"
  | "desktop-app"
  | "game"
  | "dictionary"
  | "dataset"
  | "userscript"
  | "browser-extension"
  | "library"
  | "automation"
  | "cli"
  | "learning"
  | "analytics"
  | "integration"
  | "resource"
  | "tooling";

export type DragState = {
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

export type PointerState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
};
