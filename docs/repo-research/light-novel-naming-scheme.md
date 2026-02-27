# light-novel-naming-scheme

- GitHub: https://github.com/MarvNC/light-novel-naming-scheme
- Status: active (archived: false)
- Created: 2024-10-14T20:41:02Z
- Last pushed: 2024-10-16T19:57:46Z
- Last updated: 2024-10-16T19:57:50Z
- Default branch: master
- Homepage: none
- Primary language: none detected
- Topics: none
- Stars: 0
- Forks: 0
- Open issues: 0
- License: none

## One-liner
Documentation-first naming specification for light novel releases that standardizes file and folder names to keep collections sortable, consistent, and machine-parseable across publishers, retailers, and release types.

## What It Does
- Defines a canonical filename schema with ordered components (author, date, optional volume marker, title, publisher/label, retailer, extra info, and revision).
- Prioritizes deterministic sorting by enforcing `YYYYMMDD` dates and stable component ordering, reducing rename churn over time.
- Documents decision rules for edge cases, including title subtitles, bundled extras, revisions, and release-specific annotations.
- Provides a dedicated naming approach for tokuten titles so bonus material can be cataloged consistently.
- Defines a companion folder naming scheme for series-level organization with guidance for multi-arc and multi-publisher cases.

## Stack And Delivery
- Delivery model: single-source specification in README, versioned in Git for collaborative review and incremental rule updates.
- Tech footprint: no application runtime; repo is documentation/spec oriented rather than a deployable service or package.
- Tooling is lightweight and quality-focused (formatting workflow and Prettier config), signaling maintainability for a standards document.
- Integration posture: intended to be adopted by manual workflows, scripts, or automation pipelines that need predictable naming conventions.

## Portfolio Notes
- Strong artifact for information architecture and standards design: turns messy real-world naming inputs into an explicit, reusable contract.
- Demonstrates practical domain modeling for media metadata, with concrete examples that cover both Japanese and English release contexts.
- Good curation candidate as a niche but high-clarity spec project; best positioned as a supporting standards piece, not a product showcase centerpiece.
- Useful to pair with downstream tooling (renamers, validators, ingest scripts) to show end-to-end impact from spec to automation.
