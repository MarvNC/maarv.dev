# better-bookwalker
- GitHub: https://github.com/MarvNC/better-bookwalker
- Status: active
- Last pushed: 2025-05-29T19:11:31Z
- Last updated: 2025-09-02T07:53:35Z
- Homepage: none
- Role: owner
- Repo type: userscript
- Primary language: TypeScript
- Language breakdown: TypeScript (60.4%), JavaScript (37.0%), CSS (2.6%)
- Suggested tags: userscript, bookwalker, charts, react, vite, typescript, browser-extension-adjacent
- Tier suggestion: feature

## One-liner
Modern Bookwalker enhancement userscript that adds richer series views and release-date charting, built with a React + Vite userscript pipeline and published as a `.user.js` installable script.

## Evidence
- `gh api repos/MarvNC/better-bookwalker` shows `archived: false`, topics `bookwalker/charts/userscript`, default branch `main`, and recent maintenance timestamps.
- `gh api repos/MarvNC/better-bookwalker/languages` reports TypeScript as the largest share, with JavaScript and CSS also present.
- `gh api repos/MarvNC/better-bookwalker/git/trees/main?recursive=1` includes `release-dates.user.js`, `src/` React/TSX components, and CI workflows in `.github/workflows/`.
- `README.md` describes installation via Violentmonkey and links to `releases/latest/download/better-bookwalker.user.js`, confirming end-user userscript distribution.
- `package.json` uses `vite-plugin-monkey` plus React dependencies and build scripts (`pnpm dev`, `pnpm build`) consistent with a maintained TypeScript userscript app.
