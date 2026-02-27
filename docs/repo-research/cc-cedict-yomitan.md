# cc-cedict-yomitan
- GitHub: https://github.com/MarvNC/cc-cedict-yomitan
- Status: active
- Last pushed: 2026-02-27T02:41:58Z
- Last updated: 2026-02-22T08:55:11Z
- Homepage: none
- Role: owner
- Repo type: dataset
- Primary language: TypeScript
- Language breakdown: TypeScript (100%)
- Suggested tags: chinese-dictionary, cantonese, yomitan, dataset-generation, bun, github-actions
- Tier suggestion: feature

## One-liner
Automated pipeline that fetches CC-CEDICT and CC-Canto source data, converts it into Yomitan-ready dictionary packages, and publishes updated release artifacts daily. This is a practical language-learning dataset repo backed by reproducible build scripts.

## Evidence
- `gh api repos/MarvNC/cc-cedict-yomitan` shows `default_branch: master`, `archived: false`, owner `MarvNC`, and recent `pushed_at`/`updated_at` timestamps.
- `gh api repos/MarvNC/cc-cedict-yomitan/git/trees/master?recursive=1` shows build-focused TypeScript sources under `src/` plus CI workflow at `.github/workflows/build-and-release.yaml`.
- `package.json` scripts run `bun run src/fetch-cedict.ts` and `bun run src/main.ts`, indicating a Bun-based data fetch + transform pipeline.
- `src/fetch-cedict.ts` downloads CC-CEDICT and CC-Canto archives, decompresses/extracts expected files into `./data`.
- `src/main.ts` parses source lines and exports multiple Yomitan zip artifacts (`CC-CEDICT.zip`, `CC-CEDICT.Canto.zip`, `CC-Canto.zip`) using `yomichan-dict-builder`.
- `.github/workflows/build-and-release.yaml` runs on a daily cron (`0 0 * * *`) and publishes release files from `build/*`, confirming ongoing automated dataset delivery.
