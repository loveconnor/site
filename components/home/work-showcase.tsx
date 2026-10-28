"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";
import { MoirePlate } from "@/components/moire";
import { Arrow } from "@/components/ui";
import type { Project } from "@/lib/work";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/** Where each featured project sits on the 12-column grid, so the set reads as an editorial spread. */
const layout = [
  { cell: "lg:col-span-7", plate: "aspect-[4/5] sm:aspect-[5/4]" },
  { cell: "lg:col-span-4 lg:col-start-9 lg:mt-56", plate: "aspect-[4/5]" },
  { cell: "lg:col-span-6 lg:col-start-2 lg:-mt-24", plate: "aspect-[4/5] sm:aspect-[4/3]" },
];

/** Selected work as an asymmetric spread: colour plates that unveil on scroll, captions underneath. */
export function WorkShowcase({ projects, aside }: { projects: Project[]; aside?: ReactNode }) {
  return (
    <ul className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-20 sm:gap-y-28 lg:grid-cols-12">
      {projects.map((project, i) => (
        <li key={project.slug} className={layout[i % layout.length].cell}>
          <ShowcaseItem project={project} index={i} plate={layout[i % layout.length].plate} />
        </li>
      ))}
      {aside && <li className="lg:col-span-3 lg:col-start-10 lg:self-end lg:pb-28">{aside}</li>}
    </ul>
  );
}

function ShowcaseItem({ project, index, plate }: { project: Project; index: number; plate: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const light = project.theme.tone === "light";

  return (
    <Link
      ref={ref}
      href={`/work/${project.slug}`}
      data-cursor="View case study"
      className="group block focus-visible:outline-none"
    >
      <motion.div
        data-nav-theme={light ? "dark" : "light"}
        className={`relative overflow-hidden rounded-[20px] sm:rounded-[28px] ${plate} group-focus-visible:ring-2 group-focus-visible:ring-ink group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-paper`}
        style={{ backgroundColor: project.theme.bg }}
        initial={{ clipPath: "inset(18% 0% 0% 0% round 28px)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y: reduce ? "0%" : y }}>
          <MoirePlate
            kind={project.pattern}
            surface=""
            stroke={light ? "#f6f4ef" : "#161513"}
            className={`absolute inset-0 opacity-30 transition-transform duration-[1.6s] ${EASE} group-hover:scale-[1.05]`}
          />
        </motion.div>
        <div
          className={`absolute inset-x-5 top-5 flex justify-between gap-4 text-[13px] font-medium sm:inset-x-7 sm:top-7 ${light ? "text-paper/70" : "text-ink/60"}`}
        >
          <span>{project.label}</span>
          <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <p
          aria-hidden="true"
          className={`absolute inset-0 grid place-items-center px-6 text-center text-[clamp(2.4rem,4.6vw,4.75rem)] leading-none font-medium tracking-[-0.04em] [font-stretch:112.5%] transition-transform duration-[1.2s] ${EASE} group-hover:scale-[0.97] ${light ? "text-paper" : "text-ink"}`}
        >
          {project.name}
        </p>
      </motion.div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-[19px] leading-snug font-medium tracking-[-0.01em]">{project.name}</h3>
          <p className="mt-1 max-w-md text-[15px] leading-relaxed text-ink-2">
            {project.summary.split(". ")[0].replace(/\.$/, "")}.
          </p>
        </div>
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 ring-line transition-colors duration-500 group-hover:bg-ink group-hover:text-paper group-hover:ring-ink"
        >
          <Arrow className={`transition-transform duration-500 ${EASE} group-hover:rotate-45`} />
        </span>
      </div>
    </Link>
  );
}
