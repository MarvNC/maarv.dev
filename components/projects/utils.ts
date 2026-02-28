import type { ProjectWithStats } from "@/lib/github";

import type { Category } from "@/components/projects/types";

const categoryOrder: Category[] = [
  "web-app",
  "desktop-app",
  "game",
  "dictionary",
  "dataset",
  "userscript",
  "browser-extension",
  "library",
  "automation",
  "cli",
  "learning",
  "analytics",
  "integration",
  "resource",
  "tooling"
];

function inferCategories(project: ProjectWithStats): Category[] {
  const tags = new Set(project.tags.map((tag: string) => tag.toLowerCase()));
  const name = project.name.toLowerCase();

  const categories = new Set<Category>();

  if (tags.has("userscript") || tags.has("tampermonkey") || name.includes("userscript")) categories.add("userscript");
  if (tags.has("browser-extension") || tags.has("extension")) categories.add("browser-extension");
  if (tags.has("desktop") || tags.has("desktop-app") || tags.has("electron") || tags.has("ahk"))
    categories.add("desktop-app");
  if (tags.has("web-game") || tags.has("game") || tags.has("threejs") || tags.has("rapier")) categories.add("game");
  if (tags.has("dictionary") || tags.has("yomitan") || tags.has("yomichan")) categories.add("dictionary");
  if (tags.has("dataset") || tags.has("data-pipeline") || tags.has("sqlite")) categories.add("dataset");
  if (tags.has("library") || tags.has("npm") || tags.has("package")) categories.add("library");
  if (tags.has("cli") || tags.has("command") || tags.has("deno")) categories.add("cli");
  if (tags.has("automation") || tags.has("github-actions") || tags.has("rss") || tags.has("webhook"))
    categories.add("automation");
  if (tags.has("dashboard") || tags.has("analytics") || tags.has("stats")) categories.add("analytics");
  if (tags.has("websocket") || tags.has("discord") || tags.has("integration")) categories.add("integration");
  if (tags.has("learning") || tags.has("japanese") || tags.has("cantonese") || tags.has("anki"))
    categories.add("learning");
  if (tags.has("resource") || tags.has("mkdocs") || tags.has("documentation")) categories.add("resource");
  if ((tags.has("nextjs") || tags.has("react") || tags.has("vite") || tags.has("webapp")) && !categories.has("game")) {
    categories.add("web-app");
  }

  if (categories.size === 0) {
    categories.add("tooling");
  }

  return categoryOrder.filter((category: Category) => categories.has(category));
}

export function toCategories(project: ProjectWithStats): Category[] {
  const given = (project.categories ?? [])
    .map((category: string) => category as Category)
    .filter((category: Category) => categoryOrder.includes(category));

  if (given.length > 0) {
    return categoryOrder.filter((category: Category) => given.includes(category));
  }

  return inferCategories(project);
}

export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .replace(/[-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesProjectQuery(project: ProjectWithStats, query: string, categories: Category[]): boolean {
  const normalizedQuery = normalizeSearch(query);
  if (!normalizedQuery) {
    return true;
  }

  const terms = normalizedQuery.split(" ").filter(Boolean);
  const searchable = [
    project.name,
    project.description,
    ...project.tags,
    ...categories,
    ...categories.map((category: Category) => category.replace(/-/g, " "))
  ].join(" ");

  const haystack = normalizeSearch(searchable);
  return terms.every((term: string) => haystack.includes(term));
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
