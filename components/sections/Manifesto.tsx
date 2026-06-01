"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = [
  { w: "Silence", t: "noun · 14c." },
  { w: "Light", t: "noun · pre-12c." },
  { w: "Stone", t: "noun · pre-12c." },
  { w: "Restraint", t: "noun · 15c." },
  { w: "Intention", t: "noun · 14c." },
];

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const u = scrollYProgress.on("change", (v) => {
      setProgress(v);
      const idx = Math.min(WORDS.length - 1, Math.floor(v * WORDS.length));
      setActive(idx);
    });
    return () => u();
  }, [scrollYProgress]);

  return (
    <section
      ref={ref}
      className="relative py-40 lg:py-56 overflow-hidden"
      style={{ background: "var(--color-bg-elev)" }}
    >
      <div className="container-x">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 lg:col-span-2">
            <span className="eyebrow">— Interlude</span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <span className="font-display italic text-[clamp(1.2rem,2vw,1.8rem)] leading-[1.4] text-balance" style={{ color: "var(--color-ink-muted)" }}>
{'\u201C'}Architecture is the will of an age conceived in spatial terms, living, changing, new.{'\u201D'}
            </span>
            <div className="mt-3 text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-ink-muted)" }}>
              — Mies van der Rohe, 1923
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2 flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--color-ink-muted)" }}>
              Vocabulary
            </span>
            <div className="flex lg:flex-col gap-3">
              {WORDS.map((w, i) => (
                <div
                  key={i}
                  className="text-[11px] uppercase tracking-[0.28em] transition-colors"
                  style={{ color: i === active ? "var(--color-accent)" : "var(--color-ink-muted)" }}
                >
                  <span className="inline-block w-6">{String(i + 1).padStart(2, "0")}</span>
                  {w.w}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-10">
            <motion.div style={{ y }}>
              {WORDS.map((w, i) => {
                const start = i / WORDS.length;
                const end = (i + 1) / WORDS.length;
                const inView = progress >= start && progress < end + 0.05;
                return (
                  <div
                    key={i}
                    className="font-display text-[clamp(4rem,12vw,12rem)] leading-[0.9] tracking-tightest py-4"
                  >
                    <span
                      className="block transition-all duration-700 ease-silk"
                      style={{
                        color: inView ? "var(--color-ink)" : "var(--color-ink-muted)",
                        opacity: inView ? 1 : 0.18,
                        transform: inView ? "translateX(0)" : "translateX(-40px)",
                      }}
                    >
                      <em className="italic text-gold-shimmer">{w.w[0]}</em>
                      {w.w.slice(1)}.
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
