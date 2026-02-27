# rotmg-player-stats
- GitHub: https://github.com/MarvNC/rotmg-player-stats
- Status: active
- Last pushed: 2026-02-27T06:30:31Z
- Last updated: 2026-02-23T04:51:22Z
- Homepage: https://rotmg-stats.maarv.dev/
- Role: owner
- Repo type: website
- Primary language: TypeScript
- Language breakdown: TypeScript (113400), CSS (7127), HTML (2059), JavaScript (1539)
- Suggested tags: rotmg, analytics-dashboard, react, typescript, bun, web-scraping, github-actions, data-visualization
- Tier suggestion: feature

## One-liner
Static React dashboard for Realm of the Mad God player-count trends, backed by automated scraping, aggregation, and daily published data snapshots.

## Evidence
- Repository API reports `description` as "RotMG Player Count Stats Dashboard", `default_branch` as `master`, `archived` as `false`, and homepage set to `https://rotmg-stats.maarv.dev/`.
- `README.md` states "Static React dashboard" and documents Bun/Vite/React/TypeScript plus data scripts (`scrape`, `aggregate`, migrations).
- `package.json` includes frontend app scripts (`dev`, `build`, `preview`) and data-pipeline scripts (`scripts/scrape.ts`, `scripts/aggregate.ts`, baseline verify/prepare).
- `.github/workflows/scrape.yml` runs every 20 minutes, scrapes multiple sources, aggregates JSON, uploads CSV release assets, and publishes a `data` branch snapshot.
- `scripts/scrape.ts` fetches RealmEye, RealmStock, and launcher/Imgur signals, then appends timestamped CSV rows.
- `src/main.tsx` mounts a React app and imports `uplot` styles, confirming a browser-rendered dashboard frontend.
