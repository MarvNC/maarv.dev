# GeiDuckApp
- GitHub: https://github.com/MarvNC/GeiDuckApp
- Status: active
- Last pushed: 2026-02-17T07:05:05Z
- Last updated: 2026-02-17T07:05:08Z
- Homepage: https://geiduck.app
- Role: owner
- Repo type: app
- Primary language: TypeScript
- Language breakdown: TypeScript (311552), CSS (2060), JavaScript (794)
- Suggested tags: nextjs,typescript,cantonese,srs,flashcards,cloudflare-d1,drizzle-orm,bun
- Tier suggestion: hero

## One-liner
GeiDuckApp is a full-stack Cantonese SRS web app that combines dictionary and frequency-list data into a review workflow. It is built with Next.js + Drizzle on Cloudflare D1 and includes import pipelines for multiple Cantonese learning datasets.

## Evidence
- GitHub API metadata shows a private owner repo (`MarvNC/GeiDuckApp`) with default branch `master`, primary language `TypeScript`, and recent push/update timestamps in Feb 2026.
- `README.md` is still the default Next.js template, so project intent was validated from implementation and spec files.
- `docs/specification.md` explicitly describes "GeiDuck" as a Cantonese SRS app using words.hk, CC-CEDICT/CC-Canto, and multiple word lists.
- `package.json` includes Next.js 16, React 19, Auth.js, Drizzle ORM, Wrangler, OpenNext Cloudflare, and scripts for DB migrations/import/test/deploy.
- `src/app/page.tsx` implements a learner dashboard with streak/review KPIs, deck progress, and review entry flow.
- `src/lib/srs/session.ts` implements due/new card selection and graded review scheduling logic; `src/lib/config/decks.ts` defines Cantonese/TOCFL/frequency deck catalog.
- `wrangler.jsonc` config binds a Cloudflare D1 database (`geiduck-db`) and OpenNext worker assets, confirming Cloudflare deployment architecture.
