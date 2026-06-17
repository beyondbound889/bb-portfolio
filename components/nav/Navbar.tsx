"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";
import { CommandPalette } from "./CommandPalette";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-shell items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Priyanshu Chauhan — home">
          <Sprout />
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            Priyanshu Chauhan
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-slate transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <CommandPalette />
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Connect
          </a>
          <button
            type="button"
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink md:hidden"
            onClick={() => setMenu(true)}
          >
            <Menu size={16} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-paper px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenu(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-10 flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenu(false)}
                  className="border-b border-line py-4 font-display text-2xl tracking-tight text-ink"
                >
                  {n.label}
                </a>
              ))}
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block font-mono text-sm text-petrol"
            >
              {site.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Sprout() {
  return (
    <span className="relative grid h-7 w-7 place-items-center rounded-md bg-ink text-paper">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21V11"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M12 12C12 8.5 9 6 5.5 6C5.5 9.5 8.2 12 12 12Z"
          fill="rgb(var(--sprout))"
        />
        <path
          d="M12 11C12 7 15.4 4 19 4C19 8 15.8 11 12 11Z"
          fill="rgb(var(--sprout))"
        />
      </svg>
    </span>
  );
}
