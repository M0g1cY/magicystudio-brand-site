"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { siteConfig, navLinks } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  const navigateToHash = (href: string) => {
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${href}`);
    }
    setMobileOpen(false);
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      navigateToHash(href);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-mono text-sm uppercase tracking-[0.18em] text-foreground"
        >
          {siteConfig.name}
          <span className="text-muted-foreground">studio</span>
        </Link>

        <ul className="hidden md:flex items-center gap-7 font-mono text-[0.72rem] uppercase tracking-[0.18em]">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={
                  link.label === "首页" && isHome
                    ? "text-primary transition-colors"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigateToHash("#contact")}
            data-cursor="build"
            className="font-mono text-[0.68rem] uppercase tracking-[0.18em] h-9 px-4 border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            contact
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="flex flex-col gap-3 px-6 py-4 font-mono text-[0.72rem] uppercase tracking-[0.18em]">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={
                      link.label === "首页" && isHome
                        ? "block py-2 text-primary"
                        : "block py-2 text-muted-foreground hover:text-foreground transition-colors"
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-4">
              <button
                onClick={() => navigateToHash("#contact")}
                data-cursor="build"
                className="font-mono text-[0.68rem] uppercase tracking-[0.18em] h-9 px-4 border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
