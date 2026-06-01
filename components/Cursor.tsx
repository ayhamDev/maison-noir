"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 400, damping: 35, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsCoarse(true);
      return;
    }
    setHidden(false);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,[data-cursor='hover']");
      setHover(!!interactive);
    };
    const leave = () => setHover(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (isCoarse || hidden) return null;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x: sx, y: sy, mixBlendMode: "difference" }}
        animate={{
          width: 12,
          height: 12,
          scale: hover ? 5 : 1,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        <span className="block w-full h-full rounded-full bg-white" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full"
        style={{ x, y, background: "var(--color-accent)" }}
      />
    </>
  );
}
