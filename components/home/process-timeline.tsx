"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";

export type ProcessStep = { title: string; body: string };

/** Four steps on one hairline; the line draws as the section scrolls and each step lights up as it is reached. */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });

  return (
    <ol ref={ref} className="relative grid gap-12 pl-8 lg:grid-cols-4 lg:gap-8 lg:pt-14 lg:pl-0">
      {/* Track and drawn line: vertical on phones, horizontal from lg. */}
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-paper/15 lg:inset-x-0 lg:top-[5px] lg:bottom-auto lg:h-px lg:w-auto" />
      <motion.span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-paper lg:hidden"
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-[5px] hidden h-px origin-left bg-paper lg:block"
        style={{ scaleX: reduce ? 1 : scrollYProgress }}
      />
      {steps.map((step, i) => (
        <Step key={step.title} step={step} index={i} total={steps.length} progress={scrollYProgress} reduce={reduce} />
      ))}
    </ol>
  );
}

function Step({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const at = index / total;
  const opacity = useTransform(progress, [at - 0.05, at + 0.1], [0.35, 1]);
  const dot = useTransform(progress, [at - 0.02, at + 0.02], ["#57534e", "#d9481f"]);

  return (
    <li className="relative">
      <motion.span
        aria-hidden="true"
        className="absolute top-1.5 -left-8 h-[11px] w-[11px] rounded-full ring-4 ring-ink lg:-top-14 lg:left-0"
        style={{ backgroundColor: reduce ? "#d9481f" : dot }}
      />
      <motion.div style={{ opacity: reduce ? 1 : opacity }}>
        <p className="text-[13px] font-medium text-paper/50 tabular-nums">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-4 text-[clamp(1.5rem,2.1vw,1.9rem)] leading-[1.08] font-medium tracking-[-0.024em]">
          {step.title}
        </h3>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper/65">{step.body}</p>
      </motion.div>
    </li>
  );
}
