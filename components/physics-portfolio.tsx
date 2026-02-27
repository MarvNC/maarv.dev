"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import type { ProjectWithStats } from "@/lib/github";

type PhysicsPortfolioProps = {
  projects: ProjectWithStats[];
  query: string;
};

function formatUpdatedAt(value: string): string {
  if (!value) {
    return "unknown";
  }

  const then = new Date(value).getTime();
  const now = Date.now();
  const diffInDays = Math.floor((now - then) / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) {
    return "today";
  }
  if (diffInDays < 30) {
    return `${diffInDays}d ago`;
  }
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  }
  return `${Math.floor(diffInMonths / 12)}y ago`;
}

function toPosition(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const x = (Math.abs(hash) % 74) + 8;
  const y = (Math.abs(hash * 7) % 64) + 18;
  return { x, y };
}

function ProjectCard({ project, compact = false }: { project: ProjectWithStats; compact?: boolean }) {
  return (
    <article
      className={`rounded-bubble border border-white/70 bg-surface p-5 shadow-float backdrop-blur-md ${
        compact ? "h-full" : ""
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-xl font-extrabold text-primary">{project.name}</h3>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand transition hover:bg-brand hover:text-white"
        >
          Open
        </a>
      </div>
      <p className="text-sm font-medium text-secondary">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-700">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-secondary">
        <span>{project.stars} stars</span>
        <span>Updated {formatUpdatedAt(project.updatedAt)}</span>
      </div>
    </article>
  );
}

export function PhysicsPortfolio({ projects, query }: PhysicsPortfolioProps) {
  const normalizedQuery = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!normalizedQuery) {
      return projects;
    }

    return projects.filter((project) => {
      const haystack = [project.name, project.description, ...project.tags].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [projects, normalizedQuery]);

  const isSearching = normalizedQuery.length > 0;
  const featured = matches.filter((project) => project.size !== "cluster");
  const utilities = matches.filter((project) => project.size === "cluster");

  if (isSearching) {
    return (
      <motion.section
        layout
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-12 pt-28 md:grid-cols-2 xl:grid-cols-3"
      >
        {featured.map((project) => (
          <motion.div
            layout
            key={project.repo}
            transition={{ type: "spring", stiffness: 240, damping: 20, bounce: 0.28 }}
            className={project.size === "hero" ? "md:col-span-2" : ""}
          >
            <ProjectCard project={project} compact />
          </motion.div>
        ))}

        {utilities.length > 0 && (
          <motion.article
            layout
            transition={{ type: "spring", stiffness: 220, damping: 24, bounce: 0.24 }}
            className="rounded-bubble border border-white/70 bg-surface p-5 shadow-float backdrop-blur-md md:col-span-2 xl:col-span-1"
          >
            <h3 className="text-xl font-extrabold text-primary">Utilities Cluster</h3>
            <p className="mt-1 text-sm font-medium text-secondary">Smaller scripts and helpers grouped when snapped to grid.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {utilities.map((project) => (
                <a
                  key={project.repo}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700 transition hover:bg-brand hover:text-white"
                >
                  {project.name}
                </a>
              ))}
            </div>
          </motion.article>
        )}
      </motion.section>
    );
  }

  return (
    <section className="relative h-[100dvh] min-h-[680px] w-full overflow-hidden px-4 pb-8 pt-28">
      {projects.map((project) => {
        const position = toPosition(project.repo);
        const bubbleSize = project.size === "hero" ? "w-80" : project.size === "feature" ? "w-64" : "w-auto";
        const isCluster = project.size === "cluster";

        return (
          <motion.div
            key={project.repo}
            drag
            dragElastic={0.2}
            className={`absolute ${bubbleSize}`}
            style={{ left: `${position.x}%`, top: `${position.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, 10, -12, 4, 0],
              y: [0, -8, 6, -4, 0]
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { duration: 0.35, type: "spring", stiffness: 200 },
              x: { duration: 11 + (position.x % 5), repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              y: { duration: 13 + (position.y % 5), repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            }}
          >
            {isCluster ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-bold text-secondary shadow-float backdrop-blur-md transition hover:bg-brand hover:text-white"
              >
                {project.name}
              </a>
            ) : (
              <ProjectCard project={project} compact />
            )}
          </motion.div>
        );
      })}
    </section>
  );
}
