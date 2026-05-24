"use client";

import { motion } from "framer-motion";
import { worksGrid } from "@/lib/projects";
import { ProjectCard } from "@/components/site/project-card";
import { SectionMarker } from "@/components/site/section-marker";

export function ProjectsGrid() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionMarker n={2} total={6} label="More Works" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {worksGrid.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="grid"
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
