"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Cinematic zoom-out + parallax on the hero
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const captionOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m} CET · ZÜRICH`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => v.play().catch(() => {});
    if (v.readyState >= 2) onReady();
    else v.addEventListener("loadeddata", onReady);
    return () => v.removeEventListener("loadeddata", onReady);
  }, []);

  const headline = ["Homes", "as", "architecture."];
  const sub =
    "An atelier of eight brokers curating the most singular modernist residences of the past century.";

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100svh] min-h-[560px] md:min-h-[760px] w-full overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Cinematic video background */}
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop={true}
          playsInline
          preload="auto"
          className="h-full w-full object-cover blur-[4px] md:blur-[5px]"
          poster=""
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Cinematic vignette + tint that respects theme */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.55) 80%, var(--color-bg) 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </motion.div>

      {/* Top meta strip */}
      <motion.div
        style={{ opacity: captionOpacity }}
        className="absolute top-0 left-0 right-0 z-10 pt-24"
      >
        <div className="container-x flex items-center justify-between text-white/80 text-[10px] uppercase tracking-[0.32em]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A961] animate-pulse" />
            <span>Live · {time}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>Reel 02 / 04</span>
            <span>N 47°22′ · E 8°33′</span>
          </div>
        </div>
      </motion.div>

      {/* 
        Foreground Content:
        Using `justify-center` on mobile to float the text in the sweet spot of portrait screens,
        and switching back to `md:justify-end` on desktop to preserve the original design.
      */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-center md:justify-end pt-20 pb-12 md:pt-36 md:pb-32 lg:pt-44 lg:pb-40"
      >
        <div className="container-x text-white">
          {/* Section subtitle line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="flex items-center gap-4 mb-4 md:mb-8"
          >
            <span className="block h-px w-8 md:w-12 bg-[#C9A961]" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/90">
              Vol. 01 — The Annual Index, MMXXVI
            </span>
          </motion.div>

          {/* Large display headline */}
          <h1 className="font-display text-[clamp(2.8rem,9vw,9.5rem)] leading-[0.9] tracking-tightest font-light text-balance">
            {headline.map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.6 + i * 0.15,
                  }}
                  className="block"
                >
                  {word}
                  {i === 0 && <span className="italic text-[#E8D9B0]">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Paragraph explanation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 md:mt-10 max-w-sm md:max-w-md text-[13px] md:text-[15px] leading-relaxed text-white/85 text-pretty font-light"
          >
            {sub}
          </motion.p>

          {/* Interactive buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-6 md:mt-12 flex flex-wrap items-center gap-4"
          >
            <a
              href="#portfolio"
              data-cursor="hover"
              className="btn border-white/40 text-white hover:bg-white hover:text-black py-3 px-5 md:py-4 md:px-7"
            >
              View the Index{" "}
              <ArrowDown size={14} strokeWidth={1.2} className="-rotate-45" />
            </a>
            <a
              href="#contact"
              data-cursor="hover"
              className="text-[9px] md:text-[10px] uppercase tracking-[0.32em] text-white/70 hover:text-white transition-colors"
            >
              Request Catalogue →
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 md:gap-3 text-white/70">
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 md:h-12 w-px bg-gradient-to-b from-white/80 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
