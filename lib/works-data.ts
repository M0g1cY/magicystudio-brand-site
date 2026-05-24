/**
 * /works page data — shim over lib/projects.ts (the v2 source of truth).
 * Keeps the legacy field names that featured-project.tsx / projects-grid.tsx
 * still consume in M3. M4 will rewrite those components to read lib/projects.ts
 * directly, after which this file can be deleted.
 */
import { worksFeatured, worksGrid, type Project } from "./projects";

export const worksHero = {
  title: "Selected Works",
  subtitle:
    "AI-native workflows, full-stack products, and the systems that connect them. Built solo.",
};

function toLegacy(p: Project) {
  return {
    id: p.id,
    name: p.name,
    tagline: p.oneLiner,
    description: p.description ?? p.oneLiner,
    techStack: p.tags,
    status: p.status,
    year: p.year,
    image: p.image,
  };
}

export const featuredProject = toLegacy(worksFeatured);
export const projects = worksGrid.map(toLegacy);
