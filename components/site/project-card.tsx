"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MonoStatus } from "@/components/site/mono-status";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  /** featured = magazine-size hero card; default = grid card */
  variant?: "featured" | "grid";
  index?: number;
}

export function ProjectCard({
  project,
  variant = "grid",
  index = 0,
}: ProjectCardProps) {
  const isFeatured = variant === "featured";
  const Wrapper = project.links?.[0]?.href ? "a" : "div";
  const href = project.links?.[0]?.href;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className={isFeatured ? "lg:col-span-12" : "lg:col-span-6"}
    >
      <Wrapper
        {...(href
          ? { href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group relative block border border-border bg-card/40 overflow-hidden transition-colors duration-300 hover:bg-primary hover:border-primary"
      >
        {/* Mono status badge — top-left of image */}
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-background/85 backdrop-blur-sm border border-border group-hover:bg-background group-hover:border-background transition-colors">
          <MonoStatus state={project.status} />
        </div>

        {/* Year stamp — top-right */}
        <div className="absolute top-3 right-3 z-10 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/70 group-hover:text-primary-foreground transition-colors">
          {project.year}
        </div>

        {/* Image */}
        <div
          className={`relative bg-muted/40 overflow-hidden ${
            isFeatured ? "aspect-[16/9]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes={
              isFeatured
                ? "(max-width: 1024px) 100vw, 1280px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
            }
          />
          {/* subtle parallax veil on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
        </div>

        {/* Body */}
        <div
          className={`grid gap-4 ${
            isFeatured
              ? "lg:grid-cols-12 px-6 py-7 lg:px-8 lg:py-10"
              : "px-5 py-6"
          }`}
        >
          <div className={isFeatured ? "lg:col-span-7 space-y-3" : "space-y-3"}>
            <div className="flex items-start justify-between gap-4">
              <h3
                className={`font-display tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary-foreground ${
                  isFeatured
                    ? "text-3xl lg:text-5xl leading-[1.05]"
                    : "text-xl lg:text-2xl leading-[1.15]"
                }`}
              >
                {project.name}
              </h3>
              <FiArrowUpRight
                className="shrink-0 mt-1 text-muted-foreground group-hover:text-primary-foreground transition-colors"
                size={isFeatured ? 22 : 18}
              />
            </div>
            <p
              className={`text-foreground/80 group-hover:text-primary-foreground/90 transition-colors leading-[1.6] ${
                isFeatured ? "text-lg lg:text-xl" : "text-base"
              }`}
            >
              {project.oneLiner}
            </p>
          </div>

          <div
            className={
              isFeatured
                ? "lg:col-span-5 flex flex-col gap-3 lg:items-end"
                : "flex flex-wrap gap-2 pt-1"
            }
          >
            <ul
              className={`flex flex-wrap gap-1.5 ${
                isFeatured ? "lg:justify-end" : ""
              }`}
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-[0.68rem] uppercase tracking-[0.14em] px-2 py-1 border border-border text-foreground/80 group-hover:border-primary-foreground/50 group-hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrapper>
    </motion.article>
  );
}
