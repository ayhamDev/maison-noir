"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const links = [
  { label: "Index", href: "#index" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Atlas", href: "#atlas" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [open, setOpen] = useState(false);

  // Sync initial theme and listen to scrolling
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem("mn-theme", next);
    } catch {}
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-700 ease-silk ${
          scrolled ? "py-3 backdrop-blur-md" : "py-6"
        }`}
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--color-bg) 78%, transparent)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--color-line)"
            : "1px solid transparent",
        }}
      >
        <div className="container-x flex items-center justify-between">
          {/* Logo Brand Block */}
          <a
            href="#hero"
            className="group flex items-center gap-3"
            data-cursor="hover"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              className={`transition-colors duration-500 ${
                scrolled ? "text-[var(--color-ink)]" : "text-white"
              }`}
            >
              <path
                d="M2 26 L14 4 L26 26 L20 26 L14 14 L8 26 Z"
                fill="currentColor"
                className="transition-colors group-hover:fill-[var(--color-accent)]"
              />
              <line
                x1="14"
                y1="4"
                x2="14"
                y2="26"
                stroke="var(--color-accent)"
                strokeWidth="0.6"
              />
            </svg>
            <div className="leading-none">
              <div
                className={`font-display text-[15px] tracking-[0.32em] uppercase transition-colors duration-500 ${
                  scrolled ? "text-[var(--color-ink)]" : "text-white"
                }`}
              >
                Maison Noir
              </div>
              <div
                className="mt-0.5 text-[9px] uppercase tracking-[0.3em] transition-colors duration-500"
                style={{
                  color: scrolled
                    ? "var(--color-ink-muted)"
                    : "rgba(255, 255, 255, 0.6)",
                }}
              >
                Atelier · Est. 2009
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className="group relative text-[11px] uppercase tracking-[0.28em] font-medium transition-colors duration-500 hover:!text-[var(--color-accent)]"
                style={{
                  color: scrolled
                    ? "var(--color-ink-soft)"
                    : "rgba(255, 255, 255, 0.85)",
                }}
              >
                <span className="text-[var(--color-accent)] mr-1.5">
                  0{i + 1}
                </span>
                {l.label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-700 ease-silk"
                  style={{ background: "var(--color-accent)" }}
                />
              </a>
            ))}
          </nav>

          {/* Action Bar */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              data-cursor="hover"
              className={`relative h-10 w-10 grid place-items-center rounded-full border transition-all duration-500 hover:rotate-12 ${
                scrolled
                  ? "text-[var(--color-ink)]"
                  : "text-white hover:border-white"
              }`}
              style={{
                borderColor: scrolled
                  ? "var(--color-line-strong)"
                  : "rgba(255, 255, 255, 0.3)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    <Sun size={15} strokeWidth={1.2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    <Moon size={15} strokeWidth={1.2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* "Private Viewing" CTA Button */}
            <a
              href="#contact"
              className={`btn hidden md:inline-flex transition-all duration-500 ${
                scrolled
                  ? ""
                  : "border-white/40 text-white hover:bg-white hover:text-black hover:border-white"
              }`}
              data-cursor="hover"
            >
              Private Viewing
            </a>

            {/* Mobile Menu Toggle Trigger */}
            <button
              onClick={() => setOpen(true)}
              className={`lg:hidden h-10 w-10 grid place-items-center rounded-full border transition-all duration-500 ${
                scrolled
                  ? "text-[var(--color-ink)]"
                  : "text-white hover:border-white"
              }`}
              style={{
                borderColor: scrolled
                  ? "var(--color-line-strong)"
                  : "rgba(255, 255, 255, 0.3)",
              }}
              aria-label="Open menu"
            >
              <Menu size={15} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </header>

      {/* 
        Mobile Fullscreen Overlay Menu
        Rendered as a sibling to the header to prevent CSS context issues (transforms & filters)
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[180] grid place-items-center"
            style={{ background: "var(--color-bg)" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 h-12 w-12 grid place-items-center rounded-full border transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]"
              style={{
                borderColor: "var(--color-line-strong)",
                color: "var(--color-ink)",
              }}
              aria-label="Close menu"
            >
              <X size={18} strokeWidth={1.2} />
            </button>

            {/* Navigation Menu Links */}
            <div className="text-center space-y-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block font-display text-5xl tracking-tight hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: "var(--color-ink)" }}
                >
                  <span className="text-[var(--color-accent)] text-sm tracking-[0.32em] align-top mr-3">
                    0{i + 1}
                  </span>
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
