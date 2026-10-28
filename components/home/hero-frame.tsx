"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";

/** The hero panel: as it scrolls away it eases back, rounds and dims, as if the page lifts off it. */
export function HeroFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 56]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.5]);

  return (
    <motion.div
      ref={ref}
      id="hero-frame"
      data-nav-theme="dark"
      className="relative isolate flex min-h-[calc(100svh-1.5rem)] origin-top flex-col overflow-hidden rounded-[28px] bg-ink text-paper"
      style={{ scale: reduce ? 1 : scale, borderRadius: reduce ? 28 : radius }}
    >
      {children}
      {!reduce && (
        <motion.div className="pointer-events-none absolute inset-0 z-10 bg-ink" style={{ opacity: dim }} aria-hidden="true" />
      )}
    </motion.div>
  );
}
