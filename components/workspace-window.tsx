"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/*
 * A miniature of the real client portal (~/Work/freelance/client-portal): its sidebar, top bar,
 * status glyphs, "Next for you" card, request rows, phase list and comment thread, in the
 * portal's own palette. Content is the portal's fictional demo client, Harbor & Pine Bakery.
 */

export const workspaceViews = ["request", "review", "progress"] as const;
export type WorkspaceView = (typeof workspaceViews)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

// The portal's tokens (app/globals.css there).
const c = {
  chrome: "#faf9f7",
  panel: "#ffffff",
  selected: "#eeece8",
  border: "#ebe9e5",
  borderStrong: "#d9d6d0",
  text: "#191917",
  text2: "#45433e",
  muted: "#75726b",
  faint: "#a8a59e",
  ink: "#1c1b19",
  warnText: "#7a4f1e",
  gray: "#a8a59e",
  yellow: "#c49a2c",
  orange: "#c0673c",
  green: "#4f8a62",
  purple: "#7d6aa8",
};

const nav: { view: WorkspaceView | null; label: string; icon: ReactNode }[] = [
  { view: "review", label: "Home", icon: <IconHome /> },
  { view: "progress", label: "Your project", icon: <IconFolder /> },
  { view: "request", label: "Requests", icon: <IconChat /> },
  { view: null, label: "Files", icon: <IconFiles /> },
  { view: null, label: "Billing", icon: <IconCard /> },
];

const crumbs: Record<WorkspaceView, string[]> = {
  review: ["Home"],
  progress: ["Projects", "Website redesign"],
  request: ["Requests"],
};

const mobileTab: Record<WorkspaceView, string> = { review: "Home", progress: "Project", request: "Requests" };

export function WorkspaceWindow({
  view,
  onViewChange,
}: {
  view: WorkspaceView;
  onViewChange?: (view: WorkspaceView) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className="flex overflow-hidden rounded-[14px] text-left shadow-[0_1px_0_rgba(22,21,19,0.04),0_24px_48px_-32px_rgba(22,21,19,0.35)] ring-1 ring-black/5"
      style={{ background: c.chrome, color: c.text }}
    >
      <aside className="hidden w-[164px] shrink-0 flex-col gap-4 px-2 pt-3.5 pb-3 sm:flex">
        <div className="min-w-0 px-1.5">
          <span className="block truncate text-[12px] font-semibold">Connor Love</span>
          <span className="block truncate text-[11px]" style={{ color: c.muted }}>
            for Harbor &amp; Pine
          </span>
        </div>
        <nav aria-label="Portal sections (sample)">
          <ul className="grid gap-px">
            {nav.map((item) => {
              const active = item.view === view;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    disabled={!item.view}
                    onClick={() => item.view && onViewChange?.(item.view)}
                    aria-current={active ? "page" : undefined}
                    className="flex w-full items-center gap-2 rounded-[6px] px-1.5 py-1.5 text-[12px] font-medium transition-colors duration-200 enabled:hover:bg-[#f4f3f0] disabled:cursor-default"
                    style={{ background: active ? c.selected : undefined, color: active ? c.text : c.muted }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="mt-auto flex items-start gap-1.5 px-1.5 text-[10.5px] leading-snug" style={{ color: c.muted }}>
          <IconClock />I reply within one business day.
        </p>
      </aside>

      <div
        className="m-1.5 flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] sm:ml-0"
        style={{ background: c.panel, boxShadow: `0 0 0 1px ${c.border}` }}
      >
        <div className="flex h-10 shrink-0 items-center justify-between gap-3 px-4" style={{ borderBottom: `1px solid ${c.border}` }}>
          <p className="hidden min-w-0 items-center gap-1.5 truncate text-[12px] sm:flex">
            {crumbs[view].map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5" style={{ color: i === crumbs[view].length - 1 ? c.text : c.muted }}>
                {i > 0 && <span style={{ color: c.faint }}>/</span>}
                {crumb}
              </span>
            ))}
          </p>
          {/* On phones the sidebar is hidden, so the views switch from here. */}
          <div className="flex gap-1 sm:hidden" role="tablist" aria-label="Portal view">
            {workspaceViews.map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={v === view}
                onClick={() => onViewChange?.(v)}
                className="rounded-[6px] px-2 py-1 text-[11.5px] font-medium"
                style={{ background: v === view ? c.selected : undefined, color: v === view ? c.text : c.muted }}
              >
                {mobileTab[v]}
              </button>
            ))}
          </div>
          <span
            className="hidden shrink-0 items-center gap-1 rounded-[6px] px-2 py-1 text-[11.5px] font-medium sm:inline-flex"
            style={{ boxShadow: `0 0 0 1px ${c.border}`, color: c.text }}
          >
            <IconPlus />
            New request
          </span>
        </div>

        <div className="relative h-[380px] sm:h-[356px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              className="absolute inset-0 overflow-hidden px-4 pt-5 sm:px-6"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {view === "review" && <HomeView />}
              {view === "progress" && <ProjectView />}
              {view === "request" && <RequestsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* Views */

function Title({ children }: { children: ReactNode }) {
  return <h3 className="text-[19px] leading-tight font-medium tracking-[-0.02em] [font-stretch:100%]">{children}</h3>;
}

function HomeView() {
  return (
    <div>
      <p className="text-[12px]" style={{ color: c.muted }}>
        Good afternoon, Maya
      </p>
      <div className="mt-0.5">
        <Title>Website redesign</Title>
      </div>
      <p className="mt-1 text-[12.5px] leading-snug" style={{ color: c.muted }}>
        Version 2 of your homepage design is ready. Once it’s approved, I’ll start building the site.
      </p>

      <div className="mt-4 flex items-center gap-4 rounded-[6px] p-3.5" style={{ boxShadow: `0 0 0 1px ${c.border}` }}>
        <div className="min-w-0 flex-1">
          <p className="text-[11.5px] font-medium" style={{ color: c.ink }}>
            Next for you
          </p>
          <p className="mt-0.5 text-[14px] font-semibold tracking-[-0.01em]">Review your homepage design</p>
          <p className="mt-0.5 truncate text-[12px]" style={{ color: c.muted }}>
            The layout, wording, and overall direction.
          </p>
        </div>
        <span
          className="hidden shrink-0 items-center gap-1 rounded-[6px] px-2.5 py-1.5 text-[11.5px] font-medium text-white md:inline-flex"
          style={{ background: c.ink }}
        >
          Review design <IconArrow />
        </span>
      </div>

      <div className="mt-3 grid gap-2">
        <Message name="Maya Chen" time="Oct 16">
          Love the warmer photo. Can the pickup button be a little bigger?
        </Message>
        <Message name="Connor Love" time="Oct 16">
          Done in version 2. It’s also higher on the page now.
        </Message>
      </div>
    </div>
  );
}

const phases: { name: string; kind: StatusKind; date: string }[] = [
  { name: "Planning", kind: "done", date: "Done Sep 19" },
  { name: "Design", kind: "in-progress", date: "Target Oct 24" },
  { name: "Build", kind: "todo", date: "Target Nov 6" },
  { name: "Review and testing", kind: "todo", date: "Target Nov 16" },
  { name: "Launch", kind: "todo", date: "Target Nov 20" },
];

function ProjectView() {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <Title>Website redesign</Title>
        <Pill icon={<StatusIcon kind="in-progress" />}>In progress</Pill>
      </div>
      <p className="mt-1.5 flex items-center gap-1.5 text-[12px]" style={{ color: c.muted }}>
        <PhaseRing done={1} total={5} />
        <span>
          <span className="font-medium" style={{ color: c.text }}>
            Design
          </span>{" "}
          · 1/5
        </span>
        <span className="ml-2 hidden sm:inline">Target launch Nov 20</span>
      </p>

      <ol className="mt-4">
        {phases.map((phase) => (
          <li key={phase.name} className="flex items-center gap-2.5 py-[7px] text-[12.5px]" style={{ borderTop: `1px solid ${c.border}` }}>
            <StatusIcon kind={phase.kind} />
            <span className="flex-1 font-medium" style={{ color: phase.kind === "todo" ? c.muted : c.text }}>
              {phase.name}
            </span>
            <span className="text-[11.5px] tabular-nums" style={{ color: c.muted }}>
              {phase.date}
            </span>
          </li>
        ))}
      </ol>

      <dl className="mt-3 rounded-[8px] px-3.5 py-3 text-[12px] sm:flex sm:gap-3" style={{ background: c.chrome }}>
        <dt className="shrink-0 sm:w-[124px]" style={{ color: c.muted }}>
          What I’m working on
        </dt>
        <dd>Designing the menu and catering pages to match the homepage.</dd>
      </dl>
    </div>
  );
}

const requests: { title: string; kind: StatusKind; state: string; date: string; needsYou?: boolean }[] = [
  { title: "Add a catering inquiry form", kind: "attention", state: "Needs your reply", date: "Oct 15", needsYou: true },
  { title: "Gift card page", kind: "review", state: "Estimate to approve", date: "Oct 16", needsYou: true },
  { title: "Menu PDF link is broken", kind: "in-progress", state: "In progress", date: "Oct 17" },
  { title: "Update holiday hours on the current site", kind: "done", state: "Done", date: "Oct 4" },
];

function RequestsView() {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <Title>Requests</Title>
        <p className="text-[12px]" style={{ color: c.muted }}>
          Website redesign
        </p>
      </div>
      <ul className="mt-4">
        {requests.map((request) => (
          <li key={request.title} className="flex items-center gap-2.5 py-2.5 text-[12.5px]" style={{ borderTop: `1px solid ${c.border}` }}>
            <StatusIcon kind={request.kind} />
            <span className="min-w-0 flex-1 truncate font-medium">{request.title}</span>
            <span
              className="hidden shrink-0 text-[11.5px] md:inline"
              style={{ color: request.needsYou ? c.warnText : c.muted, fontWeight: request.needsYou ? 500 : 400 }}
            >
              {request.state}
            </span>
            <span className="w-11 shrink-0 text-right text-[11.5px] tabular-nums" style={{ color: c.muted }}>
              {request.date}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-[6px] px-3.5 py-3" style={{ boxShadow: `0 0 0 1px ${c.border}` }}>
        <p className="text-[12.5px]" style={{ color: c.faint }}>
          Describe what you need. Add links or files if they help…
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px]" style={{ color: c.faint }}>
            Connor is notified by email
          </span>
          <span className="grid size-6 place-items-center rounded-full text-white" style={{ background: c.ink }}>
            <IconArrowUp />
          </span>
        </div>
      </div>
    </div>
  );
}

/* The portal's parts */

function Message({ name, time, children }: { name: string; time: string; children: ReactNode }) {
  return (
    <div className="rounded-[6px] px-3 py-2.5" style={{ background: c.panel, boxShadow: `0 0 0 1px ${c.border}` }}>
      <p className="flex items-center gap-2 text-[11.5px]">
        <span className="font-medium">{name}</span>
        <span style={{ color: c.muted }}>{time}</span>
      </p>
      <p className="mt-1 text-[12.5px] leading-snug" style={{ color: c.text2 }}>
        {children}
      </p>
    </div>
  );
}

function Pill({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <span
      className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-[6px] px-2 text-[11.5px] leading-none font-medium whitespace-nowrap"
      style={{ background: c.panel, color: c.muted, boxShadow: `0 0 0 1px ${c.border}` }}
    >
      {icon}
      {children}
    </span>
  );
}

/** Progress as a phase count, never a percentage. */
function PhaseRing({ done, total, size = 14 }: { done: number; total: number; size?: number }) {
  const r = size / 2 - 2;
  const circumference = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={c.borderStrong} strokeWidth="2" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={done === total ? c.green : c.yellow}
        strokeWidth="2"
        strokeDasharray={`${(circumference * done) / total} ${circumference}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

type StatusKind = "todo" | "attention" | "in-progress" | "review" | "done";

const statusColor: Record<StatusKind, string> = {
  todo: c.gray,
  attention: c.orange,
  "in-progress": c.yellow,
  review: c.purple,
  done: c.green,
};

/** The portal's status glyphs: shape carries the meaning, not colour alone. */
function StatusIcon({ kind }: { kind: StatusKind }) {
  const color = statusColor[kind];
  const common = { width: 14, height: 14, viewBox: "0 0 14 14", fill: "none", className: "shrink-0", "aria-hidden": true } as const;
  switch (kind) {
    case "todo":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case "attention":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth="1.5" />
          <path d="M7 4.2v3.3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="7" cy="9.6" r="0.85" fill={color} />
        </svg>
      );
    case "in-progress":
    case "review":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth="1.5" />
          <path d={kind === "in-progress" ? "M7 7 7 3.2A3.8 3.8 0 0 1 7 10.8Z" : "M7 7 7 3.2A3.8 3.8 0 1 1 3.2 7Z"} fill={color} />
        </svg>
      );
    case "done":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="6.25" fill={color} />
          <path d="m4.4 7.2 1.8 1.8 3.5-3.7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* Line icons in the portal's style. */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}
function IconHome() {
  return (
    <Icon>
      <path d="M2.5 7 8 2.5 13.5 7v6a.5.5 0 0 1-.5.5H10V10H6v3.5H3a.5.5 0 0 1-.5-.5Z" />
    </Icon>
  );
}
function IconFolder() {
  return (
    <Icon>
      <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h3l1.5 1.5h4.5A1.5 1.5 0 0 1 14 6v5.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5Z" />
    </Icon>
  );
}
function IconChat() {
  return (
    <Icon>
      <path d="M3 3.5h10a1 1 0 0 1 1 1V11a1 1 0 0 1-1 1H6.5L3.5 14v-2H3a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1ZM5 6.5h6M5 9h4" />
    </Icon>
  );
}
function IconFiles() {
  return (
    <Icon>
      <path d="M5 2.5h4.5L12.5 5.5v8a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1ZM9.5 2.5v3h3" />
    </Icon>
  );
}
function IconCard() {
  return (
    <Icon>
      <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h9A1.5 1.5 0 0 1 14 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5ZM2 6.5h12M4.5 10h2" />
    </Icon>
  );
}
function IconClock() {
  return (
    <Icon>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 5v3l2 1.5" />
    </Icon>
  );
}
function IconPlus() {
  return (
    <Icon>
      <path d="M8 3.5v9M3.5 8h9" />
    </Icon>
  );
}
function IconArrow() {
  return (
    <Icon>
      <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />
    </Icon>
  );
}
function IconArrowUp() {
  return (
    <Icon>
      <path d="M8 12.5v-9M4.5 7 8 3.5 11.5 7" />
    </Icon>
  );
}
