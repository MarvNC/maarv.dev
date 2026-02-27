"use client";

import { useEffect, useMemo, useState } from "react";

import { CommandPalette } from "@/components/command-palette";
import { PhysicsPortfolio } from "@/components/physics-portfolio";
import type { ProjectWithStats } from "@/lib/github";

type ProvidersProps = {
  projects: ProjectWithStats[];
};

type StatsSnapshot = {
  projects?: Record<string, { stars?: number; updatedAt?: string }>;
};

const STATS_URL =
  import.meta.env.VITE_STATS_URL ?? "https://raw.githubusercontent.com/MarvNC/maarv.dev/data/stats.json";

export function Providers({ projects }: ProvidersProps) {
  const [query, setQuery] = useState("");
  const [liveProjects, setLiveProjects] = useState(projects);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLiveStats() {
      try {
        const response = await fetch(STATS_URL, {
          cache: "no-store",
          signal: controller.signal
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as StatsSnapshot;
        const statsMap = payload.projects ?? {};

        setLiveProjects((current: ProjectWithStats[]) =>
          current.map((project: ProjectWithStats) => ({
            ...project,
            stars: statsMap[project.repo]?.stars ?? project.stars,
            updatedAt: statsMap[project.repo]?.updatedAt ?? project.updatedAt
          }))
        );
      } catch {
        // Keep static fallback values if stats fetch fails.
      }
    }

    loadLiveStats();

    return () => controller.abort();
  }, []);

  const subtitle = useMemo(() => {
    if (!query.trim()) {
      return `Drag, toss, and search. ${liveProjects.length} repos indexed.`;
    }

    return `Searching for \"${query}\" in ${liveProjects.length} repos`;
  }, [liveProjects.length, query]);

  return (
    <>
      <CommandPalette value={query} onChange={setQuery} />
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/75 px-4 py-2 text-center text-sm font-semibold text-secondary shadow-float backdrop-blur-sm">
        {subtitle}
      </div>
      <PhysicsPortfolio projects={liveProjects} query={query} onTagClick={setQuery} />
    </>
  );
}
