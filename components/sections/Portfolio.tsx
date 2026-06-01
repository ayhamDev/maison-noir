"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Listing = {
  index: string;
  name: string;
  location: string;
  architect: string;
  year: string;
  price: string;
  area: string;
  spec: string;
  image: string;
};

const LISTINGS: Listing[] = [
  {
    index: "01",
    name: "Hôtel Particulier des Berges",
    location: "Lake Geneva, CH",
    architect: "Studio Vincent Van Duysen",
    year: "MMXXII",
    price: "Price Upon Request",
    area: "842 m²",
    spec: "5 bed · 6 bath · private moor",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "02",
    name: "The Concrete Pavilion",
    location: "Costa Smeralda, IT",
    architect: "After Carlo Scarpa",
    year: "MCMLXXIV",
    price: "€ 18,500,000",
    area: "610 m²",
    spec: "4 bed · 5 bath · clifftop pool",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "03",
    name: "Maison du Sable",
    location: "Comporta, PT",
    architect: "Arquitectura-G",
    year: "MMXX",
    price: "€ 6,400,000",
    area: "385 m²",
    spec: "4 bed · 4 bath · dune garden",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "04",
    name: "The North Penthouse",
    location: "Tribeca, NY",
    architect: "Renzo Piano, retrofit",
    year: "MMXXIV",
    price: "$ 42,000,000",
    area: "720 m²",
    spec: "5 bed · 6 bath · rooftop deck",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "05",
    name: "Riad Mimosa",
    location: "Medina, MR",
    architect: "Studio KO",
    year: "MMXXIII",
    price: "€ 4,200,000",
    area: "290 m²",
    spec: "3 bed · 4 bath · courtyard pool",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section
      ref={ref}
      id="portfolio"
      className="relative"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-32 lg:pt-36">
          <div className="container-x flex items-end justify-between">
            <div>
              <span className="eyebrow">— § III · The Index</span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.04] tracking-tight"
              >
                Featured{" "}
                <em className="italic text-gold-shimmer">residences</em>
              </motion.h2>
            </div>
            <div className="hidden lg:block text-right">
              <div
                className="text-[10px] uppercase tracking-[0.32em]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Pin to pan → scroll vertically
              </div>
              <div
                className="mt-2 text-[10px] uppercase tracking-[0.32em]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                05 of 47 mandates
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-24">
          <motion.div
            className="h-px origin-left"
            style={{
              background: "var(--color-accent)",
              scaleX: scrollYProgress,
            }}
          />
        </div>

        {/* 
          Horizontal track:
          Using top-[55%] to lower the cards and prevent them from clashing with the title header.
        */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="absolute top-[55%] -translate-y-1/2 left-0 flex gap-6 md:gap-10 pl-6 sm:pl-12 md:pl-20 pr-16 sm:pr-24 md:pr-32 will-change-transform"
        >
          {LISTINGS.map((l) => (
            <article
              key={l.index}
              /* 
                Height-driven layout:
                Forces cards to scale relative to the height of the screen rather than its width.
                This guarantees cards always fit on short widescreen laptops.
              */
              className="group relative shrink-0 w-[260px] sm:w-[320px] md:w-auto md:h-[48vh] md:max-h-[460px] md:min-h-[340px] aspect-[4/5] overflow-hidden rounded-sm"
              data-cursor="hover"
            >
              {/* High-Resolution Architectural Photography */}
              <div className="absolute inset-0 z-0 bg-[var(--color-bg-muted)]">
                <img
                  src={l.image}
                  alt={l.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.8s] ease-cinematic group-hover:scale-[1.03]"
                />
              </div>

              {/* Sophisticated Dark Gradient Vignette for flawless contrast */}
              <div
                className="absolute inset-0 z-10 transition-opacity duration-700 opacity-90 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.85) 100%)",
                }}
              />

              {/* Index numeral */}
              <div className="absolute top-5 left-5 text-white/95 text-[10px] uppercase tracking-[0.4em] z-20 font-medium">
                {l.index} / 05
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-20 text-white">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-[#E8D9B0] mb-2">
                  {l.location} · {l.year}
                </div>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl leading-[1.15] tracking-tight text-balance">
                  {l.name}
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2 text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-white/75 font-light">
                  <div>{l.area}</div>
                  <div>{l.spec}</div>
                  <div>{l.architect}</div>
                  <div className="text-[#E8D9B0] font-medium">{l.price}</div>
                </div>
                <div className="mt-4 sm:mt-5 flex items-center gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-white/80 group-hover:text-[#E8D9B0] transition-colors">
                  <span>View residence</span>
                  <ArrowUpRight
                    size={11}
                    strokeWidth={1.2}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Border */}
              <div className="absolute inset-0 border border-white/10 pointer-events-none z-20" />
            </article>
          ))}

          {/* End cap */}
          <div className="shrink-0 w-[50vw] sm:w-[40vw] flex flex-col justify-center pl-4 pr-8">
            <span className="eyebrow">— End of reel</span>
            <h3 className="mt-4 font-display text-[clamp(1.6rem,3vw,3rem)] leading-[1.05] tracking-tight text-balance">
              42 more <em className="italic text-gold-shimmer">off-market</em>{" "}
              mandates
            </h3>
            <p
              className="mt-4 sm:mt-6 max-w-sm text-[12px] sm:text-sm leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              For access to the unlisted inventory — including four penthouses,
              two Meier commissions, and a Gaudí workshop — write to us.
            </p>
            <a
              href="#contact"
              className="btn mt-6 sm:mt-8 self-start"
              data-cursor="hover"
            >
              Request the Index
            </a>
          </div>
        </motion.div>

        {/* Bottom scroll hint */}
        <div
          className="absolute bottom-10 left-0 right-0 z-20 container-x flex items-center justify-between text-[10px] uppercase tracking-[0.32em]"
          style={{ color: "var(--color-ink-muted)" }}
        >
          <span>Pin · Horizontal pan</span>
          <span>·</span>
        </div>
      </div>

      {/* Tall section to drive the pin (4x viewport) */}
      <div className="h-[400vh]" aria-hidden />
    </section>
  );
}
