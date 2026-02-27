# jpdb-freq-list
- GitHub: https://github.com/MarvNC/jpdb-freq-list
- Status: active (archived: no)
- Created: 2022-03-08T00:51:46Z
- Last pushed: 2024-07-25T04:06:41Z
- Last updated: 2025-11-26T07:52:40Z
- Homepage: none
- Primary language: JavaScript
- Topics: frequency-list, japanese, japanese-dictionary, japanese-learning, yomichan, yomitan, yomitan-dictionaries
- Stars: 41
- Forks: 0
- Open issues: 0
- Default branch: master
- License: none

## One-liner
jpdb-freq-list is a JavaScript userscript plus published release artifacts that convert JPDB deck frequency data into Yomichan and Yomitan compatible frequency lists for Japanese lookup workflows.

## What It Does
- Adds an "Export as frequency list" action on JPDB deck vocabulary pages and generates dictionary frequency output from the active deck sort order.
- Produces downloadable frequency list releases built from most of the JPDB corpus, aimed at practical coverage for high-frequency entries.
- Supports dictionary-friendly behavior for alternate written forms and for terms missing from the JPDB corpus through explicit markers in the generated data.
- Documents a full user flow from userscript install to export, including extension recommendation and navigation path inside JPDB.
- Notes current platform constraints that limit full-list refreshes, while still preserving usable published outputs.

## Stack And Delivery
- Built as a single JavaScript userscript (`jpdb-freq-list.user.js`) intended for userscript runners, with Violentmonkey called out as the recommended runtime.
- Integrates with JPDB as the source platform and targets Yomichan and Yomitan dictionary ecosystems as the delivery format.
- Ships generated frequency lists through GitHub Releases, separating runtime script distribution from data artifact distribution.
- Uses a lightweight repository layout (script, README, images) that keeps onboarding and maintenance straightforward.

## Portfolio Notes
- Good example of productized tooling for a niche language-learning workflow: clear user pain, direct in-app action, and exportable artifact.
- Demonstrates end-to-end ownership from script UX to distribution docs and release packaging, not just raw code output.
- Credible community signal for a focused utility project (41 stars, 0 open issues) with clear domain tagging for discoverability.
- Useful to position as "developer tooling for learners" and "data pipeline at the edge" rather than a generic browser script.
