# vn-userscripts

- GitHub: https://github.com/MarvNC/vn-userscripts
- Status: active (archived: false)
- Created: 2021-06-01T01:00:39Z
- Last pushed: 2024-01-02T21:28:49Z
- Last updated: 2025-10-12T17:33:10Z
- Homepage: none
- Primary language: JavaScript
- Topics: data-visualization, enhancement, userscript, visual-novel, visual-novels, vndb
- Stars: 13
- Forks: 0
- Open issues: 4
- Default branch: master
- License: MIT License

## One-liner
A focused JavaScript userscript suite for VNDB and related visual novel sites that adds practical data overlays, browsing shortcuts, and spoiler-safe quality-of-life features.

## What It Does
- Adds official links, release-date details, and store links on VNDB entries, with retail price fetching for multiple storefronts (including Steam, DMM, Getchu, Toranoana, Melonbooks, Denpasoft, Nutaku, and Fakku).
- Surfaces platform support by language and release-state cues to make localization and availability checks faster while browsing VNDB.
- Inserts an at-a-glance table on staff and producer pages to summarize visual novels on the user's list with toggleable list-label views.
- Provides interactive score-history graphs on VNDB visual novel pages, including legend toggles, zoom support, and quick table copy for lightweight analysis.
- Hides Seiya Saiga choice spoilers behind click-to-reveal bars for cleaner route-planning without immediate spoiler exposure.

## Stack And Delivery
- Built as browser userscripts in JavaScript, distributed as direct installable `.user.js` files from the repository.
- Targets script-manager workflows (README recommends Violentmonkey), keeping install and updates simple for end users.
- Integrates with VNDB page structures plus external retailer pages/APIs for link and pricing enrichment.
- Uses static README-based product documentation with GIF and screenshot demos to communicate feature behavior quickly.

## Portfolio Notes
- Strong niche-product fit: solves concrete workflow pain points for visual novel enthusiasts rather than shipping generic browser tweaks.
- Demonstrates practical frontend augmentation skills: DOM extension, cross-site data stitching, and UX touches for high-information pages.
- Good evidence of long-tail maintainability: repository remains discoverable and updated over time despite low release cadence.
- Best positioned in a portfolio as a focused utility product that shows user empathy, domain knowledge, and end-to-end script packaging.
