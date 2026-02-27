# wikipedia-yomitan
- GitHub: https://github.com/MarvNC/wikipedia-yomitan
- Status: active (archived: false)
- Created: 2023-12-20T01:44:04Z
- Updated: 2026-02-26T03:51:53Z
- Last pushed: 2024-07-12T18:11:07Z
- Homepage: none
- Primary language: TypeScript
- Topics: chinese, chinese-dictionary, dbpedia, dictionary, japanese, japanese-dictionary, wikipedia, yomichan, yomitan, yomitan-dictionaries
- Stars: 42
- Forks: 1
- Open issues: 1
- Default branch: master
- License: MIT License

## One-liner
TypeScript and Bun build pipeline that converts DBpedia Wikipedia short-abstract dumps into downloadable Yomitan dictionaries for large-scale multilingual term lookup.

## What It Does
- Transforms DBpedia short abstracts into Yomitan dictionary entries with an abstract plus source Wikipedia link.
- Ships broad multilingual coverage (dozens of language editions) so users can look up terms across non-English content.
- Publishes installable dictionary artifacts through GitHub Releases for direct import into Yomitan.
- Supports targeted single-language builds and full-batch builds through CLI commands.
- Provides a development mode for smaller sample outputs to speed local testing.

## Stack And Delivery
- Core implementation is TypeScript; repository metadata reports TypeScript as the primary language.
- Uses Bun as the runtime and task runner (`bun run start`, `bun run start -a`) for build orchestration.
- Built on top of `yomichan-dict-builder` to generate Yomitan-compatible dictionary packages.
- Delivery model is release-based distribution from GitHub Releases rather than a hosted web app.
- Data dependency is DBpedia dump snapshots, with README noting no newer dumps after 2022-12.

## Portfolio Notes
- Strong example of data engineering for language tooling: download, normalize, transform, and package a large public corpus.
- Demonstrates product thinking for real user workflows (popup dictionary lookups) instead of a one-off script.
- Good evidence of operational tradeoff handling: clear communication about upstream data staleness and update constraints.
- Worth highlighting for multilingual ecosystem impact and practical open-source distribution.
