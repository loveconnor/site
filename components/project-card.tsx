import Link from "next/link";
import { MoirePlate } from "@/components/moire";
import { WorkspaceDemo } from "@/components/workspace-tour";
import { Arrow } from "@/components/ui";
import type { Project } from "@/lib/work";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * A full-bleed project card in the project's own colour: a large wordmark over a faint
 * moiré, and the caption inside the card. The client workspace can show its live demo instead.
 * The whole card links through a stretched link, so the interactive demo can sit above it.
 */
export function ProjectCard({
  project,
  index,
  className = "",
  demo = false,
}: {
  project: Project;
  index: number;
  className?: string;
  /** Show the live workspace demo (client workspace only). Off where the page already shows it. */
  demo?: boolean;
}) {
  const light = project.theme.tone === "light";
  const ink = light ? "text-paper" : "text-ink";
  const muted = light ? "text-paper/65" : "text-ink/60";
  const showDemo = demo && project.slug === "client-workspace";

  return (
    <article
      data-cursor="View case study"
      data-nav-theme={light ? "dark" : "light"}
      className={`group relative isolate flex flex-col overflow-hidden rounded-[24px] sm:rounded-[32px] ${ink} ${className}`}
      style={{ backgroundColor: project.theme.bg }}
    >
      <MoirePlate
        kind={project.pattern}
        surface=""
        stroke={light ? "#f6f4ef" : "#161513"}
        className={`absolute inset-0 -z-10 opacity-[0.14] transition-transform duration-[1.6s] ${EASE} group-hover:scale-[1.04]`}
      />

      <div className="flex items-start justify-between gap-6 p-6 sm:p-10">
        <span className={`text-[13px] font-medium tabular-nums ${muted}`}>{String(index + 1).padStart(2, "0")}</span>
        <span className={`text-right text-[13px] font-medium ${muted}`}>{project.label}</span>
      </div>

      <div className="relative flex flex-1 items-center px-6 sm:px-10">
        {showDemo ? (
          // Above the stretched link so the demo stays interactive.
          <div className="relative z-10 mx-auto hidden w-full max-w-2xl text-ink md:block">
            <WorkspaceDemo />
          </div>
        ) : null}
        <h3
          className={`${showDemo ? "md:hidden" : ""} text-[clamp(2.8rem,8.4vw,8.5rem)] leading-[0.92] font-medium tracking-[-0.045em]`}
        >
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>
      </div>

      <div className="flex items-end justify-between gap-6 p-6 sm:p-10">
        <div>
          {showDemo && (
            // On desktop the demo replaces the wordmark, so the heading and link live here.
            <h3 className="mb-2 hidden text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium tracking-[-0.024em] md:block">
              <Link
                href={`/work/${project.slug}`}
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
              >
                {project.name}
              </Link>
            </h3>
          )}
          <div className="grid">
            <p
              className={`col-start-1 row-start-1 text-[15px] transition-all duration-500 ${EASE} ${muted} group-hover:-translate-y-2 group-hover:opacity-0`}
            >
              {project.role} · {project.status}
            </p>
            <p
              className={`col-start-1 row-start-1 max-w-md translate-y-2 text-[15px] opacity-0 transition-all duration-500 ${EASE} ${muted} group-hover:translate-y-0 group-hover:opacity-100`}
              aria-hidden="true"
            >
              {project.summary.split(". ")[0].replace(/\.$/, "")}.
            </p>
          </div>
        </div>
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ring-1 transition-colors duration-500 ${
            light
              ? "ring-paper/30 group-hover:bg-paper group-hover:text-ink"
              : "ring-ink/25 group-hover:bg-ink group-hover:text-paper"
          }`}
          aria-hidden="true"
        >
          <Arrow className={`transition-transform duration-500 ${EASE} group-hover:rotate-45`} />
        </span>
      </div>
    </article>
  );
}
