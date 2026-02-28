# maarv.dev

Interactive portfolio built with React, Vite, Tailwind, and Framer Motion bento animations.

## Stack

- Vite
- React + TypeScript
- Tailwind CSS
- Bun runtime / package manager

## Development

Install dependencies:

```bash
bun install
```

Run local dev server:

```bash
bun run dev
```

Useful commands:

```bash
bun run typecheck
bun run lint
bun run build
bun run format
```

## Data

- Project metadata lives in `data/projects.json`.
- `app/providers.tsx` fetches `stats.json` from the `data` branch on GitHub CDN at runtime.
- `scripts/generate-stats.mjs` builds the stats snapshot.
- `.github/workflows/update-stats-data.yml` overwrites the `data` branch every 24h.

Optional local environment variables:

```bash
GITHUB_TOKEN=your_token_here
VITE_STATS_URL=https://raw.githubusercontent.com/MarvNC/maarv.dev/data/stats.json
```

For GitHub Actions, set `GH_STATS_TOKEN` in repository secrets if the default workflow token cannot access all repos.
