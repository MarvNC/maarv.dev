import { Providers } from "@/app/providers";
import type { ProjectWithStats } from "@/lib/github";
import { projects } from "@/lib/projects";

const DEFAULT_STATS = {
  stars: 0,
  updatedAt: ""
} as const;

export function App() {
  const initialProjects: ProjectWithStats[] = projects.map((project) => ({
    ...project,
    ...DEFAULT_STATS
  }));

  return <Providers projects={initialProjects} />;
}
