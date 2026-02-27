export type BubbleSize = "hero" | "feature" | "cluster";

export type Project = {
  name: string;
  owner: string;
  repo: string;
  href: string;
  description: string;
  tags: string[];
  size: BubbleSize;
  archived?: boolean;
  website?: string;
  role?: "maintainer" | "contributor";
};

export type ProjectLiveStats = {
  stars: number;
  updatedAt: string;
};

type RepoSeed = Omit<Project, "name" | "href">;

const seeds: RepoSeed[] = [
  { owner: "MarvNC", repo: "GeiDuckApp", description: "Desktop app for language-first workflows and rapid lookup tooling.", tags: ["language", "desktop"], size: "hero" },
  { owner: "MarvNC", repo: "FreeVinesStats", description: "Gameplay stats dashboard with tracking and trend views.", tags: ["dashboard", "gaming"], size: "hero" },
  { owner: "MarvNC", repo: "rotmg-player-stats", description: "Realm of the Mad God player statistics explorer.", tags: ["gaming", "stats"], size: "hero" },

  { owner: "MarvNC", repo: "cc-cedict-yomitan", description: "CC-CEDICT dictionary packaging for Yomitan.", tags: ["yomitan", "dictionary", "chinese"], size: "feature" },
  { owner: "MarvNC", repo: "wordshk-yomitan", description: "WordsHK to Yomitan dictionary conversion pipeline.", tags: ["yomitan", "dictionary", "cantonese"], size: "feature" },
  { owner: "MarvNC", repo: "words-hk-parse", description: "Parser and cleanup pipeline for words.hk lexical datasets.", tags: ["etl", "cantonese"], size: "feature" },
  { owner: "MarvNC", repo: "pixiv-yomitan", description: "Pixiv-focused dictionary data for Yomitan users.", tags: ["yomitan", "pixiv"], size: "feature" },
  { owner: "MarvNC", repo: "yomitan-dictionaries", description: "Collection of distributable Yomitan dictionary bundles.", tags: ["yomitan", "release"], size: "feature" },
  { owner: "MarvNC", repo: "yomichan-dict-builder", description: "Dictionary build tooling for Yomitan and Yomichan formats.", tags: ["yomitan", "build"], size: "feature" },
  { owner: "MarvNC", repo: "yomichan-dict-reader", description: "Read and inspect Yomichan/Yomitan dictionary archives.", tags: ["yomitan", "parser"], size: "feature" },
  { owner: "MarvNC", repo: "yomitan-dict-stats", description: "Generate analytics and quality metrics for dictionary packs.", tags: ["yomitan", "analytics"], size: "feature" },
  { owner: "MarvNC", repo: "wikipedia-yomitan", description: "Wikipedia-derived data transformed for Yomitan usage.", tags: ["yomitan", "wikipedia"], size: "feature" },
  { owner: "MarvNC", repo: "jpdb-freq-list", description: "JPDB frequency list utilities and transforms.", tags: ["japanese", "frequency"], size: "feature" },
  { owner: "MarvNC", repo: "kanjidego-yomitan-anki", description: "Kanjidego pipeline for Yomitan and Anki outputs.", tags: ["yomitan", "anki"], size: "feature" },
  {
    owner: "yomidevs",
    repo: "yomitan",
    description: "Browser dictionary extension; I contribute and help maintain the project.",
    tags: ["yomitan", "browser-extension", "maintainer"],
    size: "feature",
    role: "maintainer"
  },

  { owner: "MarvNC", repo: "lolibrary-links", description: "Adds helper links and metadata shortcuts for lolibrary browsing.", tags: ["userscript", "metadata"], size: "cluster" },
  { owner: "MarvNC", repo: "day-one-to-md", description: "Export and convert Day One journal entries to Markdown.", tags: ["conversion", "markdown"], size: "cluster" },
  { owner: "MarvNC", repo: "mydramalist-native-titles", description: "Shows native-language titles on MyDramaList pages.", tags: ["userscript", "kdrama"], size: "cluster" },
  { owner: "MarvNC", repo: "pixiv-dump", description: "Utilities for collecting and exporting Pixiv data.", tags: ["pixiv", "automation"], size: "cluster" },
  { owner: "MarvNC", repo: "EReaders-for-Language-Learning", description: "Reference tooling and notes for language learning with e-readers.", tags: ["resources", "learning"], size: "cluster" },
  { owner: "MarvNC", repo: "ReallySafeSkiing", description: "Small utility project from experimentation and scripting workflows.", tags: ["utility"], size: "cluster" },
  { owner: "MarvNC", repo: "nyaawords", description: "Text and metadata helpers for Nyaa-oriented workflows.", tags: ["text", "utility"], size: "cluster" },
  { owner: "MarvNC", repo: "win-to-mac-ahk", description: "AutoHotkey mappings for Windows to Mac-style key behavior.", tags: ["ahk", "productivity"], size: "cluster" },
  { owner: "MarvNC", repo: "AB-enhancements", description: "Enhancements and UI polish scripts for media tracking sites.", tags: ["userscript", "ui"], size: "cluster" },
  { owner: "MarvNC", repo: "JP-Resources", description: "Curated Japanese learning resources and indexing helpers.", tags: ["learning", "resources"], size: "cluster" },
  { owner: "MarvNC", repo: "better-bookwalker", description: "BookWalker user experience improvements and shortcuts.", tags: ["userscript", "books"], size: "cluster" },
  { owner: "MarvNC", repo: "anki-card", description: "Anki card generation and formatting utilities.", tags: ["anki", "automation"], size: "cluster" },
  { owner: "MarvNC", repo: "StampNyaa", description: "Small script utility for custom stamp and upload workflows.", tags: ["script", "utility"], size: "cluster" },
  { owner: "MarvNC", repo: "name-ln", description: "Naming helpers for light novel metadata cleanup.", tags: ["metadata", "light-novel"], size: "cluster" },
  { owner: "MarvNC", repo: "light-novel-naming-scheme", description: "Normalization rules for light novel naming conventions.", tags: ["metadata", "normalization"], size: "cluster" },
  { owner: "MarvNC", repo: "canvas-attendance-sheets", description: "Tools for Canvas attendance exports and formatting.", tags: ["education", "automation"], size: "cluster" },
  { owner: "MarvNC", repo: "discord-websocket-text-inserter", description: "Websocket bridge utilities for text insertion workflows.", tags: ["discord", "websocket"], size: "cluster" },
  { owner: "MarvNC", repo: "japanese-furigana-normalize", description: "Normalize Japanese text and furigana formatting.", tags: ["japanese", "text"], size: "cluster" },
  { owner: "MarvNC", repo: "is-cjk-hanzi", description: "Utility package for CJK Hanzi detection checks.", tags: ["library", "cjk"], size: "cluster" },
  { owner: "MarvNC", repo: "vn-userscripts", description: "Userscripts for visual novel and reading-related sites.", tags: ["userscript", "visual-novel"], size: "cluster" },
  { owner: "MarvNC", repo: "twitter-rss-discord-webhook", description: "Forward RSS feed updates to Discord webhooks.", tags: ["discord", "rss", "automation"], size: "cluster" },
  { owner: "MarvNC", repo: "vndb-highlighter", description: "Highlighting and filtering helpers for VNDB pages.", tags: ["userscript", "vndb"], size: "cluster" },
  { owner: "MarvNC", repo: "texthooker-websocket", description: "Text hooking and websocket transport helpers.", tags: ["websocket", "text"], size: "cluster" }
];

export const projects: Project[] = seeds.map((seed) => ({
  ...seed,
  name: seed.repo,
  href: `https://github.com/${seed.owner}/${seed.repo}`
}));
