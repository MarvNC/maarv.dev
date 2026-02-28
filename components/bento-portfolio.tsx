import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo } from "react";

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

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) {
      return;
    }

    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const root = document.documentElement;

    let currentX = window.innerWidth * 0.5;
    let currentY = window.innerHeight * 0.35;
    let targetX = currentX;
    let targetY = currentY;
    let frame = 0;

    const writeVars = (x: number, y: number) => {
      root.style.setProperty("--cursor-x", `${x.toFixed(1)}px`);
      root.style.setProperty("--cursor-y", `${y.toFixed(1)}px`);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.11;
      currentY += (targetY - currentY) * 0.11;
      writeVars(currentX, currentY);
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const recenter = () => {
      targetX = window.innerWidth * 0.5;
      targetY = window.innerHeight * 0.35;
    };

    writeVars(currentX, currentY);
    frame = window.requestAnimationFrame(tick);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", recenter);
    window.addEventListener("blur", recenter);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", recenter);
      window.removeEventListener("blur", recenter);
    };
  }, [prefersReducedMotion]);

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
