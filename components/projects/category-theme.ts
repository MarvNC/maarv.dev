import type { Category } from "@/components/projects/types";

export const categoryTileClasses: Record<Category, string> = {
  "web-app": "border-sky-200/90",
  "desktop-app": "border-teal-200/90",
  game: "border-cyan-200/90",
  dictionary: "border-amber-200/90",
  dataset: "border-orange-200/90",
  userscript: "border-emerald-200/90",
  "browser-extension": "border-indigo-200/90",
  library: "border-lime-200/90",
  automation: "border-rose-200/90",
  cli: "border-slate-300/90",
  learning: "border-fuchsia-200/90",
  analytics: "border-blue-200/90",
  integration: "border-violet-200/90",
  resource: "border-yellow-200/90",
  tooling: "border-cyan-200/90"
};

export const categoryBadgeClasses: Record<Category, string> = {
  "web-app": "bg-sky-100 text-sky-700",
  "desktop-app": "bg-teal-100 text-teal-700",
  game: "bg-cyan-100 text-cyan-700",
  dictionary: "bg-amber-100 text-amber-800",
  dataset: "bg-orange-100 text-orange-700",
  userscript: "bg-emerald-100 text-emerald-700",
  "browser-extension": "bg-indigo-100 text-indigo-700",
  library: "bg-lime-100 text-lime-700",
  automation: "bg-rose-100 text-rose-700",
  cli: "bg-slate-200 text-slate-700",
  learning: "bg-fuchsia-100 text-fuchsia-700",
  analytics: "bg-blue-100 text-blue-700",
  integration: "bg-violet-100 text-violet-700",
  resource: "bg-yellow-100 text-yellow-800",
  tooling: "bg-cyan-100 text-cyan-700"
};
