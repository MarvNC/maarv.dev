import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FocusEvent as ReactFocusEvent } from "react";

import type { ProjectWithStats } from "@/lib/github";

import { categoryBadgeClasses, categoryTileClasses } from "@/components/projects/category-theme";
import type { Category } from "@/components/projects/types";
import { formatUpdatedAt } from "@/components/projects/utils";

type ProjectTileProps = {
  project: ProjectWithStats;
  categories: Category[];
  primaryCategory: Category;
  index: number;
  onTagClick: (tag: string) => void;
};

const tileSizeClasses = {
  hero: "sm:col-span-2 lg:col-span-6 min-h-[248px] lg:h-[258px]",
  middle: "sm:col-span-2 lg:col-span-4 min-h-[220px] lg:h-[230px]",
  feature: "sm:col-span-1 lg:col-span-3 min-h-[194px] lg:h-[202px]"
} as const;

export function ProjectTile({ project, categories, primaryCategory, index, onTagClick }: ProjectTileProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktopLayout, setIsDesktopLayout] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false
  );
  const [descriptionOverflow, setDescriptionOverflow] = useState(0);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const descContainerRef = useRef<HTMLDivElement>(null);

  const isHero = project.size === "hero";
  const shownCategories = categories.slice(0, 2);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktopLayout(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    } else {
      media.addListener(update);
      return () => media.removeListener(update);
    }
  }, []);

  // Measure how many px of description text overflow the collapsed container.
  // Only observe the text element (not the container) to avoid feedback loops
  // where expansion changes clientHeight and re-triggers the calculation.
  useEffect(() => {
    const measureEl = measureRef.current;
    const containerEl = descContainerRef.current;
    if (!measureEl || !containerEl) return;

    const update = () => {
      setDescriptionOverflow(Math.max(0, Math.ceil(measureEl.scrollHeight - containerEl.clientHeight)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(measureEl);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [project.description]);

  // Expand the card on hover just enough to reveal the overflowing text.
  const hoverExpansion =
    isDesktopLayout && isHovered
      ? Math.min(180, Math.ceil(descriptionOverflow / 2) + (prefersReducedMotion ? 10 : 14))
      : 0;
  const hoverScale = isDesktopLayout && isHovered ? 1.02 : 1;

  const starScale = Math.max(0, Math.log10((project.stars ?? 0) + 1));
  const starProminence = Math.min(1, starScale / 3.2);
  const cardGlow =
    starProminence > 0
      ? `var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow), 0 0 ${14 * starProminence}px rgba(245,158,11,${(0.21 * starProminence).toFixed(3)})`
      : undefined;

  const handleBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (isDesktopLayout && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsHovered(false);
    }
  };

  return (
    <motion.div
      layout
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
      transition={{
        duration: 0.34,
        delay: Math.min(index * 0.035, 0.3),
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative overflow-visible ${tileSizeClasses[project.size]}`}
    >
      <motion.article
        layout={!isDesktopLayout}
        initial={false}
        animate={{
          top: -hoverExpansion,
          bottom: -hoverExpansion,
          scale: hoverScale,
          zIndex: isHovered ? 30 : 1
        }}
        transition={
          prefersReducedMotion
            ? { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
            : { duration: isDesktopLayout ? 0.85 : 0.5, ease: [0.22, 1, 0.36, 1] }
        }
        onHoverStart={() => {
          if (isDesktopLayout) setIsHovered(true);
        }}
        onHoverEnd={() => {
          if (isDesktopLayout) setIsHovered(false);
        }}
        onFocusCapture={() => {
          if (isDesktopLayout) setIsHovered(true);
        }}
        onBlurCapture={handleBlur}
        className={`group relative flex flex-col overflow-hidden rounded-[2rem] border bg-surface/95 p-4 shadow-float backdrop-blur-md transition lg:absolute lg:inset-x-0 lg:top-0 lg:bottom-0 ${categoryTileClasses[primaryCategory]}`}
        style={starProminence > 0 ? { boxShadow: cardGlow } : undefined}
      >
        {/* Top sheen */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/75 to-transparent"
          aria-hidden="true"
        />
        {/* Hover ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand/40 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* Stars + title */}
          <div className="flex min-w-0 items-start gap-2">
            <div
              className={`flex shrink-0 transition-opacity duration-500 ${project.stars > 0 ? "opacity-100" : "opacity-0"}`}
            >
              <span className="inline-flex items-center whitespace-nowrap rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-extrabold text-amber-800">
                ★ {project.stars || 0}
              </span>
            </div>
            <h2
              className={`${isHero ? "text-2xl" : "text-xl"} min-w-0 font-display font-extrabold leading-tight text-primary [overflow-wrap:anywhere]`}
            >
              {project.name}
            </h2>
          </div>

          {/* Category badges + date */}
          <div className="mt-2 flex min-w-0 flex-wrap items-center gap-1.5 text-xs font-semibold text-secondary">
            {shownCategories.map((category: Category) => (
              <button
                key={category}
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onTagClick(category);
                }}
                className={`min-h-[28px] cursor-pointer rounded-full px-2.5 py-0.5 text-[11px] font-body font-extrabold uppercase tracking-wide transition-all hover:ring-1 hover:ring-current/30 hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${categoryBadgeClasses[category]}`}
              >
                {category}
              </button>
            ))}
            <span className="ml-auto text-[11px] font-semibold text-secondary/85">
              {formatUpdatedAt(project.updatedAt)}
            </span>
          </div>

          {/* Description — fills remaining space; gradient at the bottom handles visual separation from buttons */}
          <div
            ref={descContainerRef}
            className="relative mt-3 overflow-hidden max-h-[14rem] lg:max-h-none lg:flex-1 lg:min-h-0"
          >
            {/* Invisible twin for measuring full text height without layout interference */}
            <p
              ref={measureRef}
              aria-hidden="true"
              className="pointer-events-none invisible absolute inset-x-0 font-body text-base font-medium leading-relaxed"
            >
              {project.description}
            </p>
            <p className="font-body text-base font-medium leading-relaxed text-secondary">{project.description}</p>
            {/* Gradient fade — always present so buttons never sit directly on text */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface/95 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Buttons — sit at the bottom-right of the card's padding box on desktop */}
          <div className="mt-auto flex items-center justify-end gap-1.5 pt-2 lg:absolute lg:bottom-0 lg:right-0 lg:z-10 lg:mt-0 lg:pt-0">
            {project.archived && <span className="mr-1 font-body text-[11px] text-slate-400">Archived</span>}
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[34px] items-center rounded-full bg-brand px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
              >
                Visit
              </a>
            )}
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[34px] items-center rounded-full bg-surface px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide text-brand ring-1 ring-brand/40 transition hover:bg-brand hover:text-white hover:ring-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
            >
              Repo
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
