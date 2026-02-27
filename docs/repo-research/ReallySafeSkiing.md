# ReallySafeSkiing
- GitHub: https://github.com/MarvNC/ReallySafeSkiing
- Status: active
- Last pushed: 2025-12-10T10:37:57Z
- Last updated: 2025-12-10T10:38:00Z
- Homepage: https://ski.maarv.dev/
- Role: owner
- Repo type: app
- Primary language: TypeScript
- Language breakdown: TypeScript (~94%), HTML (~3%), JavaScript (~2%), CSS (~1%)
- Suggested tags: web-game, skiing, threejs, react, vite, rapier3d, procedural-generation, pwa
- Tier suggestion: hero
## One-liner
ReallySafeSkiing is a deployed browser game: a low-poly downhill skiing experience built with React, Three.js, and Rapier physics. It combines procedural terrain, multiple game modes, and mobile/desktop controls in a polished web app package.
## Evidence
- `gh api repos/MarvNC/ReallySafeSkiing` shows `archived: false`, homepage `https://ski.maarv.dev/`, and recent `pushed_at`/`updated_at` timestamps.
- `gh api repos/MarvNC/ReallySafeSkiing/languages` reports TypeScript as dominant by bytes, with smaller HTML/JavaScript/CSS usage.
- `gh api repos/MarvNC/ReallySafeSkiing/git/trees/HEAD?recursive=1` shows a Vite + React TypeScript app layout (`src/main.tsx`, many gameplay systems under `src/`, `vite.config.js`).
- README describes a playable low-poly speed-skiing game with Sprint/Arcade/Zen modes and links to live deployment.
- `package.json` confirms app-oriented stack/dependencies: React, Three.js, Rapier3D, Zustand, Vite, and `vite-plugin-pwa`.
