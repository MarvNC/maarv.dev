# yomitan
- GitHub: https://github.com/yomidevs/yomitan
- Status: active
- Last pushed: 2026-02-26T02:57:27Z
- Last updated: 2026-02-27T00:59:27Z
- Homepage: https://yomitan.wiki
- Role: contributor/maintainer
- Repo type: browser-extension
- Primary language: JavaScript
- Language breakdown: JavaScript (4023982), HTML (435143), CSS (243268), Handlebars (81143)
- Suggested tags: browser-extension, language-learning, dictionary, anki, oss-maintenance
- Tier suggestion: feature

## One-liner
Contributor/maintainer work on Yomitan, a widely used open-source browser extension for language learning and dictionary lookup across Chrome, Firefox, and Edge. The project sits in a major OSS ecosystem as the actively maintained successor to Yomichan.

## Evidence
- `gh api repos/yomidevs/yomitan` reports `archived: false`, default branch `master`, primary language `JavaScript`, homepage `https://yomitan.wiki`, and recent activity (`pushed_at`/`updated_at`).
- `gh api repos/yomidevs/yomitan/git/trees/master?recursive=1` shows extension-centric structure (`ext/`, `dev/`, `test/`, `docs/`, `.github/workflows/`).
- `README.md` describes Yomitan as the successor to sunset Yomichan and explicitly calls for contributors/maintainers.
- `dev/data/manifest-variants.json` defines Manifest V3 base config and browser-specific variants (Chrome, Firefox, Edge, Safari, dev/testing builds).
- `package.json` and docs show a Node/npm toolchain with linting, TypeScript checks, vitest unit tests, Playwright tests, and build scripts.
- CI/release workflows (`.github/workflows/ci.yml`, `release.yml`, `publish-chrome.yml`) validate builds and automate multi-store publication.
