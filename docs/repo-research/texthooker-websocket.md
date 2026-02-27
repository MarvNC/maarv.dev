# texthooker-websocket

- GitHub: https://github.com/MarvNC/texthooker-websocket
- Status: archived
- archived: true
- created_at: 2022-11-22T20:49:36Z
- updated_at: 2023-02-03T17:58:01Z
- pushed_at: 2023-01-15T07:43:26Z
- homepage: none
- language: JavaScript
- topics: none
- stargazers_count: 6
- forks_count: 0
- open_issues_count: 0
- default_branch: master
- license: none

## One-liner
Legacy JavaScript userscript for piping Textractor websocket text into Anacreon texthooker pages, later superseded by `Renji-XD/texthooker-ui`.

## What It Does
- Connects a texthooker page to the Textractor Websocket plugin so extracted lines appear immediately.
- Replaces clipboard polling workflows with websocket delivery to reduce delay, skipped lines, and clipboard interference.
- Supports text editing on inserted lines and manual line insertion through standard paste actions.
- Adds timer-aware behavior such as preventing inserts while paused, optional auto-pause on idle, and pause-state visibility cues.
- Provides quick session metrics handling, including easy copy of count and timing fields for spreadsheet logging.

## Stack And Delivery
- Primary implementation is a browser userscript (`texthooker.user.js`) in JavaScript.
- Intended runtime is a userscript manager (README recommends Violentmonkey).
- Integrates with the external Textractor Websocket plugin as the text event source.
- Targets the Anacreon texthooker page in both hosted and locally saved usage noted by the README.
- Repository delivery is source-only with no release artifacts, service backend, or deployment pipeline.

## Portfolio Notes
- Useful as a focused automation artifact showing practical websocket integration for a niche translation workflow.
- Demonstrates product thinking around operator ergonomics: low-latency ingest, pause safeguards, and fast logging support.
- Archived and explicitly replaced, so position this as historical groundwork rather than a current flagship.
- Best curated as a supporting project in a "developer tooling" or "workflow acceleration" subsection.
