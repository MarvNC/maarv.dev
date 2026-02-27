"use client";

import type { PointerEvent } from "react";
import { useState } from "react";

import type { ProjectWithStats } from "@/lib/github";

import { ProjectCard } from "@/components/physics/ProjectCard";
import type { Category, PhysicsPortfolioProps } from "@/components/physics/types";
import { usePortfolioPhysics } from "@/components/physics/usePortfolioPhysics";

function PhysicsCard({
  project,
  onTagClick,
  body,
  isHovered,
  isMatched,
  isSearching,
  categories,
  primaryCategory,
  isDragging,
  onStartDrag,
  onHoverEnter,
  onHoverLeave,
  zoom
}: {
  project: ProjectWithStats;
  onTagClick: (tag: string) => void;
  body: {
    x: number;
    y: number;
    width: number;
  };
  isHovered: boolean;
  isMatched: boolean;
  isSearching: boolean;
  categories: Category[];
  primaryCategory: Category;
  isDragging: boolean;
  onStartDrag: (event: PointerEvent<HTMLDivElement>) => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  zoom: number;
}) {
  return (
    <div
      className="absolute"
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("a,button")) {
          return;
        }
        onStartDrag(event);
      }}
      onPointerEnter={onHoverEnter}
      onPointerLeave={onHoverLeave}
      style={{
        left: body.x,
        top: body.y,
        width: body.width,
        maxWidth: "min(93vw, 360px)",
        transform: `translate(-50%, -50%) scale(${zoom})`,
        opacity: !isSearching || isMatched ? 1 : 0.18,
        zIndex: isHovered ? 70 : project.size === "hero" ? 14 : 9,
        transition: "opacity 150ms ease, z-index 20ms linear",
        cursor: isDragging ? "grabbing" : "grab"
      }}
    >
      <ProjectCard
        project={project}
        expanded={isHovered || project.size === "hero" || project.size === "middle"}
        hovered={isHovered}
        onTagClick={onTagClick}
        categories={categories}
        primaryCategory={primaryCategory}
      />
    </div>
  );
}

export function PhysicsPortfolio({ projects, query, onTagClick }: PhysicsPortfolioProps) {
  const [zoom, setZoom] = useState(1);
  const {
    containerRef,
    bodyMap,
    hoveredRepo,
    setHoveredRepo,
    isSearching,
    matchSet,
    categoryByRepo,
    onSurfacePointerMove,
    onSurfacePointerUp,
    onSurfacePointerCancel,
    onSurfacePointerLeave,
    startCardDrag,
    isDragging
  } = usePortfolioPhysics({ projects, query });

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full select-none overflow-hidden touch-none"
      onWheel={(event) => {
        event.preventDefault();
        const direction = event.deltaY > 0 ? -1 : 1;
        setZoom((current) => {
          const next = current + direction * 0.06;
          return Math.min(1.5, Math.max(0.72, Number(next.toFixed(2))));
        });
      }}
      onPointerMove={onSurfacePointerMove}
      onPointerUp={onSurfacePointerUp}
      onPointerCancel={onSurfacePointerCancel}
      onPointerLeave={onSurfacePointerLeave}
    >
      {projects.map((project: ProjectWithStats) => {
        const body = bodyMap.get(project.repo);
        if (!body) return null;

        return (
          <PhysicsCard
            key={project.repo}
            project={project}
            onTagClick={onTagClick}
            body={body}
            isHovered={hoveredRepo === project.repo}
            isMatched={matchSet.has(project.repo)}
            isSearching={isSearching}
            categories={categoryByRepo[project.repo] ?? ["tooling"]}
            primaryCategory={(categoryByRepo[project.repo] ?? ["tooling"])[0]}
            isDragging={isDragging(project.repo)}
            onStartDrag={(event) => startCardDrag(project.repo, body, event)}
            onHoverEnter={() => setHoveredRepo(project.repo)}
            onHoverLeave={() => setHoveredRepo((current: string | null) => (current === project.repo ? null : current))}
            zoom={zoom}
          />
        );
      })}
    </section>
  );
}
