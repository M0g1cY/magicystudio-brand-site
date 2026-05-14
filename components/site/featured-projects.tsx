"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featuredProjects } from "@/lib/site-data";

export function FeaturedProjects() {
  return (
    <section id="works" className="py-28 lg:py-32 px-6 lg:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-[0.15em]">
              Featured Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              精选作品
            </h2>
          </div>
          <a
            href="/works"
            className="inline-flex items-center gap-1 rounded-full hover:bg-muted text-sm font-medium h-8 px-2.5 transition-colors group"
          >
            查看全部{" "}
            <FiArrowRight className="ml-1 group-hover:translate-x-0.5 transition-transform" size={16} />
          </a>
        </motion.div>

        {/* Project cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="group h-full border border-border/60 shadow-sm hover:shadow-md hover:border-border transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  {/* Project screenshot */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/30">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <FiArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" size={16} />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
