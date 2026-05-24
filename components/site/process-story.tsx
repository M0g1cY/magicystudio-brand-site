"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { featuredProjects } from "@/lib/projects";
import { SectionMarker } from "@/components/site/section-marker";
import { MonoStatus } from "@/components/site/mono-status";

const beats = [
  {
    label: "IDEA",
    eyebrow: "01 / 05",
    title: "It starts as a thought.",
    copy: "A messy clinical or content workflow gets reduced to a single sentence worth testing.",
    visual: <NapkinSketch />,
  },
  {
    label: "WORKFLOW",
    eyebrow: "02 / 05",
    title: "Then the work becomes visible.",
    copy: "Inputs, model calls, review gates, and outputs are mapped before anything becomes product UI.",
    visual: <WorkflowGraph />,
  },
  {
    label: "PROTOTYPE",
    eyebrow: "03 / 05",
    title: "A prototype proves the loop.",
    copy: "The first build is small on purpose: one path, one user, one measurable output.",
    visual: <PrototypeBlock />,
  },
  {
    label: "AUTOMATION",
    eyebrow: "04 / 05",
    title: "Repeatable parts leave the human.",
    copy: "Scheduling, tables, and review queues turn the workflow into something that can run again tomorrow.",
    visual: <AutomationBoard />,
  },
  {
    label: "SHIPPED",
    eyebrow: "05 / 05",
    title: "The artifact ships with proof.",
    copy: "The final question is not whether it looks finished, but whether the workflow changed.",
    visual: <ShippedGrid />,
  },
] as const;

export function ProcessStory() {
  const ref = useRef<HTMLElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveBeat(Math.min(beats.length - 1, Math.floor(latest * beats.length)));
  });

  if (reduceMotion) {
    return <StackedProcess force />;
  }

  return (
    <section
      ref={ref}
      id="process"
      className="relative hidden min-h-[500vh] border-y border-border md:block"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 lg:px-12 xl:px-20">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-12 gap-10">
          <div className="col-span-4 flex flex-col justify-between">
            <div className="space-y-10">
              <SectionMarker n={2} total={5} label="Process" />
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  {beats[activeBeat].eyebrow} - {beats[activeBeat].label}
                </div>
                <h2 className="max-w-[7ch] font-display text-6xl leading-[0.92] text-foreground lg:text-[6.5rem]">
                  From idea to
                  <span className="block italic font-[200] text-foreground/70">
                    shipped.
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="relative col-span-8 min-h-[560px]">
            {beats.map((beat, i) => (
              <BeatLayer
                key={beat.label}
                beat={beat}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="sticky bottom-0 h-px origin-left bg-primary"
        style={{ scaleX: scrollYProgress }}
      />
    </section>
  );
}

function BeatLayer({
  beat,
  index,
  progress,
}: {
  beat: (typeof beats)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / beats.length;
  const mid = (index + 0.5) / beats.length;
  const end = (index + 1) / beats.length;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.08), mid, Math.min(1, end + 0.08)],
    [0, 1, 0],
  );
  const y = useTransform(
    progress,
    [Math.max(0, start - 0.08), mid, Math.min(1, end + 0.08)],
    [20, 0, -20],
  );

  return (
    <motion.article
      style={{ opacity, y }}
      className="absolute inset-0 grid grid-cols-8 items-center gap-8"
    >
      <div className="col-span-3 space-y-6">
        <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-primary">
          {beat.eyebrow} - {beat.label}
        </div>
        <h3 className="font-display text-5xl leading-[0.98] text-foreground">
          {beat.title}
        </h3>
        <p className="max-w-[34ch] text-lg leading-[1.65] text-foreground/75">
          {beat.copy}
        </p>
      </div>
      <div className="col-span-5">{beat.visual}</div>
    </motion.article>
  );
}

function StackedProcess({ force = false }: { force?: boolean }) {
  return (
    <section
      id="process"
      className={`relative border-y border-border px-6 py-28 ${
        force ? "" : "md:hidden"
      }`}
    >
      <div className="mx-auto max-w-[1280px] space-y-10">
        <SectionMarker n={2} total={5} label="Process" />
        <h2 className="font-display text-5xl leading-[0.95] text-foreground">
          From idea to <span className="italic font-[200]">shipped.</span>
        </h2>
        <div className="space-y-4">
          {beats.map((beat) => (
            <article
              key={beat.label}
              className="border border-border bg-card/25 p-5"
            >
              <div className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                {beat.eyebrow} - {beat.label}
              </div>
              <h3 className="font-display text-3xl leading-tight text-foreground">
                {beat.title}
              </h3>
              <p className="mt-3 text-foreground/72 leading-[1.65]">
                {beat.copy}
              </p>
              <div className="mt-6">{beat.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NapkinSketch() {
  return (
    <div className="relative aspect-[4/3] border border-border bg-card/30 p-6">
      <svg viewBox="0 0 520 360" className="h-full w-full">
        <path
          d="M84 216 C146 96, 236 276, 310 146 S424 156, 448 74"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="7 10"
          className="text-foreground/55"
        />
        <path
          d="M134 258 L232 102 L292 238 L374 126"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
        />
        <circle cx="134" cy="258" r="6" fill="var(--primary)" />
        <circle cx="232" cy="102" r="6" fill="var(--primary)" />
        <circle cx="292" cy="238" r="6" fill="var(--primary)" />
        <circle cx="374" cy="126" r="6" fill="var(--primary)" />
      </svg>
    </div>
  );
}

function WorkflowGraph() {
  const nodes = ["input", "model", "review", "asset", "publish"];
  return (
    <div className="border border-border bg-card/30 p-6">
      <div className="grid grid-cols-5 gap-3">
        {nodes.map((node, i) => (
          <div key={node} className="relative">
            <div className="border border-border bg-background p-4 text-center font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground">
              {node}
            </div>
            {i < nodes.length - 1 && (
              <div className="absolute left-full top-1/2 h-px w-3 bg-primary" />
            )}
          </div>
        ))}
      </div>
      <pre className="mt-6 overflow-hidden border border-border bg-background p-4 font-mono text-[0.68rem] leading-relaxed text-muted-foreground">
        {`workflow.run({
  source: "clinical-context",
  gates: ["accuracy", "tone", "ship"],
  output: "reviewable artifact"
})`}
      </pre>
    </div>
  );
}

function PrototypeBlock() {
  return (
    <pre className="overflow-hidden border border-border bg-card/35 p-6 font-mono text-sm leading-relaxed text-foreground/80">
      {`export async function POST(req: Request) {
  const input = await req.json()
  const draft = await workflow.generate(input)
  const score = await workflow.audit(draft)

  return Response.json({
    status: "ready_for_review",
    score,
    next: "/ship"
  })
}`}
    </pre>
  );
}

function AutomationBoard() {
  return (
    <div className="border border-border bg-card/30 p-6">
      <div className="grid grid-cols-4 border border-border font-mono text-[0.68rem] uppercase tracking-[0.12em]">
        {["task", "owner", "state", "next"].map((cell) => (
          <div key={cell} className="border-r border-border p-3 last:border-r-0">
            {cell}
          </div>
        ))}
        {["draft", "agent", "queued", "09:00"].map((cell) => (
          <div
            key={cell}
            className="border-r border-t border-border p-3 text-muted-foreground last:border-r-0"
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="mt-5 border border-border bg-background p-4 font-mono text-sm text-foreground/80">
        cron: <span className="text-primary">0 9 * * 1-5</span>
      </div>
    </div>
  );
}

function ShippedGrid() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {featuredProjects.slice(0, 3).map((project) => (
        <a
          key={project.id}
          href={`/works#${project.id}`}
          data-cursor="view"
          className="group relative aspect-[4/5] overflow-hidden border border-border bg-card"
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="240px"
            className="object-cover opacity-75 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          />
          <div className="absolute inset-x-0 bottom-0 space-y-2 bg-background/86 p-3 backdrop-blur">
            <MonoStatus state="SHIPPED" />
            <div className="line-clamp-2 text-sm leading-tight text-foreground">
              {project.name}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
