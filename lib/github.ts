import { projects, type Project, type ProjectLiveStats } from "@/lib/projects";

export type ProjectWithStats = Project & ProjectLiveStats;

const DEFAULT_STATS: ProjectLiveStats = {
  stars: 0,
  updatedAt: ""
};

type GraphNode = {
  stargazerCount?: number;
  pushedAt?: string;
};

function buildGraphQLQuery() {
  const lines = projects.map(
    (project: Project, index: number) =>
      `r${index}: repository(owner: \"${project.owner}\", name: \"${project.repo}\") { stargazerCount pushedAt }`
  );
  return `query PortfolioStats {\n${lines.join("\n")}\n}`;
}

async function fetchRepoStatsGraphQL(): Promise<Map<string, ProjectLiveStats> | null> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
    },
    body: JSON.stringify({ query: buildGraphQLQuery() }),
    next: { revalidate: 3600 }
  } as RequestInit);

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    data?: Record<string, GraphNode | null>;
  };

  if (!payload.data) {
    return null;
  }

  const mapped = new Map<string, ProjectLiveStats>();

  projects.forEach((project: Project, index: number) => {
    const node = payload.data?.[`r${index}`];
    mapped.set(project.repo, {
      stars: node?.stargazerCount ?? 0,
      updatedAt: node?.pushedAt ?? ""
    });
  });

  return mapped;
}

export async function getProjectsWithStats(): Promise<ProjectWithStats[]> {
  const statsMap = await fetchRepoStatsGraphQL();

  return projects.map((project: Project) => ({
    ...project,
    ...(statsMap?.get(project.repo) ?? DEFAULT_STATS)
  }));
}
