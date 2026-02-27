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

export const projects: Project[] = [
  {
    name: "GeiDuckApp",
    owner: "MarvNC",
    repo: "GeiDuckApp",
    href: "https://github.com/MarvNC/GeiDuckApp",
    description: "Desktop app focused on language tooling workflows and rapid lookup integrations.",
    tags: ["language", "desktop", "tools"],
    size: "hero"
  },
  {
    name: "FreeVinesStats",
    owner: "MarvNC",
    repo: "FreeVinesStats",
    href: "https://github.com/MarvNC/FreeVinesStats",
    description: "Stats tracker and insights dashboard for gameplay progression and build comparisons.",
    tags: ["dashboard", "gaming", "analytics"],
    size: "hero"
  },
  {
    name: "rotmg-player-stats",
    owner: "MarvNC",
    repo: "rotmg-player-stats",
    href: "https://github.com/MarvNC/rotmg-player-stats",
    description: "Player stat explorer with account snapshots, trend views, and quality-of-life tools.",
    tags: ["gaming", "api", "stats"],
    size: "hero"
  },
  {
    name: "cc-cedict-yomitan",
    owner: "MarvNC",
    repo: "cc-cedict-yomitan",
    href: "https://github.com/MarvNC/cc-cedict-yomitan",
    description: "Chinese dictionary conversion and packaging for Yomitan dictionary installs.",
    tags: ["yomitan", "dictionary", "chinese"],
    size: "feature"
  },
  {
    name: "wordshk-yomitan",
    owner: "MarvNC",
    repo: "wordshk-yomitan",
    href: "https://github.com/MarvNC/wordshk-yomitan",
    description: "Cantonese resources transformed into Yomitan-ready dictionary bundles.",
    tags: ["yomitan", "cantonese", "dictionary"],
    size: "feature"
  },
  {
    name: "words-hk-parse",
    owner: "MarvNC",
    repo: "words-hk-parse",
    href: "https://github.com/MarvNC/words-hk-parse",
    description: "Parser pipeline for extracting and normalizing words.hk lexical data.",
    tags: ["yomitan", "etl", "cantonese"],
    size: "feature"
  },
  {
    name: "pixiv-yomitan",
    owner: "MarvNC",
    repo: "pixiv-yomitan",
    href: "https://github.com/MarvNC/pixiv-yomitan",
    description: "Dictionary integration focused on Pixiv terms and creator-specific language.",
    tags: ["yomitan", "japanese", "pixiv"],
    size: "feature"
  },
  {
    name: "yomichan-dict-builder",
    owner: "MarvNC",
    repo: "yomichan-dict-builder",
    href: "https://github.com/MarvNC/yomichan-dict-builder",
    description: "Build system for producing consistent dictionary artifacts for Yomitan/Yomichan.",
    tags: ["yomitan", "build", "dictionary"],
    size: "feature"
  },
  {
    name: "yomitan-dictionaries",
    owner: "MarvNC",
    repo: "yomitan-dictionaries",
    href: "https://github.com/MarvNC/yomitan-dictionaries",
    description: "Collection and release workflow for curated Yomitan dictionaries.",
    tags: ["yomitan", "open-source", "release"],
    size: "feature"
  },
  {
    name: "yomitan",
    owner: "yomidevs",
    repo: "yomitan",
    href: "https://github.com/yomidevs/yomitan",
    description: "Browser dictionary extension for Japanese learning; I contribute and help maintain.",
    tags: ["yomitan", "browser-extension", "maintainer"],
    size: "feature",
    role: "maintainer"
  },
  {
    name: "vndb-highlighter",
    owner: "MarvNC",
    repo: "vndb-highlighter",
    href: "https://github.com/MarvNC/vndb-highlighter",
    description: "Highlighting and annotation enhancements for browsing visual novel databases.",
    tags: ["userscript", "visual-novel"],
    size: "cluster"
  },
  {
    name: "vn-userscripts",
    owner: "MarvNC",
    repo: "vn-userscripts",
    href: "https://github.com/MarvNC/vn-userscripts",
    description: "Small quality-of-life scripts for VN websites and metadata workflows.",
    tags: ["userscript", "utilities"],
    size: "cluster"
  },
  {
    name: "mydramalist-native-titles",
    owner: "MarvNC",
    repo: "mydramalist-native-titles",
    href: "https://github.com/MarvNC/mydramalist-native-titles",
    description: "Inject native titles and language cues into MyDramaList listings.",
    tags: ["userscript", "kdrama"],
    size: "cluster"
  },
  {
    name: "better-bookwalker",
    owner: "MarvNC",
    repo: "better-bookwalker",
    href: "https://github.com/MarvNC/better-bookwalker",
    description: "Interface tweaks and navigation shortcuts for smoother BookWalker reading sessions.",
    tags: ["userscript", "books"],
    size: "cluster"
  },
  {
    name: "AB-enhancements",
    owner: "MarvNC",
    repo: "AB-enhancements",
    href: "https://github.com/MarvNC/AB-enhancements",
    description: "Enhancement scripts and helpers for streamlined AniList/Bangumi style browsing.",
    tags: ["userscript", "utilities"],
    size: "cluster"
  },
  {
    name: "twitter-rss-discord-webhook",
    owner: "MarvNC",
    repo: "twitter-rss-discord-webhook",
    href: "https://github.com/MarvNC/twitter-rss-discord-webhook",
    description: "Bridge service forwarding RSS updates into Discord webhook channels.",
    tags: ["automation", "discord", "rss"],
    size: "cluster"
  }
];
