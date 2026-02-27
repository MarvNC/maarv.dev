import type { Category } from "@/components/physics/types";

export const TOP_PADDING = 116;
export const EDGE_PADDING = 10;

export const categoryClasses: Record<Category, string> = {
  "web-app": "border-blue-300/80",
  "desktop-app": "border-teal-300/80",
  game: "border-violet-300/80",
  dictionary: "border-sky-300/80",
  dataset: "border-amber-300/80",
  userscript: "border-fuchsia-300/80",
  "browser-extension": "border-indigo-300/80",
  library: "border-cyan-300/80",
  automation: "border-lime-300/80",
  cli: "border-emerald-300/80",
  learning: "border-rose-300/80",
  analytics: "border-orange-300/80",
  integration: "border-purple-300/80",
  resource: "border-yellow-300/80",
  tooling: "border-cyan-300/80"
};

export const categoryBadgeClasses: Record<Category, string> = {
  "web-app": "bg-blue-100 text-blue-700",
  "desktop-app": "bg-teal-100 text-teal-700",
  game: "bg-violet-100 text-violet-700",
  dictionary: "bg-sky-100 text-sky-700",
  dataset: "bg-amber-100 text-amber-700",
  userscript: "bg-fuchsia-100 text-fuchsia-700",
  "browser-extension": "bg-indigo-100 text-indigo-700",
  library: "bg-cyan-100 text-cyan-700",
  automation: "bg-lime-100 text-lime-700",
  cli: "bg-emerald-100 text-emerald-700",
  learning: "bg-rose-100 text-rose-700",
  analytics: "bg-orange-100 text-orange-700",
  integration: "bg-purple-100 text-purple-700",
  resource: "bg-yellow-100 text-yellow-700",
  tooling: "bg-cyan-100 text-cyan-700"
};
