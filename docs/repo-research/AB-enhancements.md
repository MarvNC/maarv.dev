# AB-enhancements
- GitHub: https://github.com/MarvNC/AB-enhancements
- Status: active (not archived)
- Archived: false
- Created: 2022-12-12T06:16:59Z
- Last pushed: 2025-06-23T21:31:15Z
- Last updated: 2025-06-23T21:31:20Z
- Homepage: none
- Primary language: JavaScript
- Topics: none
- Stars: 0
- Forks: 1
- Open issues: 0
- Default branch: master
- License: none

## One-liner
Browser userscripts for AnimeBytes that speed up upload workflows and improve torrent browsing through metadata autofill and advanced release filtering.

## What It Does
- Autofills AnimeBytes printed media upload fields from Bookwalker links or search results.
- Supports Anilist manga and light novel links or title search as an alternate metadata source.
- Streamlines upload form completion for manga and light novel tabs with a one-click autofill flow.
- Adds torrent release filtering controls for source, container, codec, resolution, audio codec, channels, and Japanese subtitle presence.
- Supports power-user interactions such as Alt+click single-select behavior and manual filter fields (for example, format and completion status).

## Stack And Delivery
- Implemented in JavaScript as userscripts intended for Violentmonkey-style browser execution.
- Delivered as AnimeBytes-targeted enhancement scripts rather than a standalone web app or service.
- Integrates with third-party metadata sources (Bookwalker and Anilist) to enrich upload forms.
- Depends on AB Mediainfo Improvements for the torrent release filtering script.
- Uses a simple GitHub repository distribution model with default branch `master` and no published homepage.

## Portfolio Notes
- Good example of practical workflow automation in a niche, real-user domain (private tracker upload and discovery UX).
- Shows ability to combine UI augmentation, metadata ingestion, and filtering logic in lightweight browser tooling.
- Demonstrates product thinking around time savings: fewer manual form steps and faster release triage.
- Best positioned as an applied scripting and productivity project rather than a framework-heavy frontend build.
