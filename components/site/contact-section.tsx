"use client";

import { motion } from "framer-motion";
import {
  FiMail,
  FiGithub,
  FiMapPin,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";
import { contactInfo } from "@/lib/site-data";
import { SectionMarker } from "@/components/site/section-marker";

const ORDER = ["Email", "GitHub", "Location", "Available Time"] as const;
type ContactKey = (typeof ORDER)[number];

const iconMap: Record<ContactKey, React.ReactNode> = {
  Email: <FiMail size={16} />,
  GitHub: <FiGithub size={16} />,
  Location: <FiMapPin size={16} />,
  "Available Time": <FiClock size={16} />,
};

const DEPLOY_STAMP =
  process.env.NEXT_PUBLIC_DEPLOY_STAMP ||
  new Date().toISOString().slice(0, 10).replace(/-/g, ".");

export function ContactSection() {
  const items = ORDER.map((key) =>
    contactInfo.find((c) => c.label === key),
  ).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <section
      id="contact"
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
          <SectionMarker n={5} total={5} label="Contact" />
          <h2 className="font-display tracking-[-0.02em] text-foreground text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.95]">
            Let&apos;s build <span className="italic font-[200]">something.</span>
          </h2>
          <p className="text-foreground/75 leading-[1.7] max-w-[52ch] text-lg">
            开放远程 / 海外协作。如果你有 AI 工作流、内容自动化、或独立产品的想法——直接发邮件，48h 内回复。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-px bg-border border border-border">
          {items.map((item) => {
            const key = item.label as ContactKey;
            const content = (
              <div className="flex items-start gap-4 p-6 lg:p-8 bg-background hover:bg-card/80 transition-colors h-full">
                <span className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground shrink-0">
                  {iconMap[key]}
                </span>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="text-foreground text-base lg:text-lg break-all flex items-center gap-2">
                    {item.value || "—"}
                    {item.href && (
                      <FiArrowUpRight
                        size={14}
                        className="shrink-0 text-muted-foreground"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group block"
              >
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pt-12 border-t border-border flex flex-col sm:flex-row justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground"
        >
          <div>
            &copy; {new Date().getFullYear()} MagicYStudio · all rights reserved
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>last deployed: {DEPLOY_STAMP}</span>
            <span>built with claude code</span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
