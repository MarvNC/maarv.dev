import { memo } from "react";

import type { ProjectWithStats } from "@/lib/github";

import { categoryBadgeClasses, categoryClasses } from "@/components/physics/constants";
import type { Category } from "@/components/physics/types";
import { formatUpdatedAt } from "@/components/physics/utils";

type ProjectCardProps = {
  project: ProjectWithStats;
  expanded: boolean;
  onTagClick: (tag: string) => void;
  category: Category;
};

export const ProjectCard = memo(function ProjectCard({ project, expanded, onTagClick, category }: ProjectCardProps) {
  const isHero = project.size === "hero";
  const headerLayout = isHero ? "flex-row items-start" : "flex-col items-start";

  return (
    <article
      className={`rounded-bubble border bg-surface p-4 shadow-float backdrop-blur-md transition-all duration-200 ${categoryClasses[category]} ${
        isHero ? "ring-2 ring-brand/35 bg-gradient-to-br from-sky-50/85 to-white/95" : ""
      } ${expanded ? "scale-[1.12] shadow-[0_30px_55px_-25px_rgba(58,176,255,0.42)]" : ""}`}
    >
      <div className={`flex ${headerLayout} justify-between gap-2`}>
        <div className="min-w-0">
          <h3 className={`${isHero ? "text-xl" : "text-base"} font-extrabold leading-tight text-primary`}>{project.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-secondary">
            <span className="inline-flex whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-sm font-extrabold text-amber-700">
              ★ {project.stars}
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onTagClick(category);
              }}
              className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold uppercase ${categoryBadgeClasses[category]}`}
            >
              {category}
            </button>
            <span className="whitespace-nowrap">{formatUpdatedAt(project.updatedAt)}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-sky-500"
            >
              Visit
            </a>
          )}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand transition hover:bg-brand hover:text-white"
          >
            Repo
          </a>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-200 ${expanded ? "mt-3 max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-xs font-medium text-secondary">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag: string) => (
            <button
              key={tag}
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onTagClick(tag);
              }}
              className="cursor-pointer rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-bold text-sky-700 transition hover:bg-brand hover:text-white"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-secondary">
          {project.archived && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-slate-700">Archived</span>}
          {project.role && <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-cyan-700">{project.role}</span>}
        </div>
      </div>
    </article>
  );
});
