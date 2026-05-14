"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight, FiClock, FiTag } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { featuredProject } from "@/lib/works-data";

export function FeaturedProject() {
  return (
    <section className="py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Section label */}
          <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-[0.15em] mb-8">
            Featured Project
          </p>

          {/* Card */}
          <div className="rounded-3xl border border-border/30 bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left — project screenshot */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] bg-muted/30 border-b lg:border-b-0 lg:border-r border-border/30 overflow-hidden">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Right — project info */}
              <div className="p-8 lg:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  {/* Name + Status */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
                        {featuredProject.name}
                      </h2>
                      <Badge className="rounded-full text-[0.7rem] font-normal px-3 py-0.5 bg-primary/10 text-primary border-0 shrink-0">
                        {featuredProject.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground/70 font-medium">
                      {featuredProject.tagline}
                    </p>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-6 text-xs text-muted-foreground/50">
                    <span className="inline-flex items-center gap-1.5">
                      <FiClock size={13} />
                      {featuredProject.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiTag size={13} />
                      {featuredProject.status}
                    </span>
                  </div>

                  <Separator className="bg-border/30" />

                  {/* Description */}
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">
                    {featuredProject.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="rounded-full text-[0.7rem] font-normal bg-muted/60 text-muted-foreground/70 border-0"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 group"
                >
                  查看详情
                  <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
