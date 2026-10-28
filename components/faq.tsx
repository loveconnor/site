"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Accordion: one answer open at a time, height eases open and the text settles in. */
export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <ul className="border-t border-line">
      {items.map(([question, answer], i) => {
        const isOpen = open === i;
        return (
          <li key={question} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-8 py-7 text-left focus-visible:outline-none"
              >
                <span
                  className={`text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug font-medium tracking-[-0.015em] transition-colors duration-300 group-focus-visible:underline ${
                    isOpen ? "text-ink" : "text-ink-2 group-hover:text-ink"
                  }`}
                >
                  {question}
                </span>
                {/* Same fill as the pill buttons: rises from below with a curved edge that flattens. */}
                <span
                  aria-hidden="true"
                  className={`relative isolate grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full ring-1 transition-colors duration-500 ${
                    isOpen ? "text-paper ring-ink" : "ring-line group-hover:text-paper group-hover:ring-ink"
                  }`}
                >
                  <span
                    className={`absolute inset-x-0 bottom-0 -z-10 h-[140%] rounded-t-[50%] bg-ink transition-[translate,border-radius] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "translate-y-0 rounded-t-none" : "translate-y-full group-hover:translate-y-0 group-hover:rounded-t-none"
                    }`}
                  />
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span
                    className={`absolute h-3.5 w-px bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "rotate-90 scale-y-0" : "group-hover:rotate-180"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  className="overflow-hidden"
                  initial={reduce ? { height: "auto" } : { height: 0 }}
                  animate={{ height: "auto" }}
                  exit={reduce ? undefined : { height: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <motion.p
                    className="max-w-2xl pb-8 sm:pr-16 text-[16px] leading-relaxed text-ink-2"
                    initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduce ? undefined : { opacity: 0, y: -4, filter: "blur(4px)", transition: { duration: 0.25 } }}
                    transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
                  >
                    {answer}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
