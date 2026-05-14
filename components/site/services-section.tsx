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
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/site-data";

const iconMap: Record<string, React.ReactNode> = {
  "01": <Workflow size={22} strokeWidth={1.6} />,
  "02": <Zap size={22} strokeWidth={1.6} />,
  "03": <Sparkles size={22} strokeWidth={1.6} />,
  "04": <FileText size={22} strokeWidth={1.6} />,
  "05": <FlaskConical size={22} strokeWidth={1.6} />,
  "06": <Palette size={22} strokeWidth={1.6} />,
};

function renderTitle(title: string, highlight: string[]) {
  const words = title.split(" ");
  return words.map((word, i) => {
    const isHighlight = highlight.includes(word);
    return (
      <span key={i}>
        {i > 0 && " "}
        {isHighlight ? (
          <span className="text-primary">{word}</span>
        ) : (
          <span>{word}</span>
        )}
      </span>
    );
  });
}

export function ServicesSection() {
  return (
    <section id="services" className="py-28 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl space-y-5"
        >
          <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-[0.15em]">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            从想法到落地，
            <br />
            我构建 <span className="text-primary">AI 工作流</span>与<span className="text-primary">数字系统</span>。
          </h2>
          <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-lg">
            结合医学背景、AI 工具和自动化思维，将复杂信息转化为可执行的系统与产品。
          </p>
        </motion.div>

        {/* Service cards — 2 rows × 3 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="group h-full rounded-2xl border border-border/40 bg-card/70 backdrop-blur-sm shadow-none hover:shadow-lg hover:border-primary/25 hover:-translate-y-1 transition-all duration-400">
                <CardContent className="p-6 lg:p-7 space-y-5">
                  {/* Icon + Number */}
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center justify-center size-10 rounded-xl bg-accent text-primary">
                      {iconMap[service.id]}
                    </span>
                    <span className="text-2xl font-bold text-muted-foreground/15 tabular-nums leading-none">
                      {service.id}
                    </span>
                  </div>

                  {/* Title with highlighted keywords */}
                  <h3 className="font-bold text-base leading-snug max-w-[200px]">
                    {renderTitle(service.title, service.highlight)}
                  </h3>

                  {/* Description */}
                  <p className="text-[0.8rem] text-muted-foreground/60 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
