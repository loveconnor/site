"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";
import { MoirePlate } from "@/components/moire";
import { Arrow } from "@/components/ui";
import type { Project } from "@/lib/work";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Project index as an editorial table. On hover the other rows recede and a colour
 * plate for the project follows the pointer.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const reduce = useHydratedReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });
  const current = active === null ? null : projects[active];

  return (
    <div
      className="relative"
      onPointerMove={(event) => {
        x.set(event.clientX);
        y.set(event.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <div className="hidden grid-cols-12 gap-8 pb-5 text-[13px] font-medium text-ink-3 md:grid">
        <span className="col-span-1">No.</span>
        <span className="col-span-5">Project</span>
        <span className="col-span-3">Role</span>
        <span className="col-span-3">Status</span>
      </div>

      <ul className="group/list border-t border-line">
        {projects.map((project, i) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/work/${project.slug}`}
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(null)}
              className={`group/row grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-7 transition-opacity duration-500 ${EASE} group-hover/list:opacity-35 hover:opacity-100! focus-visible:opacity-100 focus-visible:outline-none md:grid-cols-12 md:gap-x-8 md:py-9`}
            >
              <span className="text-[13px] text-ink-3 tabular-nums md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 md:col-span-5">
                <span
                  className={`block text-[clamp(1.9rem,4vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em] [font-stretch:112.5%] transition-transform duration-700 ${EASE} group-hover/row:translate-x-3 group-focus-visible/row:underline`}
                >
                  {project.name}
                </span>
                <span className="mt-2 block text-[14px] text-ink-2 md:hidden">{project.label}</span>
              </span>
              <span className="hidden text-[15px] text-ink-2 md:col-span-3 md:block">{project.role}</span>
              <span className="hidden items-center justify-between gap-4 text-[15px] text-ink-2 md:col-span-3 md:flex">
                {project.status}
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 ring-line transition-colors duration-500 group-hover/row:bg-ink group-hover/row:text-paper group-hover/row:ring-ink"
                >
                  <Arrow className={`transition-transform duration-500 ${EASE} group-hover/row:rotate-45`} />
                </span>
              </span>
              <Arrow className="text-ink-2 md:hidden" />
            </Link>
          </li>
        ))}
      </ul>

      {/* Pointer-following preview; decorative, mouse only. */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {current && (
              <motion.div
                key="preview"
                className="relative -mt-[150px] ml-8 h-[300px] w-[240px] overflow-hidden rounded-[18px]"
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0"
                    style={{ backgroundColor: current.theme.bg }}
                    initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <MoirePlate
                      kind={current.pattern}
                      surface=""
                      stroke={current.theme.tone === "light" ? "#f6f4ef" : "#161513"}
                      className="absolute inset-0 opacity-30"
                    />
                    <p
                      className={`absolute inset-x-5 bottom-5 text-[13px] font-medium ${
                        current.theme.tone === "light" ? "text-paper/80" : "text-ink/70"
                      }`}
                    >
                      {current.label}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
