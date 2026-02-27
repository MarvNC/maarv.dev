# wikipedia-yomitan
- GitHub: https://github.com/MarvNC/wikipedia-yomitan
- Status: active
- Last pushed: 2024-07-12T18:11:07Z
- Last updated: 2026-02-26T03:51:53Z
- Homepage: none
- Role: owner
- Repo type: tool
- Primary language: TypeScript
- Language breakdown: TypeScript (100%)
- Suggested tags: yomitan, yomichan, wikipedia, dbpedia, dictionary, bun, typescript, cli
- Tier suggestion: feature
## One-liner
TypeScript/Bun pipeline that converts DBpedia Wikipedia short-abstract dumps into Yomitan dictionaries and publishes downloadable release artifacts. It targets multilingual lookup workflows (non-English focus) for Yomitan users.
## Evidence
- `gh api repos/MarvNC/wikipedia-yomitan` shows `archived: false`, `language: TypeScript`, no homepage, and owner `MarvNC`.
- `gh api repos/MarvNC/wikipedia-yomitan/languages` returns only TypeScript bytes (`{"TypeScript":30888}`), indicating a fully TypeScript codebase.
- `gh api repos/MarvNC/wikipedia-yomitan/git/trees/master?recursive=1` lists Bun/TS source (`src/index.ts`, `src/release.ts`) plus CI workflows for tests and release upload.
- README states it is a conversion of DBpedia short-abstract Wikipedia dumps for Yomitan and documents Bun commands (`bun run start`, `bun run start -a`) to build dictionaries.
- Latest release endpoint reports `v1.6.1` published `2024-07-12T17:17:10Z`, supporting active distribution despite slower code push cadence.
