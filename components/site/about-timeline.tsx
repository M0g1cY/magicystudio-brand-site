"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { timeline } from "@/lib/site-data";
import { projectById } from "@/lib/projects";
import { SectionMarker } from "@/components/site/section-marker";

function TimelineRow({
  item,
  index,
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px -30% 0px" });
  const projects = item.projectIds
    .map((id) => projectById(id))
    .filter((p): p is NonNullable<ReturnType<typeof projectById>> => Boolean(p));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className="relative grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-12 border-b border-border last:border-b-0"
    >
      {/* Year + dot */}
      <div className="lg:col-span-3 flex items-start gap-4">
        <div className="relative pt-2">
          <span
            className={`relative inline-flex h-2 w-2 rounded-full transition-colors duration-700 ${
              inView ? "bg-primary" : "bg-border"
            }`}
          >
            {inView && (
              <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
            )}
          </span>
        </div>
        <div className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-foreground">
          {item.year}
        </div>
      </div>

      {/* Title + description */}
      <div className="lg:col-span-5 space-y-3">
        <h3 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] leading-[1.05] text-foreground">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-foreground/75 leading-[1.7] max-w-[44ch]">
            {item.description}
          </p>
        )}
      </div>

      {/* Project thumbnails (right) — only render row if there are linked works */}
      <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
        {projects.map((p) => (
          <a
            key={p.id}
            href={`/works#${p.id}`}
            className="group relative h-16 w-24 lg:h-20 lg:w-28 overflow-hidden border border-border bg-card/40 hover:border-primary transition-colors"
            title={p.name}
          >
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="120px"
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export function AboutTimeline() {
  return (
    <section
      id="about"
      className="relative py-32 lg:py-40 px-6 lg:px-12 xl:px-20"
    >
      <div className="max-w-[1280px] mx-auto space-y-14 lg:space-y-20">
        <div className="space-y-6 max-w-3xl">
          <SectionMarker n={3} total={6} label="About" />
          <h2 className="font-display tracking-[-0.02em] text-foreground text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.95]">
            How I got <span className="italic font-[200]">here.</span>
          </h2>
        </div>

        <div className="border-t border-border">
          {timeline.map((item, i) => (
            <TimelineRow key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
