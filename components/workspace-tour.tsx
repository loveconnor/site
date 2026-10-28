"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { WorkspaceWindow, workspaceViews, type WorkspaceView } from "@/components/workspace-window";

const STEP_MS = 6000;

const steps: { view: WorkspaceView; title: string; body: string }[] = [
  {
    view: "request",
    title: "Request something",
    body: "Add an idea, a change, or the next piece of work with the context it needs.",
  },
  {
    view: "review",
    title: "Review the work",
    body: "Keep comments and approvals connected to the item being discussed.",
  },
  {
    view: "progress",
    title: "Follow the progress",
    body: "Find current updates and project files in the same place.",
  },
];

/** Advances through the workspace views on its own until someone picks a step. */
function useTour() {
  const reduce = useReducedMotion();
  const [view, setView] = useState<WorkspaceView>("request");
  const [auto, setAuto] = useState(true);
  const playing = auto && !reduce;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      setView((v) => workspaceViews[(workspaceViews.indexOf(v) + 1) % workspaceViews.length]);
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, view]);

  const choose = (v: WorkspaceView) => {
    setAuto(false);
    setView(v);
  };

  return { view, choose, playing };
}

/** Steps on the left drive the workspace window on the right. */
export function WorkspaceTour() {
  const { view, choose, playing } = useTour();

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
      <ol className="grid gap-2 lg:col-span-5">
        {steps.map((step, i) => {
          const active = step.view === view;
          return (
            <li key={step.view}>
              <button
                type="button"
                onClick={() => choose(step.view)}
                aria-pressed={active}
                className="group grid w-full grid-cols-[2.5rem_1fr] py-5 text-left"
              >
                <span className={`text-[13px] tabular-nums transition-colors ${active ? "text-ink" : "text-ink-3"}`}>
                  0{i + 1}
                </span>
                <span>
                  <span
                    className={`block text-[clamp(1.4rem,2vw,1.75rem)] font-medium tracking-[-0.024em] transition-colors duration-300 ${
                      active ? "text-ink" : "text-ink-3 group-hover:text-ink-2"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-sm pt-2 text-[15px] leading-relaxed text-ink-2">{step.body}</span>
                    </span>
                  </span>
                  <span className="mt-4 block h-px w-full overflow-hidden bg-line">
                    {active && (
                      <motion.span
                        key={`${view}-${playing}`}
                        className="block h-full origin-left bg-ink"
                        initial={{ scaleX: playing ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: playing ? STEP_MS / 1000 : 0, ease: "linear" }}
                      />
                    )}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="lg:col-span-7">
        <div className="rounded-[28px] bg-[#e4d9c8] p-4 sm:p-10 lg:p-14">
          <WorkspaceWindow view={view} onViewChange={choose} />
        </div>
      </div>
    </div>
  );
}

/** The window on its own, cycling through views; used where the steps aren't shown. */
export function WorkspaceDemo() {
  const { view, choose } = useTour();
  return <WorkspaceWindow view={view} onViewChange={choose} />;
}
