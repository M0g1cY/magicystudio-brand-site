"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { timeline } from "@/lib/site-data";

export function AboutTimeline() {
  return (
    <section id="about" className="py-28 lg:py-32 px-6 lg:px-12 bg-muted/70">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start justify-between gap-8">
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-[0.15em]">
                About
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                开发历程
              </h2>
            </div>
            <a
              href="/personal-skills.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary transition-colors shrink-0 pt-1.5 group"
            >
              了解更多关于我
              <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-0 right-0 h-px bg-border hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                {/* Dot on the line */}
                <div className="hidden lg:flex items-center justify-center mb-5 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-bold text-primary">{item.year}</span>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
