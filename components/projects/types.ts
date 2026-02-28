import type { ProjectWithStats } from "@/lib/github";

export type BentoPortfolioProps = {
  projects: ProjectWithStats[];
  query: string;
  onTagClick: (tag: string) => void;
};

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
