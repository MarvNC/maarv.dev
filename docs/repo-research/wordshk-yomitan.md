# wordshk-yomitan
- GitHub: https://github.com/MarvNC/wordshk-yomitan
- Status: active
- Last pushed: 2026-02-27T02:10:17Z
- Last updated: 2026-01-17T04:33:04Z
- Homepage: none
- Role: owner
- Repo type: dataset
- Primary language: JavaScript
- Language breakdown: JavaScript (100%)
- Suggested tags: cantonese, yomitan, dictionary, linguistic-data, data-pipeline, github-actions
- Tier suggestion: feature

## One-liner
Automated pipeline that fetches Words.hk source data and publishes Yomitan-ready Cantonese dictionaries as versioned GitHub releases. It turns raw CSV exports into installable term, hanzi, and frequency dictionaries for end users.

## Evidence
- Repository API metadata shows description "Words.hk for Yomitan," default branch `master`, MIT license, active topics (`cantonese`, `dictionary`, `yomitan`), and `archived: false`.
- `readme.md` states the project converts Words.hk data for Yomitan and releases updates automatically every day.
- `.github/workflows/daily-build.yaml` runs on a daily cron (`0 0 * * *`), executes download/build scripts, and publishes release artifacts from `dist/*`.
- `package.json` scripts define a build pipeline: `download`, `buildTermDict`, `buildHonziDict`, and `buildFreq`.
- `src/downloadLatest.js` fetches current CSV exports from `words.hk/faiman/request_data/`, downloads `.csv.gz` files, and extracts them for processing.
- `src/convertToTermDictionary.js` uses `yomichan-dict-builder` to produce versioned zip dictionaries with release-linked metadata.
