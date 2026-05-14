"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiGithub, FiMail, FiArrowRight } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { siteConfig, heroProjects } from "@/lib/site-data";
import { HeroVisual } from "@/components/site/hero-visual";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export function HeroProfileSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center py-16 lg:py-24 px-6 lg:px-16 xl:px-24 overflow-hidden"
    >
      {/* Atmospheric ambient glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute top-[-15%] left-[20%] w-[60%] h-[70%] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.62 0.17 55) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.55 0.12 65) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* 3-column layout */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* ========== 左栏：文案 + 项目卡片 ========== */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.15 } },
          }}
          className="space-y-8"
        >
          {/* Main headline */}
          <div className="space-y-0.5">
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[5rem] font-extrabold tracking-[-0.03em] leading-[0.94] text-foreground"
            >
              {siteConfig.headline.line1}
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[5rem] font-extrabold tracking-[-0.03em] leading-[0.94] text-primary"
            >
              {siteConfig.headline.line2}
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-sm sm:text-base lg:text-[0.95rem] text-muted-foreground max-w-[400px] leading-[1.8] font-normal"
          >
            {siteConfig.subheadline}
          </motion.p>

          {/* Status indicator */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-[0.8rem] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {siteConfig.statusText}
            </span>
          </motion.div>

          {/* Hero project cards — stacked vertically */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="grid gap-4 pt-2"
          >
            {heroProjects.map((project) => (
              <Card
                key={project.id}
                className="group cursor-pointer rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-400 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[2/1] bg-muted/30 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                </div>
                <CardContent className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-[0.85rem] text-foreground/90 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors duration-300 mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                  <p className="text-[0.78rem] text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <Badge className="inline-flex rounded-full text-[0.7rem] font-normal px-3 py-0.5 bg-accent text-accent-foreground border-0">
                    {project.tag}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>

        {/* ========== 中栏：科幻人体视觉 ========== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <HeroVisual />
        </motion.div>

        {/* ========== 右栏：个人简介卡片 ========== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
          <div className="rounded-3xl bg-card/70 backdrop-blur-xl shadow-lg border border-border/30 px-8 py-10 text-center space-y-5 w-full max-w-[300px]">
            {/* Avatar */}
            <div className="relative inline-block">
              <div
                className="absolute inset-[-4px] rounded-full opacity-25"
                style={{
                  background:
                    "radial-gradient(circle at center, oklch(0.62 0.17 55) 0%, transparent 70%)",
                  filter: "blur(6px)",
                }}
              />
              <Avatar className="relative w-20 h-20 mx-auto ring-1 ring-border/30 ring-offset-2 ring-offset-background">
                <AvatarImage src="/20.png" alt={siteConfig.name} />
                <AvatarFallback className="text-xl font-bold bg-muted text-foreground/60">
                  M
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name & Role */}
            <div className="space-y-1">
              <h2 className="text-base font-bold text-foreground tracking-tight">
                {siteConfig.name}
              </h2>
              <p className="text-[0.72rem] text-muted-foreground font-medium">
                {siteConfig.tagline}
              </p>
            </div>

            {/* Divider */}
            <div className="w-8 h-px bg-border/60 mx-auto" />

            {/* Bio */}
            <p className="text-[0.72rem] text-muted-foreground leading-relaxed">
              {siteConfig.bio}
            </p>

            {/* Contact icons */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center size-9 rounded-full text-muted-foreground/80 hover:text-foreground hover:bg-muted transition-all duration-300"
                title="GitHub"
              >
                <FiGithub size={17} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center size-9 rounded-full text-muted-foreground/80 hover:text-foreground hover:bg-muted transition-all duration-300"
                title="Email"
              >
                <FiMail size={17} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 h-8 px-4 text-[0.72rem] rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-accent/50 transition-all duration-300"
              >
                联系方式 <FiArrowRight size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
