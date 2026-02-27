import projectsJson from "@/data/projects.json";

export type BubbleSize = "hero" | "feature";

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

export const projects = projectsJson as Project[];
