import { motion, useReducedMotion } from "framer-motion";

import type { ProjectWithStats } from "@/lib/github";

import { categoryBadgeClasses, categoryTileClasses } from "@/components/projects/category-theme";
import type { Category } from "@/components/projects/types";
import { formatUpdatedAt } from "@/components/projects/utils";

type ProjectTileProps = {
  project: ProjectWithStats;
  categories: Category[];
  primaryCategory: Category;
  index: number;
  isSearching: boolean;
  onTagClick: (tag: string) => void;
};

const tileSizeClasses = {
  hero: "sm:col-span-2 lg:col-span-6 min-h-[230px]",
  middle: "sm:col-span-2 lg:col-span-4 min-h-[200px]",
  feature: "sm:col-span-1 lg:col-span-3 min-h-[172px]"
} as const;

export function ProjectTile({
  project,
  categories,
  primaryCategory,
  index,
  isSearching,
  onTagClick
}: ProjectTileProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHero = project.size === "hero";
  const isMiddle = project.size === "middle";
  const shownCategories = categories.slice(0, 2);
  const shouldExpand = project.size !== "feature" || isSearching;

  const starScale = Math.max(0, Math.log10((project.stars ?? 0) + 1));
  const starProminence = Math.min(1, starScale / 3.2);
  const cardGlow = `drop-shadow(0 0 ${Math.round(6 + starProminence * 8)}px rgba(245,158,11,${(
    0.07 +
    starProminence * 0.14
  ).toFixed(3)}))`;

  return (
    <motion.article
      layout
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
      whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
      transition={{
        duration: 0.34,
        delay: Math.min(index * 0.035, 0.3),
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border bg-surface/95 p-4 shadow-float backdrop-blur-md transition ${tileSizeClasses[project.size]} ${categoryTileClasses[primaryCategory]} ${
        isHero ? "p-5" : ""
      }`}
      style={{ filter: cardGlow }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/75 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex min-w-0 items-start gap-2">
          {project.stars > 0 && (
            <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-extrabold text-amber-800">
              ★ {project.stars}
            </span>
          )}
          <h2
            className={`${isHero ? "text-2xl" : isMiddle ? "text-xl" : "text-base"} min-w-0 font-extrabold leading-tight text-primary [overflow-wrap:anywhere]`}
          >
            {project.name}
          </h2>
        </div>

        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-1.5 text-xs font-semibold text-secondary">
          {shownCategories.map((category: Category) => (
            <button
              key={category}
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onTagClick(category);
              }}
              className={`min-h-[28px] rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${categoryBadgeClasses[category]}`}
            >
              {category}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-semibold text-secondary/85">
            {formatUpdatedAt(project.updatedAt)}
          </span>
        </div>

        <p className={`mt-3 text-sm font-medium text-secondary ${shouldExpand ? "clamp-4" : "clamp-2"}`}>
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-secondary">
            {project.archived && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-slate-700">Archived</span>}
            {project.role && <span className="rounded-full bg-teal-100 px-2 py-0.5 text-teal-700">{project.role}</span>}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex min-h-[34px] items-center rounded-full bg-brand px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 ${
                  isHero || isMiddle ? "text-xs" : "text-[10px]"
                }`}
              >
                Visit
              </a>
            )}
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[34px] items-center rounded-full bg-brand/10 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-brand transition hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
            >
              Repo
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
