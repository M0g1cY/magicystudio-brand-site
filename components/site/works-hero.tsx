"use client";

import { motion } from "framer-motion";
import { worksHero } from "@/lib/works-data";

export function WorksHero() {
  return (
    <section className="py-28 lg:py-36 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl space-y-6"
        >
          <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-[0.15em]">
            Works
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[0.95]">
            {worksHero.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground/70 leading-relaxed max-w-lg">
            {worksHero.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
