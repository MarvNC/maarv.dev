# mydramalist-native-titles
- GitHub: https://github.com/MarvNC/mydramalist-native-titles
- Status: active (archived: false)
- Created: 2022-11-21T18:45:01Z
- Last pushed: 2026-02-06T18:12:16Z
- Last updated: 2026-02-06T18:12:19Z
- Homepage: none
- Primary language: JavaScript
- Topics: none
- Stars: 2
- Forks: 1
- Open issues: 0
- Default branch: master
- License: none

## One-liner
A lightweight userscript that enhances MyDramaList by showing native-language titles for drama and staff pages, with an optional English-title toggle for mixed browsing preferences.

## What It Does
- Injects native names into MyDramaList title surfaces so users can see original-language naming alongside existing site content.
- Covers both drama pages and staff/person entries, not only a single content type.
- Includes a toggle behavior for English titles, allowing users to switch between native-only and mixed display modes.
- Ships with visual examples in the README screenshots, showing the title replacement behavior in live page contexts.

## Stack And Delivery
- Built as a plain JavaScript userscript intended for browser userscript managers.
- Distributed directly via raw script install link from GitHub, with no package registry or release artifact required.
- README explicitly recommends ViolentMonkey, and the script is compatible with common userscript workflows.
- Repo is a small single-purpose codebase with minimal operational overhead and no separate build pipeline advertised.

## Portfolio Notes
- Good support item for a frontend/browser-automation portfolio: it solves a real UX gap on a third-party media catalog site.
- Demonstrates practical DOM augmentation for an existing production website without controlling the upstream codebase.
- Shows product thinking through optional English-title toggling rather than forcing one display mode.
- Best positioned as a focused utility project (list item) rather than a flagship standalone application.
