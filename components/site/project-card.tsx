"use client";

import Image from "next/image";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  status: string;
  year: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-400">
      {/* Project screenshot */}
      <div className="relative aspect-[16/10] bg-muted/30 border-b border-border/20 overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6 space-y-4">
        {/* Name + Status */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-sm lg:text-base leading-snug group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          <span className="shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300 mt-0.5">
            <FiArrowUpRight size={15} />
          </span>
        </div>

        {/* Description */}
        <p className="text-[0.78rem] text-muted-foreground/60 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Meta: year + status */}
        <div className="flex items-center gap-4 text-[0.7rem] text-muted-foreground/50">
          <span className="inline-flex items-center gap-1">
            <FiClock size={11} />
            {project.year}
          </span>
          <Badge className="rounded-full text-[0.65rem] font-normal px-2.5 py-0 bg-accent text-accent-foreground border-0">
            {project.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
