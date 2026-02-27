# FreeVinesStats
- GitHub: https://github.com/MarvNC/FreeVinesStats
- Status: active
- Last pushed: 2026-01-30T08:06:40Z
- Last updated: 2026-01-30T08:06:43Z
- Homepage: https://vine.maarv.dev/
- Role: owner
- Repo type: app
- Primary language: TypeScript
- Language breakdown: TypeScript (~94.9%), HTML (~3.2%), CSS (~1.9%), JavaScript (~1.1%)
- Suggested tags: react, typescript, vite, data-visualization, dashboard, amazon-vine
- Tier suggestion: feature

## One-liner
FreeVinesStats is a React + TypeScript web dashboard that visualizes Amazon Vine drop activity from a remote stats feed. It focuses on time-based trends (hourly, daily, weekly) with interactive filtering and chart views.

## Evidence
- `gh api repos/MarvNC/FreeVinesStats` reports `archived: false`, `default_branch: main`, `language: TypeScript`, and homepage `https://vine.maarv.dev/`.
- `gh api repos/MarvNC/FreeVinesStats/languages` returns TypeScript as dominant (65541 bytes), with smaller HTML/CSS/JavaScript usage.
- `gh api repos/MarvNC/FreeVinesStats/git/trees/main?recursive=1` shows a Vite/React frontend structure: `App.tsx`, `index.tsx`, `vite.config.ts`, `tailwind.config.js`, component folders, and `scripts/benchmark-stats.test.ts`.
- `package.json` confirms app tooling and runtime stack: `vite`, `react`, `react-dom`, `recharts`, `tailwindcss`, and TypeScript build scripts.
- `services/api.ts` fetches dashboard data from `https://vine-api.maarv.dev/stats.json`, indicating this repo is the frontend visualization client.
- `README.md` is brief and describes it as a simple React frontend for Amazon Vine drop statistics, so repo-type inference is based on source/config structure.
