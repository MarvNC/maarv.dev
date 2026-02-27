# Founding Specification: The Physics Canvas Portfolio

## 1. Core Concept & Environment

The website is not a page; it is a soft, interactive sandbox.

* **The Default State:** On load, the viewport is an airy, full-screen canvas. The Command Palette floats gently at the top center. Your projects (websites, Yomitan tools, userscripts) exist as soft, rounded "bubbles" or "pebbles" floating dynamically around the screen, bumping into each other or drifting slowly.
* **The "Gravity" Interaction:** The Command Palette acts as a magnetic center. When a user types a query (e.g., "language" or "yomitan"), the physics change instantly. Unrelated projects lose their gravity and drift off the edges of the screen or fade into the background. Matching projects are "magnetized," pulled rapidly to the center where they snap seamlessly into a structured Bento Grid layout.
* **The Vibe:** Joyful, tactile, and frictionless. It invites the user to "play" with your portfolio.

## 2. Aesthetic & Typography Specification

The visual language strictly adheres to a modern, soft, and playful aesthetic inspired by your GitHub profile's light blue colorway.

* **Typography:** **Dosis** (imported via `next/font/google`).
* *Weights:* 700/800 for the Omnibox input and project titles. 500/600 for blurbs and metadata.
* *Implementation:* Applied globally to ensure every text element reinforces the rounded, friendly feel.


* **Color Palette (Tailwind Custom Config):**
* **Background (`bg-canvas`):** A dynamic, extremely subtle mesh gradient blending off-white (`#FAFCFF`) and the lightest whisper of baby blue (`#EBF4FF`).
* **Card Backgrounds (`bg-surface`):** Translucent frosted white (Glassmorphism: `bg-white/80 backdrop-blur-md`). This ensures they look physical and layered over the canvas.
* **Primary Accent (`text-brand`, `bg-brand`):** A vibrant, playful light blue matching your avatar (e.g., `#3AB0FF`). Used for hover states, the Omnibox focus ring, and active tag pills.
* **Text (`text-primary`, `text-secondary`):** Deep slate blue (`#1E293B`) instead of harsh black, keeping the contrast soft.


* **Geometry:** Maximum border radii everywhere. Tailwind's `rounded-[2rem]` or `rounded-full` for cards and inputs. Drop shadows should be wide, colored with a hint of blue, and heavily blurred to simulate floating (`shadow-[0_20px_40px_-15px_rgba(58,176,255,0.15)]`).

## 3. Interaction & Physics Engine Design

To achieve the physics without destroying web accessibility or SEO, we will not use an HTML5 `<canvas>`. We will use DOM elements manipulated by advanced spring physics.

* **The Floating State:** Using **Framer Motion**, projects are rendered as draggable HTML `div`s. We apply a continuous, slow randomized translation (x/y) to simulate floating. Users can grab and throw the cards with their mouse (using `drag` and `dragElastic` props).
* **The Omnibox (The Magnet):** * A large, pill-shaped input floating top-center.
* Bound to `Cmd+K` and `/`.
* Features a soft, glowing blue shadow when focused.


* **The Snap-to-Grid:** When the search state updates, the Framer Motion `layout` prop takes over. The random floating positions are removed, and the matching cards animate via spring physics into a rigid CSS Grid (the Bento layout) in the center of the screen. The physics configuration will use a high bounce/low friction spring so the cards "thud" into place playfully.

## 4. Content Hierarchy (The Bubbles)

The scale of the floating objects dictates their importance.

* **Hero Bubbles (Large):** Primary apps like GeiDuckApp, FreeVinesStats, and rotmg-player-stats. These are large, pill-shaped cards featuring a distinct logo, a punchy blurb, and a primary CTA.
* **Feature Bubbles (Medium):** The Yomitan ecosystem (cc-cedict-yomitan, words-hk-parse, etc.). These display live GitHub stars, last updated times, and clear categorization tags.
* **Cluster Bubbles (Small):** Minor userscripts and utilities. When floating, they look like small tag pills. When snapped to the grid, they group together into a single "Utilities" bento card.

## 5. Technical Infrastructure

* **Runtime:** **Bun**. Ensures lightning-fast dependency resolution and local development.
* **Framework:** **Next.js (App Router)**. Provides the server environment necessary to securely fetch your GitHub data without exposing your Personal Access Token.
* **Styling:** **Tailwind CSS**. Custom-configured to handle the specific drop-shadows, the Dosis font family, and the custom light-blue color palette.
* **Animation/Physics:** **Framer Motion**. The absolute core of this project. It will handle the floating animations, the drag-and-drop physics, and the fluid layout transitions from "floating chaos" to "ordered bento grid."
* **Data Fetching:** **Next.js ISR (Incremental Static Regeneration)**. The server will hit the GitHub GraphQL API at build time, and revalidate in the background every 60 minutes. This guarantees the site loads instantly with zero spinners, but keeps your star counts and commit times fresh.
* **Hosting:** **Cloudflare Pages**. Deeply integrated with Next.js edge caching and GitHub for automated CI/CD deployments.

## 6. Implementation Phases

* **Phase 1: Environment & Styling.** Initialize Bun + Next.js. Lock in the Tailwind config (Dosis font, light blue palette, extreme border radii). Build the base mesh-gradient background.
* **Phase 2: Data Pipeline.** Write the GraphQL query to fetch the repository data. Map the repos to their respective "sizes" (Hero, Feature, Cluster). Set up the Next.js ISR route.
* **Phase 3: The Command Palette.** Build the Omnibox. Implement global state (e.g., Zustand or React Context) to track the current search query and capture the `Cmd+K` keystroke.
* **Phase 4: The Physics Sandbox.** Render the project cards using Framer Motion. Implement the random floating animation and enable drag physics.
* **Phase 5: The Magnetic Bento.** Write the logic that toggles the container class from a `relative` open canvas to a structured `grid`. Fine-tune the Framer Motion `layoutId` transitions so the cards smoothly snap from floating freely into their bento boxes when a search is executed.
