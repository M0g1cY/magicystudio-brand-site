"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export function WorksCTA() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl border border-border/30 bg-card/60 backdrop-blur-sm px-8 py-16 lg:px-16 lg:py-20 text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Have an idea in mind?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground/70 leading-relaxed max-w-md mx-auto">
              Let&apos;s build something meaningful together.
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium h-10 px-6 transition-all duration-300 group shadow-sm"
          >
            Contact Me
            <FiArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
