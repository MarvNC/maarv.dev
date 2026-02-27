# Founding Specification: Interactive Bento Portfolio

## 1. Aesthetic & UI/UX Guidelines

The visual language will abandon the rigid, hyper-technical look of a standard developer portfolio in favor of a modern, playful, and approachable interface.

- **Typography:** **Dosis** (via `next/font/google`). This font drives the "soft and round" aesthetic. It will be used globally—heavier weights (600/700) for repository titles and command palette inputs, and lighter weights (400/500) for blurbs and metadata.
- **Color Palette:**
- **Background:** A very subtle, cool-toned off-white (e.g., `#F8FAFC` or a custom extremely light blue tint) to keep the contrast low and comfortable.
- **Card Backgrounds:** Pure white (`#FFFFFF`) to make the bento boxes pop against the background.
- **Primary Accent:** A playful, vibrant light blue (matching your GitHub avatar's vibe). This will be used for focus rings, active tags, command palette highlighting, and primary buttons.
- **Text:** Deep slate or navy instead of pure black, maintaining the soft aesthetic.

- **Geometry & Styling:**
- Extreme border radii. Bento cards will use Tailwind's `rounded-3xl` or custom large pixel values.
- Soft, diffused drop shadows (`shadow-sm` by default, expanding to a wider, softer shadow on hover).
- No harsh borders. Separation is achieved through white space and shadows.

## 2. Technical Stack

- **Runtime & Package Manager:** **Bun**. Selected for sub-second package installation and extremely fast local development server startup.
- **Framework:** **Next.js (App Router)**. Utilized for its Incremental Static Regeneration (ISR) to handle GitHub API calls securely on the server without rate-limiting the client.
- **Styling:** **Tailwind CSS**. Enables rapid construction of the responsive CSS Grid required for the bento layout and easy configuration of the custom color palette and border radii.
- **Animation:** **Framer Motion**. Critical for the interactive feel. It will handle the fluid layout recalculations (`<motion.div layout>`) when the grid filters and reshuffles.
- **Hosting:** **Cloudflare Pages**. Offers native Next.js support, edge-network speed, and seamless GitHub integration for CI/CD deployments.

## 3. Core Architecture & Layout

### The Command Palette (The Anchor)

- **Positioning:** Fixed or sticky at the top center of the viewport, serving as the immediate focal point.
- **Design:** A large, pill-shaped input field (maximum border radius). It will feature a subtle light blue glowing shadow when focused.
- **Functionality:** Binds to `Cmd+K` and `/`. As the user types, it updates a global React state that instantly filters the Bento Grid below.
- **Filter Pills:** Directly underneath the input, a row of pill-shaped tags (e.g., `All`, `Websites`, `Yomitan`, `Userscripts`) allows mouse-driven filtering.

### The Bento Grid (The Content)

- **Structure:** A responsive CSS Grid. `grid-cols-1` on mobile, scaling up to `grid-cols-3` or `grid-cols-4` on desktop.
- **Card Hierarchy:**
- **Hero Cards (2x2 Spans):** Reserved for flagship projects like ReallySafeSkiing, GeiDuckApp, rotmg-player-stats, FreeVinesStats. These feature larger Dosis typography, custom light-blue vector graphics or screenshots, and a prominent "Visit Site" call to action.
- **Feature Cards (1x2 or 2x1 Spans):** Highlighting the Yomitan ecosystem and major tools (cc-cedict-yomitan, words-hk-parse). Includes live GitHub stars, last updated timestamps, and a 1-2 sentence description.
- **List Cards (1x1 Spans):** Groups of smaller projects. A single card titled "Userscripts" will contain a clean, internally scrollable list of projects like vn-userscripts and better-bookwalker.

## 4. Data Fetching Strategy (Next.js ISR)

To ensure the site remains perfectly static and instantaneous while displaying accurate GitHub data:

1. **Build Time:** Next.js executes a single GraphQL query to the GitHub API using a Personal Access Token (stored in Cloudflare environment variables). This fetches stars, descriptions, and commit dates for all specified repositories.
2. **Caching:** The data is passed to the Bento Grid components. The page is rendered as static HTML.
3. **Revalidation:** The route is configured with `export const revalidate = 3600` (1 hour). Cloudflare Pages will serve the static site to users instantly, updating the cached GitHub statistics in the background every hour.

## 5. Implementation Roadmap

- **Phase 1: Foundation.** Initialize the Bun + Next.js project. Configure Tailwind with the Dosis font, custom light blue palette, and extended border radii.
- **Phase 2: Data Layer.** Write the `data.ts` mapping file that categorizes your repositories into the bento tiers. Draft and test the GitHub GraphQL query.
- **Phase 3: UI Construction.** Build the static CSS Grid. Create the distinct Hero, Feature, and List card components.
- **Phase 4: Interactivity.** Build the Command Palette component. Implement the filtering logic.
- **Phase 5: Animation.** Wrap the bento cards in Framer Motion. Tune the spring physics so the cards "bounce" softly into place when the grid reorganizes, matching the playful aesthetic.
- **Phase 6: Deployment.** Connect the repository to Cloudflare Pages, inject the GitHub PAT environment variable, and deploy.
