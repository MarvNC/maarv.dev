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

type GraphQLPayload = {
  data?: Record<string, GraphNode | null>;
  errors?: Array<{ message?: string }>;
};

type RestRepoPayload = {
  stargazers_count?: number;
  pushed_at?: string;
};

async function getGithubToken(): Promise<string | undefined> {
  const processToken = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? process.env.GITHUB_PAT;

  if (processToken) {
    return processToken;
  }

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const cfEnv = getCloudflareContext().env as Record<string, unknown>;
    const cfToken = cfEnv.GITHUB_TOKEN;

    if (typeof cfToken === "string" && cfToken.length > 0) {
      return cfToken;
    }
  } catch {
    // Not running in Cloudflare runtime.
  }

  return undefined;
}

function buildGraphQLQuery() {
  const lines = projects.map(
    (project: Project, index: number) =>
      `r${index}: repository(owner: \"${project.owner}\", name: \"${project.repo}\") { stargazerCount pushedAt }`
  );
  return `query PortfolioStats {\n${lines.join("\n")}\n}`;
}

async function fetchRepoStatsGraphQL(): Promise<Map<string, ProjectLiveStats> | null> {
  const token = await getGithubToken();

  if (!token) {
    return null;
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query: buildGraphQLQuery() }),
    next: { revalidate: 3600 }
  } as RequestInit);

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as GraphQLPayload;

  if (!payload.data || (payload.errors && payload.errors.length > 0)) {
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

async function fetchRepoStatsRest(): Promise<Map<string, ProjectLiveStats> | null> {
  const token = await getGithubToken();

  const stats = await Promise.all(
    projects.map(async (project: Project) => {
      const response = await fetch(`https://api.github.com/repos/${project.owner}/${project.repo}`, {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        next: { revalidate: 3600 }
      } as RequestInit);

      if (!response.ok) {
        return null;
      }

      const payload = (await response.json()) as RestRepoPayload;

      return [
        project.repo,
        {
          stars: payload.stargazers_count ?? 0,
          updatedAt: payload.pushed_at ?? ""
        }
      ] as const;
    })
  );

  const entries = stats.filter((entry) => entry !== null);

  if (entries.length === 0) {
    return null;
  }

  return new Map<string, ProjectLiveStats>(entries);
}

export async function getProjectsWithStats(): Promise<ProjectWithStats[]> {
  const statsMap = (await fetchRepoStatsGraphQL()) ?? (await fetchRepoStatsRest());

  return projects.map((project: Project) => ({
    ...project,
    ...(statsMap?.get(project.repo) ?? DEFAULT_STATS)
  }));
}
