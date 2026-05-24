"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const leftLinks = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "/works" },
];

const rightLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

const allLinks = [...leftLinks, ...rightLinks];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

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
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-[10001] px-5 py-5 lg:px-8"
    >
      <nav className="pointer-events-none mx-auto flex max-w-[1500px] items-start justify-between gap-8">
        <NavGroup links={leftLinks} isHome={isHome} onClick={handleNavClick} />
        <div className="hidden items-start gap-5 md:flex">
          <NavGroup
            links={rightLinks}
            isHome={isHome}
            onClick={handleNavClick}
          />
          <button
            onClick={() => navigateToHash("#contact")}
            data-cursor="build"
            className="pointer-events-auto h-9 border border-border px-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none"
          >
            Contact
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="pointer-events-auto ml-auto p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 border border-border bg-background/95 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="grid gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em]">
              {allLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="block py-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigateToHash("#contact")}
              data-cursor="build"
              className="mt-4 h-9 border border-border px-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none"
            >
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavGroup({
  links,
  isHome,
  onClick,
}: {
  links: Array<{ label: string; href: string }>;
  isHome: boolean;
  onClick: (href: string, e: React.MouseEvent) => void;
}) {
  return (
    <ul className="hidden gap-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] md:flex">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            onClick={(e) => onClick(link.href, e)}
            className={
              link.label === "Home" && isHome
                ? "pointer-events-auto text-primary transition-colors hover:text-foreground"
                : "pointer-events-auto text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
