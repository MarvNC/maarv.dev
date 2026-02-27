import { readFile, writeFile } from "node:fs/promises";

const DEFAULT_OUTPUT = "stats.json";

function parseArgs(argv) {
  const outputFlagIndex = argv.indexOf("--output");

  return {
    output: outputFlagIndex >= 0 ? argv[outputFlagIndex + 1] : DEFAULT_OUTPUT
  };
}

async function loadProjects() {
  const raw = await readFile(new URL("../data/projects.json", import.meta.url), "utf8");
  return JSON.parse(raw);
}

function buildGraphQLQuery(projects) {
  const lines = projects.map(
    (project, index) =>
      `r${index}: repository(owner: \"${project.owner}\", name: \"${project.repo}\") { stargazerCount pushedAt }`
  );

  return `query PortfolioStats {\n${lines.join("\n")}\n}`;
}

async function fetchGraphQLStats(projects, token) {
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
    body: JSON.stringify({ query: buildGraphQLQuery(projects) })
  });

  if (!response.ok) {
    await response.body?.cancel();
    return null;
  }

  const payload = await response.json();

  if (!payload?.data || (payload.errors && payload.errors.length > 0)) {
    return null;
  }

  const stats = {};

  projects.forEach((project, index) => {
    const node = payload.data[`r${index}`];
    stats[project.repo] = {
      stars: node?.stargazerCount ?? 0,
      updatedAt: node?.pushedAt ?? ""
    };
  });

  return stats;
}

async function fetchRestStats(projects, token) {
  const stats = {};

  for (const project of projects) {
    const response = await fetch(`https://api.github.com/repos/${project.owner}/${project.repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    if (!response.ok) {
      await response.body?.cancel();
      continue;
    }

    const payload = await response.json();
    stats[project.repo] = {
      stars: payload?.stargazers_count ?? 0,
      updatedAt: payload?.pushed_at ?? ""
    };
  }

  return Object.keys(stats).length > 0 ? stats : null;
}

async function main() {
  const { output } = parseArgs(process.argv.slice(2));
  const projects = await loadProjects();
  const token =
    process.env.GH_STATS_TOKEN ?? process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? process.env.GITHUB_PAT;

  const stats = (await fetchGraphQLStats(projects, token)) ?? (await fetchRestStats(projects, token)) ?? {};

  const payload = {
    generatedAt: new Date().toISOString(),
    projects: stats
  };

  await writeFile(output, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
