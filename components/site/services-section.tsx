"use client";

import { motion } from "framer-motion";
import {
  Workflow,
  Zap,
  Sparkles,
  FileText,
  FlaskConical,
  Palette,
} from "lucide-react";
import { services } from "@/lib/site-data";
import { SectionMarker } from "@/components/site/section-marker";
import { MonoStatus } from "@/components/site/mono-status";

const iconMap: Record<string, React.ReactNode> = {
  "01": <Workflow size={20} strokeWidth={1.4} />,
  "02": <Zap size={20} strokeWidth={1.4} />,
  "03": <Sparkles size={20} strokeWidth={1.4} />,
  "04": <FileText size={20} strokeWidth={1.4} />,
  "05": <FlaskConical size={20} strokeWidth={1.4} />,
  "06": <Palette size={20} strokeWidth={1.4} />,
};

function renderTitle(title: string, highlight: readonly string[]) {
  return title.split(" ").map((word, i) => {
    const isHighlight = highlight.includes(word);
    return (
      <span key={i}>
        {i > 0 && " "}
        <span className={isHighlight ? "text-primary" : ""}>{word}</span>
      </span>
    );
  });
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-32 lg:py-40 px-6 lg:px-12 xl:px-20"
    >
      <div className="max-w-[1280px] mx-auto space-y-16 lg:space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-3xl"
        >
          <SectionMarker n={4} total={5} label="Services" />
          <h2 className="font-display tracking-[-0.02em] text-foreground text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.95]">
            What I&apos;m taking <span className="italic font-[200]">on.</span>
          </h2>
          <p className="text-foreground/75 leading-[1.7] max-w-[52ch] text-lg">
            结合医学背景、AI 工具与全栈实现把复杂信息变成可观测的系统。下面六项里只接 5 项——research pipeline 案例还少，按 limited 接。
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              data-cursor="select"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative bg-background hover:bg-card/80 focus-visible:bg-card/80 transition-colors p-6 lg:p-7 space-y-5 min-h-[220px] focus-visible:outline-none"
              tabIndex={0}
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center justify-center h-10 w-10 border border-border text-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                  {iconMap[service.id]}
                </span>
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {service.id}
                </span>
              </div>

              <h3 className="font-display text-2xl lg:text-3xl tracking-[-0.01em] leading-[1.1]">
                {renderTitle(service.title, service.highlight)}
              </h3>

              <p className="text-foreground/70 leading-[1.6] text-base">
                {service.description}
              </p>

              <div className="pt-2">
                <MonoStatus state={service.available ? "AVAILABLE" : "LIMITED"} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
