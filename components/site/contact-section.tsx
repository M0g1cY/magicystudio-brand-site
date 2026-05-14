"use client";

import { motion } from "framer-motion";
import { FiMail, FiGithub, FiMapPin, FiClock, FiArrowUpRight } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";
import { contactInfo } from "@/lib/site-data";

const contactItems = contactInfo.filter((item) =>
  ["Email", "GitHub", "Location", "Available Time"].includes(item.label)
);

const iconMap: Record<string, React.ReactNode> = {
  Email: <FiMail size={18} />,
  GitHub: <FiGithub size={18} />,
  Location: <FiMapPin size={18} />,
  "Available Time": <FiClock size={18} />,
};

export function ContactSection() {
  return (
    <section id="contact" className="py-28 lg:py-32 px-6 lg:px-12 bg-muted/60">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header + Contact info side by side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-[1fr_2.2fr] gap-12 lg:gap-20 items-start"
        >
          {/* Left — text */}
          <div className="space-y-4">
            <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-[0.15em]">
              Contact
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              有项目想法？
              <br />
              <span className="text-amber-800">一起聊聊吧。</span>
            </h2>
            <p className="text-sm text-muted-foreground/60">
              我很乐意听到你的想法，并为你提供专业的建议。
            </p>
          </div>

          {/* Right — 3 rows × 4 columns */}
          <div className="rounded-2xl border border-border/40 bg-card/70 backdrop-blur-sm px-8 py-10 lg:px-10 lg:py-10">
            <div className="grid grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-1">
              {/* Row 1: Icons */}
              {contactItems.map((item) => (
                <div key={`icon-${item.label}`} className="mb-3">
                  <span className="inline-flex items-center justify-center size-11 rounded-xl bg-muted/60 text-muted-foreground">
                    {iconMap[item.label]}
                  </span>
                </div>
              ))}

              {/* Row 2: Labels */}
              {contactItems.map((item) => (
                <p key={`label-${item.label}`} className="text-xs text-muted-foreground/60 font-bold">
                  {item.label}
                </p>
              ))}

              {/* Row 3: Values */}
              {contactItems.map((item) => (
                <div key={`value-${item.label}`} className="min-w-0 mt-0.5">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group whitespace-nowrap"
                    >
                      {item.value}
                      <FiArrowUpRight size={11} className="text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground whitespace-nowrap">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-14 text-center"
        >
          <Separator className="mb-8 bg-border/40" />
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} MagicYStudio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
