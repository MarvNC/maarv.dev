# nyaawords
- GitHub: https://github.com/MarvNC/nyaawords
- Status: active
- Last pushed: 2025-12-04T05:49:45Z
- Last updated: 2025-12-04T05:49:49Z
- Homepage: https://nyaawords.app/
- Role: owner
- Repo type: app
- Primary language: TypeScript
- Language breakdown: TypeScript 93.5%, CSS 3.7%, JavaScript 1.8%, Shell 1.0%
- Suggested tags: dictionary, multilingual, llm, gemini, nextjs, anki, pwa
- Tier suggestion: feature

## One-liner
AI-powered multilingual dictionary web app built with Next.js and Gemini, focused on high-quality structured entries and export workflows for language learning.

## Evidence
- `gh api repos/MarvNC/nyaawords` reports `archived: false`, `language: "TypeScript"`, homepage `https://nyaawords.app/`, and recent activity (`pushed_at`/`updated_at` on 2025-12-04).
- `gh api repos/MarvNC/nyaawords/languages` returns TypeScript-dominant code with smaller CSS/JavaScript/Shell components.
- Repository tree (`gh api repos/MarvNC/nyaawords/git/trees/main?recursive=1`) shows a Next.js app layout under `nyaawords/app`, UI components under `nyaawords/components`, and core logic under `nyaawords/lib`.
- `nyaawords/README.md` describes multi-language dictionary lookup, Gemini integration, schema validation, caching, and language-learning features including Anki roadmap/support.
- `nyaawords/package.json` confirms app stack and runtime (`next`, `react`, `next-pwa`, `@google/genai`, `ajv`, Bun scripts).
- `.github/workflows/ci.yml` runs format, type-check, lint, and build jobs, indicating active engineering hygiene.
