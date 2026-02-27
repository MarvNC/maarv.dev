# rotmg-player-stats
- GitHub: https://github.com/MarvNC/rotmg-player-stats
- Status: active (archived: false)
- Created: 2026-02-16T03:07:46Z
- Last updated: 2026-02-23T04:51:22Z
- Last pushed: 2026-02-27T09:01:16Z
- Homepage: https://rotmg-stats.maarv.dev/
- Primary language: TypeScript
- Topics: none
- Stars: 0
- Forks: 0
- Open issues: 0
- Default branch: master
- License: none

## One-liner
Static React dashboard for historical Realm of the Mad God player counts, with an automated scrape-to-aggregate data pipeline for fresh trend views.

## What It Does
- Tracks historical RotMG player-count trends in a browser dashboard focused on time-series visibility.
- Scrapes live signals from RealmEye and RealmStock and appends timestamped CSV snapshots.
- Aggregates raw CSV history into consumable JSON (`daily.json`) for fast client-side chart rendering.
- Provides both chart and table-style exploration patterns for viewing long-running population data.
- Supports migration scripts that normalize historical source files into the current release data format.

## Stack And Delivery
- Frontend stack: React + TypeScript built with Vite and managed with Bun.
- Visualization and data UX: uPlot for time-series charts; TanStack Table plus TanStack Virtual for scalable tabular browsing.
- Data pipeline scripts: `scrape`, `scrape:dry-run`, `aggregate`, and migration commands for RealmEye and RealmStock histories.
- Delivery model: static site output plus generated data artifacts intended for scheduled publishing.
- Build/release workflow includes local type-check/build scripts (`bun run build`) and CI-friendly aggregation flow.

## Portfolio Notes
- Strong feature project for "data product" storytelling: combines ingestion, transformation, and frontend analytics in one repo.
- Good evidence of operational thinking via dry-run scraping, migration tooling, and repeatable aggregation commands.
- Niche domain focus (RotMG) helps demonstrate product sense for a real community use case rather than a generic demo.
- Consider adding a short architecture diagram and sample KPI callouts to make portfolio impact clearer for non-gaming reviewers.
