"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const PARAGRAPHS = [
  {
    lead: "We do not sell square metres.",
    rest: "We broker silence, light, and the precise angle at which a beam of morning sun grazes a travertine floor. A home is the only piece of architecture you can inhabit — and that, we believe, demands a different kind of care.",
  },
  {
    lead: "Eight brokers. One hundred residences a year.",
    rest: "By design, our roster is small. Our mandates are reviewed by hand. Every property we represent has been visited, lived in, photographed in three lights, and met its architect — or at least their intent.",
  },
  {
    lead: "Discretion is the currency of the trade.",
    rest: "Half of what we sell never appears on this site. If what you're seeking is not in the index, it is because it has not yet been whispered. The conversation begins with a single, quiet message.",
  },
];

function Paragraph({
  text,
  idx,
}: {
  text: (typeof PARAGRAPHS)[number];
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px", once: false });

  return (
    <div
      ref={ref}
      className="grid grid-cols-12 gap-6 py-16 lg:py-24 border-t first:border-t-0"
      style={{ borderColor: "var(--color-line)" }}
    >
      <div className="col-span-12 lg:col-span-2">
        <span className="eyebrow">Chapter 0{idx + 1}</span>
      </div>
      <motion.div
        animate={{ opacity: inView ? 1 : 0.22 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-12 lg:col-span-9 space-y-6"
      >
        <p
          className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.18] tracking-tight text-balance"
          style={{ color: "var(--color-ink)" }}
        >
          {text.lead}
        </p>
        <p
          className="text-[15px] leading-[1.85] max-w-2xl text-pretty"
          style={{ color: "var(--color-ink-soft)" }}
        >
          {text.rest}
        </p>
      </motion.div>
    </div>
  );
}

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      id="philosophy"
      /* Added overflow-hidden here to stop the background text from blowing out the mobile layout */
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Floating giant numeral */}
      <motion.div
        style={{ y }}
        className="absolute -right-20 top-40 font-display text-[clamp(18rem,40vw,38rem)] leading-none opacity-[0.04] pointer-events-none select-none"
      >
        MN
      </motion.div>

      <div className="container-x relative">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 lg:col-span-2">
            <span className="eyebrow">— § II</span>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tight text-balance"
            >
              A <em className="italic text-gold-shimmer">philosophy</em> of
              restraint, <br className="hidden lg:block" />
              measured in light and stone.
            </motion.h2>
          </div>
          <div className="col-span-12 lg:col-span-2 flex lg:justify-end">
            <div className="text-right">
              <div
                className="text-[10px] uppercase tracking-[0.32em]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Lat. 47.3769° N
              </div>
              <div
                className="text-[10px] uppercase tracking-[0.32em] mt-1"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Lon. 8.5417° E
              </div>
            </div>
          </div>
        </div>

        <div>
          {PARAGRAPHS.map((p, i) => (
            <Paragraph key={i} text={p} idx={i} />
          ))}
        </div>

        {/* Stat row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-24 pt-16 border-t"
          style={{ borderColor: "var(--color-line)" }}
        >
          {[
            { v: "17", l: "Years of practice" },
            { v: "08", l: "Brokers, on purpose" },
            { v: "100", l: "Residences, annually" },
            { v: "12", l: "Cities, one standard" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none text-gold-shimmer">
                {s.v}
              </div>
              <div
                className="mt-3 text-[10px] uppercase tracking-[0.32em]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
