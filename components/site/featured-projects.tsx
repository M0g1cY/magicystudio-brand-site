"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { featuredProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/site/project-card";
import { SectionMarker } from "@/components/site/section-marker";

export function FeaturedProjects() {
  const [hero, ...rest] = featuredProjects;

  return (
    <section
      id="works"
      className="relative py-32 lg:py-40 px-6 lg:px-12 xl:px-20"
    >
      <div className="max-w-[1280px] mx-auto space-y-16 lg:space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between gap-6"
        >
          <div className="space-y-6">
            <SectionMarker n={1} total={5} label="Work" />
            <h2 className="font-display tracking-[-0.02em] text-foreground text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.95]">
              Selected <span className="italic font-[200]">works.</span>
            </h2>
          </div>
          <a
            href="/works"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] h-10 px-4 border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            view all
            <FiArrowRight size={14} />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {hero && (
            <ProjectCard project={hero} variant="featured" index={0} />
          )}
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="grid"
              index={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
