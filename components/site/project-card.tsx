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

const workflowContainer = {
  rest: { opacity: 0, y: 16 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const workflowRow = {
  rest: { opacity: 0, y: 12 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.24 } },
};

export function ProjectCard({
  project,
  variant = "grid",
  index = 0,
}: ProjectCardProps) {
  const isFeatured = variant === "featured";
  const showWorkflow = isFeatured && Boolean(project.workflow?.length);
  const showMetric = isFeatured && Boolean(project.metric);
  const Wrapper = project.links?.[0]?.href ? "a" : "div";
  const href = project.links?.[0]?.href;
  const textBg = [
    project.name,
    ...project.tags.slice(0, 2),
    project.year,
    project.name,
    project.metric || project.status,
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      whileHover="hover"
      whileFocus="hover"
      className={isFeatured ? "lg:col-span-12" : "lg:col-span-6"}
      tabIndex={0}
      aria-label={`${project.name} project card`}
    >
      <Wrapper
        {...(href
          ? { href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        data-cursor="view"
        className="group relative block overflow-hidden border border-border bg-card/40 transition-all duration-500 hover:scale-[0.97] hover:border-primary hover:bg-primary focus-visible:scale-[0.97] focus-visible:border-primary focus-visible:bg-primary focus-visible:outline-none"
      >
        {/* Mono status badge — top-left of image */}
        <div
          aria-hidden="true"
          className="card-text-bg pointer-events-none absolute -left-[18%] -right-[18%] -top-[18%] z-[1] flex min-h-[180%] select-none flex-col px-5 font-display font-[800] uppercase leading-none text-primary-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-25 group-focus-visible:opacity-25"
        >
          {textBg.map((line, lineIndex) => (
            <p
              key={`${line}-${lineIndex}`}
              className={
                lineIndex % 2 === 0
                  ? "whitespace-nowrap text-[clamp(4rem,8vw,8rem)] leading-[0.74]"
                  : "whitespace-nowrap font-mono text-[clamp(1rem,2vw,2rem)] leading-none tracking-[0.08em]"
              }
            >
              {line}
            </p>
          ))}
        </div>

        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-background/85 backdrop-blur-sm border border-border group-hover:bg-background group-hover:border-background transition-colors">
          <MonoStatus state={project.status} />
        </div>

        {/* Year stamp — top-right */}
        <div className="absolute top-3 right-3 z-10 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/70 group-hover:text-primary-foreground transition-colors">
          {project.year}
        </div>

        {/* Image */}
        <div
          className={`card-image relative z-[2] bg-muted/40 overflow-hidden transition-transform duration-700 ease-out group-hover:-translate-y-5 group-hover:scale-[0.96] group-focus-visible:-translate-y-5 group-focus-visible:scale-[0.96] ${
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
          {showWorkflow && (
            <motion.div
              aria-hidden="true"
              variants={workflowContainer}
              initial="rest"
              className="absolute inset-x-0 bottom-0 z-10 border-t border-primary-foreground/25 bg-background/82 px-4 py-3 backdrop-blur-md group-focus-visible:bg-background/90 lg:px-6"
            >
              <div className="grid gap-1.5">
                {project.workflow?.map((step) => (
                  <motion.div
                    key={step.id}
                    variants={workflowRow}
                    className="flex items-center justify-between border-b border-primary-foreground/10 pb-1 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-foreground last:border-b-0"
                  >
                    <span>{step.id}</span>
                    <span>{step.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Body */}
        <div
          className={`grid gap-4 ${
            isFeatured
              ? "relative z-[2] lg:grid-cols-12 px-6 py-7 lg:px-8 lg:py-10"
              : "relative z-[2] px-5 py-6"
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
        {showMetric && (
          <motion.div
            aria-hidden="true"
            variants={{
              rest: { opacity: 0, y: 12 },
              hover: { opacity: 1, y: 0, transition: { duration: 0.28 } },
            }}
            initial="rest"
            className="pointer-events-none absolute bottom-4 right-4 z-20 max-w-[14rem] text-right font-display text-4xl italic leading-none tracking-normal text-primary-foreground"
          >
            {project.metric}
          </motion.div>
        )}
        <div
          aria-hidden="true"
          className="card-cta pointer-events-none absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-foreground font-mono text-[0.62rem] uppercase tracking-[0.12em] text-background shadow-xl transition-transform duration-300 ease-out group-hover:scale-100 group-focus-visible:scale-100"
        >
          View
        </div>
      </Wrapper>
    </motion.article>
  );
}
