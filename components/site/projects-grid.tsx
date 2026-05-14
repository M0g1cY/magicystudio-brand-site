"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/works-data";
import { ProjectCard } from "@/components/site/project-card";

export function ProjectsGrid() {
  return (
    <section className="py-16 lg:py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-[0.15em]">
            More Projects
          </p>
        </motion.div>

        {/* 2-column grid */}
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
