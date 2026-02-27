# twitter-rss-discord-webhook
- GitHub: https://github.com/MarvNC/twitter-rss-discord-webhook
- Status: active (archived: false)
- Created: 2023-09-06T03:33:54Z
- Last pushed: 2023-11-11T21:08:10Z
- Last updated: 2026-01-15T13:50:40Z
- Homepage: none
- Primary language: JavaScript
- Topics: discord, discord-twitter-bot, fxtwitter, nitter, twitter
- Stars: 10
- Forks: 4
- Open issues: 1
- Default branch: master
- License: none

## One-liner
A Node.js webhook relay that monitors Nitter RSS feeds and sends posts to Discord, with optional DeepL translation and fxtwitter link rewriting for richer embeds.

## What It Does
- Polls one or more Nitter RSS feeds on a schedule and posts new entries to Discord webhooks.
- Supports per-feed routing so different Twitter sources can publish to different Discord channels.
- Optionally translates post text with DeepL before publishing, using a target language per feed.
- Rewrites tweet links to fxtwitter/FixTweet URLs to improve embed rendering inside Discord.
- Includes configurable polling interval and feed spacing to reduce rate-limit pressure.

## Stack And Delivery
- Built as a lightweight JavaScript automation script for Node.js (README notes Node 18+ requirement).
- Delivered as a repo-level script workflow: clone, configure `settings.json`, install deps, run with `npm start`.
- Configuration-first design via `settings.example.json` for API key, polling cadence, and feed mappings.
- Integrates external services directly: Nitter RSS input, Discord webhook output, optional DeepL API translation.

## Portfolio Notes
- Strong example of practical API orchestration: ingest, transform, and publish across three external platforms.
- Demonstrates product-minded detail through embed quality improvements (fxtwitter rewrite) and translation support.
- Good artifact for "small tool, real utility" curation in automation/dev-tools collections.
- Repository activity suggests mature-but-stable utility behavior rather than rapid feature churn.
