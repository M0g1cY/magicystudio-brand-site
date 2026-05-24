"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { timeline } from "@/lib/site-data";
import { projectById } from "@/lib/projects";
import { SectionMarker } from "@/components/site/section-marker";

const aboutSignals = [
  ["Origin", "Clinical medicine"],
  ["Mode", "Solo AI builder"],
  ["Bias", "Workflow first"],
  ["Output", "Systems that ship"],
] as const;

const operatingLoop = ["observe", "model", "automate", "publish"] as const;

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
      className="group relative overflow-hidden border border-border bg-card/20 px-4 py-6 transition-colors duration-500 hover:border-primary/70 hover:bg-card/45 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-7 lg:py-8"
    >
      <div className="pointer-events-none absolute -right-3 -top-7 font-display text-[6rem] font-[200] leading-none tracking-[-0.04em] text-foreground/[0.035] transition-colors duration-500 group-hover:text-primary/10 sm:text-[7.5rem]">
        {item.year}
      </div>

      <div className="relative z-10 flex items-start gap-4 lg:col-span-3">
        <div className="pt-1.5">
          <span className="relative inline-flex h-3 w-3 border border-primary/70 bg-background">
            <span
              className={`absolute inset-1 transition-colors duration-700 ${
                inView ? "bg-primary" : "bg-border"
              }`}
            />
            {inView && (
              <span className="absolute -inset-1 animate-ping border border-primary/50" />
            )}
          </span>
        </div>
        <div className="space-y-2">
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
            log / {String(index + 1).padStart(2, "0")}
          </div>
          <div className="font-mono text-[0.9rem] uppercase tracking-[0.2em] text-foreground">
            {item.year}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 space-y-4 lg:col-span-5 lg:mt-0">
        <h3 className="max-w-[11ch] font-display text-3xl leading-[1.02] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
          {item.title}
        </h3>
        {item.description && (
          <p className="max-w-[44ch] text-foreground/72 leading-[1.7]">
            {item.description}
          </p>
        )}
      </div>

      <div className="relative z-10 mt-8 lg:col-span-4 lg:mt-0">
        <div className="mb-3 flex items-center justify-between border-b border-border/70 pb-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">
          <span>evidence</span>
          <span>{projects.length ? "linked work" : "internal shift"}</span>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {projects.map((p) => (
              <a
                key={p.id}
                href={`/works#${p.id}`}
                data-cursor="view"
                className="group/thumb relative aspect-[4/3] overflow-hidden border border-border bg-background transition-colors hover:border-electric"
                title={p.name}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="140px"
                  className="object-cover opacity-70 grayscale transition duration-500 group-hover/thumb:scale-105 group-hover/thumb:opacity-100 group-hover/thumb:grayscale-0"
                />
                <span className="absolute inset-x-0 bottom-0 bg-background/75 px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover/thumb:opacity-100">
                  view
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="min-h-20 border border-dashed border-border/80 px-3 py-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
            No polished artifact yet.
            <br />
            The operating system changed first.
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function AboutTimeline() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-28 lg:px-12 lg:py-36 xl:px-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-primary/[0.08]" />

      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <div className="space-y-8">
            <SectionMarker n={3} total={5} label="About" />
            <div className="space-y-5">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-primary">
                personal operating log
              </p>
              <h2 className="max-w-[8ch] font-display text-5xl leading-[0.92] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-[6rem]">
                Not a resume.
                <span className="block italic font-[200] text-foreground/70">
                  A build log.
                </span>
              </h2>
              <p className="max-w-[34rem] text-lg leading-[1.7] text-foreground/78">
                I moved from clinical medicine into AI by treating every project
                as an operating loop: observe the messy work, model the system,
                automate the repeatable parts, then publish the proof.
              </p>
            </div>

            <div className="grid grid-cols-2 border border-border bg-card/25">
              {aboutSignals.map(([label, value]) => (
                <div
                  key={label}
                  className="min-h-24 border-b border-r border-border p-4 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0"
                >
                  <div className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-3 max-w-[12ch] text-sm leading-[1.35] text-foreground">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {operatingLoop.map((step, i) => (
                <span
                  key={step}
                  className="inline-flex h-9 items-center gap-2 border border-border bg-background px-3 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted-foreground"
                >
                  <span className="text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-7">
          <div className="flex items-center justify-between border-y border-border py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">
            <span>timeline feed</span>
            <span>clinical context - ai systems</span>
          </div>
          {timeline.map((item, i) => (
            <TimelineRow key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
