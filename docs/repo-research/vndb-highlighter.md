# vndb-highlighter

- GitHub: https://github.com/MarvNC/vndb-highlighter
- Status: archived (public repo)
- Created: 2021-01-16T04:01:19Z
- Updated: 2025-01-10T18:15:28Z
- Last pushed: 2023-02-28T20:11:32Z
- Homepage: none
- Default branch: main
- Primary language: JavaScript
- Topics: userscript, vndb
- Stars: 2
- Forks: 0
- Open issues: 0
- License: MIT License (MIT)

## One-liner
Archived VNDB quality-of-life userscript that highlights list-known staff/producers and adds cached role/tooltips context directly on VNDB pages; README states it was later replaced by a less laggy successor in `MarvNC/vn-userscripts`.

## What It Does
- Highlights staff and producer entries when they match items on the signed-in user VNDB list.
- Adds hover tooltips on staff/producer links showing known novels and roles for faster browsing context.
- Provides per-user highlight color customization through VNDB user settings (`/uXXXX/edit`).
- Uses cache windows to reduce repeated fetches (about 10 minutes for list data, about 1 day for tooltip data).
- Supports faster first hover behavior by triggering load when hovering unloaded links.

## Stack And Delivery
- Single-file JavaScript userscript delivered as `vndb-list-highlighter.user.js`.
- Install flow is direct raw-script install, with README recommending Violentmonkey.
- Runs client-side in the browser against VNDB staff and producer pages.
- Lightweight repository shape: script, README, and MIT license.
- Project is archived, so treat it as maintained historical work rather than active delivery.

## Portfolio Notes
- Good example of practical UX augmentation on a third-party site using only client-side scripting.
- Demonstrates performance-conscious data fetching and caching decisions in a userscript context.
- Shows product thinking around personalization (user-configurable highlight colors) and navigation speed.
- Mention successor linkage in portfolio narrative to show iteration and long-term ownership.
