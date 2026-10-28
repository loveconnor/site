"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";
import { useIntroReady } from "@/components/intro";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A headline whose words rise out of a mask. Use "\n" to start a new line (tablet and up).
 * With `afterIntro`, it waits for the intro curtain to lift.
 */
export function Headline({
  text,
  as: Tag = "h2",
  className = "",
  afterIntro = false,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  afterIntro?: boolean;
  delay?: number;
}) {
  const reduce = useHydratedReducedMotion();
  const ready = useIntroReady();
  const MotionTag = motion[Tag];
  const play = !afterIntro || ready;
  const lines = text.split("\n").map((line) => line.split(/\s+/).filter(Boolean));

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView={play ? "shown" : undefined}
      animate={afterIntro && play ? "shown" : undefined}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.04, delayChildren: delay }}
    >
      {lines.map((words, l) => (
        // Line breaks apply from tablet width up; on phones the text wraps naturally.
        <Fragment key={l}>
          <span className={lines.length > 1 ? "md:block" : undefined}>
            {words.map((word, i) => (
              <Fragment key={i}>
                {/* Generous padding keeps ascenders and descenders inside the reveal mask. */}
                <span className="-my-[0.2em] inline-block overflow-hidden py-[0.2em] align-top">
                  <motion.span
                    className="inline-block"
                    variants={{ hidden: { y: "130%" }, shown: { y: "0%" } }}
                    transition={{ duration: reduce ? 0 : 1.1, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < words.length - 1 && " "}
              </Fragment>
            ))}
          </span>
          {l < lines.length - 1 && " "}
        </Fragment>
      ))}
    </MotionTag>
  );
}
