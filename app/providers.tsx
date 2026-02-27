"use client";

import { useMemo, useState } from "react";

import { CommandPalette } from "@/components/command-palette";
import { PhysicsPortfolio } from "@/components/physics-portfolio";
import type { ProjectWithStats } from "@/lib/github";

type ProvidersProps = {
  projects: ProjectWithStats[];
};

export function Providers({ projects }: ProvidersProps) {
  const [query, setQuery] = useState("");

  const subtitle = useMemo(() => {
    if (!query.trim()) {
      return `Drag, toss, and search. ${projects.length} repos indexed.`;
    }

    return `Searching for \"${query}\" in ${projects.length} repos`;
  }, [projects.length, query]);

  return (
    <>
      <CommandPalette value={query} onChange={setQuery} />
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/75 px-4 py-2 text-center text-sm font-semibold text-secondary shadow-float backdrop-blur-sm">
        {subtitle}
      </div>
      <PhysicsPortfolio projects={projects} query={query} onTagClick={setQuery} />
    </>
  );
}
