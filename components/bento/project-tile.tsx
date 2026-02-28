import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent
} from "react";

import type { ProjectWithStats } from "@/lib/github";

import { categoryBadgeClasses, categoryTileClasses } from "@/components/projects/category-theme";
import type { Category } from "@/components/projects/types";
import { formatUpdatedAt } from "@/components/projects/utils";

type ProjectTileProps = {
  project: ProjectWithStats;
  categories: Category[];
  primaryCategory: Category;
  index: number;
  isSearching: boolean;
  onTagClick: (tag: string) => void;
};

const tileSizeClasses = {
  hero: "sm:col-span-2 lg:col-span-6 h-[248px] sm:h-[258px]",
  middle: "sm:col-span-2 lg:col-span-4 h-[220px] sm:h-[230px]",
  feature: "sm:col-span-1 lg:col-span-3 h-[194px] sm:h-[202px]"
} as const;

export function ProjectTile({
  project,
  categories,
  primaryCategory,
  index,
  isSearching,
  onTagClick
}: ProjectTileProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [descriptionOverflow, setDescriptionOverflow] = useState(0);
  const measureRef = useRef<HTMLParagraphElement>(null);

  const isHero = project.size === "hero";
  const isMiddle = project.size === "middle";
  const isFeature = project.size === "feature";
  const shownCategories = categories.slice(0, 2);

  const revealDescription = !isFeature || isHovered;

  useEffect(() => {
    if (!isFeature) {
      setDescriptionOverflow(0);
      return;
    }

    const measureElement = measureRef.current;
    if (!measureElement) {
      return;
    }

    const updateOverflow = () => {
      const styles = window.getComputedStyle(measureElement);
      const lineHeight = Number.parseFloat(styles.lineHeight) || 21;
      const collapsedHeight = lineHeight * 2;
      const fullHeight = measureElement.scrollHeight;
      setDescriptionOverflow(Math.max(0, Math.ceil(fullHeight - collapsedHeight)));
    };

    updateOverflow();

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(measureElement);
    window.addEventListener("resize", updateOverflow);

    return () => {
      window.removeEventListener("resize", updateOverflow);
      observer.disconnect();
    };
  }, [isFeature, project.description]);

  const hoverExpansion = isHovered ? (isFeature ? Math.min(220, Math.ceil(descriptionOverflow / 2) + 12) : 12) : 0;
  const hoverScale = isHovered ? (isFeature ? 1.1 : 1.06) : 1;

  const starScale = Math.max(0, Math.log10((project.stars ?? 0) + 1));
  const starProminence = Math.min(1, starScale / 3.2);
  const cardGlow = `drop-shadow(0 0 ${Math.round(6 + starProminence * 8)}px rgba(245,158,11,${(
    0.07 +
    starProminence * 0.14
  ).toFixed(3)}))`;

  const tileStyle: CSSProperties = {
    filter: cardGlow,
    ["--spot-x" as string]: "50%",
    ["--spot-y" as string]: "0%"
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty("--spot-x", `${x.toFixed(2)}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y.toFixed(2)}%`);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--spot-x", "50%");
    event.currentTarget.style.setProperty("--spot-y", "0%");
  };

  const handleBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
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
        initial={false}
        animate={{
          top: -hoverExpansion,
          bottom: -hoverExpansion,
          scale: hoverScale,
          zIndex: isHovered ? 30 : 1
        }}
        transition={
          prefersReducedMotion ? { duration: 0.01 } : { type: "spring", stiffness: 280, damping: 23, mass: 0.55 }
        }
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onFocusCapture={() => setIsHovered(true)}
        onBlurCapture={handleBlur}
        className={`group absolute inset-x-0 top-0 bottom-0 flex flex-col overflow-hidden rounded-[1.95rem] border bg-surface/95 p-4 shadow-float backdrop-blur-md transition ${categoryTileClasses[primaryCategory]} ${
          isHero ? "p-5" : ""
        }`}
        style={tileStyle}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/75 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] bg-[radial-gradient(circle_at_var(--spot-x)_var(--spot-y),rgba(255,255,255,0.85),rgba(255,255,255,0)_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand/20 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand/40 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex min-w-0 items-start gap-2">
            {project.stars > 0 && (
              <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-extrabold text-amber-800">
                ★ {project.stars}
              </span>
            )}
            <h2
              className={`${isHero ? "text-2xl" : isMiddle ? "text-xl" : "text-base"} min-w-0 font-extrabold leading-tight text-primary [overflow-wrap:anywhere]`}
            >
              {project.name}
            </h2>
          </div>

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
                className={`min-h-[28px] rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${categoryBadgeClasses[category]}`}
              >
                {category}
              </button>
            ))}
            <span className="ml-auto text-[11px] font-semibold text-secondary/85">
              {formatUpdatedAt(project.updatedAt)}
            </span>
          </div>

          <div className="relative mt-3 overflow-hidden">
            <p
              ref={measureRef}
              aria-hidden="true"
              className="pointer-events-none invisible absolute inset-x-0 text-base font-semibold leading-[1.34]"
            >
              {project.description}
            </p>
            <p
              className={`text-base font-semibold leading-[1.34] text-secondary ${revealDescription ? "" : "clamp-2"}`}
            >
              {project.description}
            </p>
            {!revealDescription && (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface/95 to-transparent"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-secondary">
              {project.archived && (
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-slate-700">Archived</span>
              )}
              {project.role && (
                <span className="rounded-full bg-teal-100 px-2 py-0.5 text-teal-700">{project.role}</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex min-h-[34px] items-center rounded-full bg-brand px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 ${
                    isHero || isMiddle ? "text-xs" : "text-[10px]"
                  }`}
                >
                  Visit
                </a>
              )}
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[34px] items-center rounded-full bg-brand/10 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-brand transition hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
              >
                Repo
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
