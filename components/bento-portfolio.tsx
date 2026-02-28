import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import type { ProjectWithStats } from "@/lib/github";

import { IdentityTile } from "@/components/bento/identity-tile";
import { ProjectTile } from "@/components/bento/project-tile";
import type { BentoPortfolioProps, Category } from "@/components/projects/types";
import { matchesProjectQuery, toCategories } from "@/components/projects/utils";

const sizeRank: Record<ProjectWithStats["size"], number> = {
  hero: 0,
  middle: 1,
  feature: 2
};

export function BentoPortfolio({ projects, query, onTagClick }: BentoPortfolioProps) {
  const prefersReducedMotion = useReducedMotion();

  const categoryByRepo = useMemo(() => {
    const mapped: Record<string, Category[]> = {};
    projects.forEach((project: ProjectWithStats) => {
      mapped[project.repo] = toCategories(project);
    });
    return mapped;
  }, [projects]);

  const visibleProjects = useMemo(() => {
    return projects
      .map((project: ProjectWithStats, index: number) => ({ project, index }))
      .filter(({ project }) => matchesProjectQuery(project, query, categoryByRepo[project.repo] ?? ["tooling"]))
      .sort((a, b) => {
        const bySize = sizeRank[a.project.size] - sizeRank[b.project.size];
        if (bySize !== 0) {
          return bySize;
        }

        return a.index - b.index;
      })
      .map(({ project }) => project);
  }, [categoryByRepo, projects, query]);

  const isSearching = query.trim().length > 0;

  return (
    <section className="relative min-h-dvh w-full px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <IdentityTile />

        <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project: ProjectWithStats, index: number) => (
              <ProjectTile
                key={project.repo}
                project={project}
                categories={categoryByRepo[project.repo] ?? ["tooling"]}
                primaryCategory={(categoryByRepo[project.repo] ?? ["tooling"])[0]}
                index={index}
                isSearching={isSearching}
                onTagClick={onTagClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {isSearching && visibleProjects.length === 0 && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            className="mx-auto mt-6 max-w-lg rounded-3xl border border-white/75 bg-white/70 px-6 py-5 text-center text-sm font-semibold text-secondary shadow-float backdrop-blur-md"
          >
            No matching projects yet. Try a broader tag or fewer words.
          </motion.div>
        )}
      </div>
    </section>
  );
}
