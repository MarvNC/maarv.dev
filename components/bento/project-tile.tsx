import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type MouseEvent as ReactMouseEvent
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
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);
  const [isDesktopLayout, setIsDesktopLayout] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false
  );
  const [descriptionOverflow, setDescriptionOverflow] = useState(0);
  const measureRef = useRef<HTMLParagraphElement>(null);

  const isHero = project.size === "hero";
  const isMiddle = project.size === "middle";
  const isFeature = project.size === "feature";
  const shownCategories = categories.slice(0, 2);
  const isActive = isDesktopLayout ? isHovered : isExpandedMobile;
  const revealDescription = !isFeature || isActive;
  const descriptionContainerClass = isFeature
    ? revealDescription
      ? "max-h-[40rem]"
      : "max-h-[2.85rem]"
    : "max-h-[14rem]";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(min-width: 1024px)");
    const updateLayoutMode = () => {
      setIsDesktopLayout(media.matches);
    };

    updateLayoutMode();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateLayoutMode);
      return () => media.removeEventListener("change", updateLayoutMode);
    }

    media.addListener(updateLayoutMode);
    return () => media.removeListener(updateLayoutMode);
  }, []);

  useEffect(() => {
    if (isDesktopLayout) {
      setIsExpandedMobile(false);
    }
  }, [isDesktopLayout]);

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

  const desktopHoverExpansion = isHovered
    ? isFeature
      ? Math.min(180, Math.ceil(descriptionOverflow / 2) + (prefersReducedMotion ? 10 : 14))
      : isMiddle
        ? prefersReducedMotion
          ? 18
          : 34
        : prefersReducedMotion
          ? 14
          : 24
    : 0;
  const hoverExpansion = isDesktopLayout ? desktopHoverExpansion : 0;
  const hoverScale = isActive ? 1.02 : 1;

  const starScale = Math.max(0, Math.log10((project.stars ?? 0) + 1));
  const starProminence = Math.min(1, starScale / 3.2);
  const cardGlow = `drop-shadow(0 0 ${Math.round(6 + starProminence * 8)}px rgba(245,158,11,${(
    0.07 +
    starProminence * 0.14
  ).toFixed(3)}))`;

  const handleBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (isDesktopLayout && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsHovered(false);
    }
  };

  const handleCardClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (isDesktopLayout || !isFeature) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("a, button")) {
      return;
    }

    setIsExpandedMobile((previous) => !previous);
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
            ? {
                duration: 0.24,
                ease: [0.22, 1, 0.36, 1]
              }
            : {
                duration: isDesktopLayout ? 0.85 : 0.5,
                ease: [0.22, 1, 0.36, 1]
              }
        }
        onHoverStart={() => {
          if (isDesktopLayout) {
            setIsHovered(true);
          }
        }}
        onHoverEnd={() => {
          if (isDesktopLayout) {
            setIsHovered(false);
          }
        }}
        onFocusCapture={() => {
          if (isDesktopLayout) {
            setIsHovered(true);
          }
        }}
        onBlurCapture={handleBlur}
        onClick={handleCardClick}
        className={`group relative flex flex-col overflow-hidden rounded-[1.95rem] border bg-surface/95 p-4 shadow-float backdrop-blur-md transition lg:absolute lg:inset-x-0 lg:top-0 lg:bottom-0 ${categoryTileClasses[primaryCategory]} ${
          isFeature ? "touch-manipulation cursor-pointer lg:cursor-default" : ""
        } ${isHero ? "p-5" : ""}`}
        style={{ filter: cardGlow }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/75 to-transparent"
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

          <div
            className={`relative mt-3 overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${descriptionContainerClass}`}
          >
            <p
              ref={measureRef}
              aria-hidden="true"
              className="pointer-events-none invisible absolute inset-x-0 text-base font-semibold leading-[1.34]"
            >
              {project.description}
            </p>
            <p
              className={`text-base font-semibold leading-[1.34] text-secondary ${isFeature && !revealDescription ? "clamp-2" : ""}`}
            >
              {project.description}
            </p>
            {isFeature && !revealDescription && (
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
