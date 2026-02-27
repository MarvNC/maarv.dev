import { projects, type Project, type ProjectLiveStats } from "@/lib/projects";

export type ProjectWithStats = Project & ProjectLiveStats;

const DEFAULT_STATS: ProjectLiveStats = {
  stars: 0,
  updatedAt: ""
};

async function fetchRepoStats(owner: string, repo: string): Promise<ProjectLiveStats> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    return DEFAULT_STATS;
  }

  const data = (await response.json()) as {
    stargazers_count?: number;
    pushed_at?: string;
  };

  return {
    stars: data.stargazers_count ?? 0,
    updatedAt: data.pushed_at ?? ""
  };
}

export async function getProjectsWithStats(): Promise<ProjectWithStats[]> {
  const stats = await Promise.all(
    projects.map(async (project) => {
      const live = await fetchRepoStats(project.owner, project.repo);
      return { ...project, ...live };
    })
  );

  return stats;
}
