import type { Category } from "@/components/physics/types";

export const TOP_PADDING = 116;
export const EDGE_PADDING = 10;

export const categoryClasses: Record<Category, string> = {
  app: "border-emerald-300/80",
  dictionary: "border-sky-300/80",
  userscript: "border-fuchsia-300/80",
  data: "border-amber-300/80",
  tooling: "border-cyan-300/80",
  other: "border-slate-300/80"
};

export const categoryBadgeClasses: Record<Category, string> = {
  app: "bg-emerald-100 text-emerald-700",
  dictionary: "bg-sky-100 text-sky-700",
  userscript: "bg-fuchsia-100 text-fuchsia-700",
  data: "bg-amber-100 text-amber-700",
  tooling: "bg-cyan-100 text-cyan-700",
  other: "bg-slate-100 text-slate-700"
};
