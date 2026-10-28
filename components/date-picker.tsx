"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const monthFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const dayFormat = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const sameDay = (a: Date | null, b: Date | null) => !!a && !!b && a.toDateString() === b.toDateString();

/** The weeks shown for a month, Monday first, padded with nulls. */
function monthGrid(month: Date) {
  const offset = (month.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= days; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));
  while (cells.length % 7) cells.push(null);
  return cells;
}

/**
 * Inline calendar. Days before today are disabled. Arrow keys move between days,
 * Page Up / Page Down change month, and Enter or Space picks the focused day.
 * Mount it only in the browser: it reads today's date.
 */
export function DatePicker({
  value,
  onChange,
  label = "Choose a date",
}: {
  value: Date | null;
  onChange: (date: Date) => void;
  label?: string;
}) {
  const reduce = useReducedMotion();
  const [today] = useState(() => startOfDay(new Date()));
  const [focused, setFocused] = useState<Date>(() => value ?? today);
  const [direction, setDirection] = useState(1);
  const grid = useRef<HTMLDivElement>(null);
  const month = new Date(focused.getFullYear(), focused.getMonth(), 1);
  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const move = (next: Date, focus = true) => {
    const clamped = next < today ? today : next;
    setDirection(clamped >= focused ? 1 : -1);
    setFocused(clamped);
    if (focus) requestAnimationFrame(() => grid.current?.querySelector<HTMLElement>("[tabindex='0']")?.focus());
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const steps: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      PageUp: () => new Date(focused.getFullYear(), focused.getMonth() - 1, focused.getDate()),
      PageDown: () => new Date(focused.getFullYear(), focused.getMonth() + 1, focused.getDate()),
    };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    move(step());
  };

  const navButton =
    "grid h-9 w-9 place-items-center rounded-full text-ink ring-1 ring-line transition-colors duration-300 hover:bg-ink hover:text-paper hover:ring-ink disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="rounded-[20px] bg-card p-4 ring-1 ring-line sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[15px] font-medium" aria-live="polite">
          {monthFormat.format(month)}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className={navButton}
            onClick={() => move(addMonths(month, -1), false)}
            disabled={month <= minMonth}
            aria-label="Previous month"
          >
            <Chevron className="rotate-180" />
          </button>
          <button type="button" className={navButton} onClick={() => move(addMonths(month, 1), false)} aria-label="Next month">
            <Chevron />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 text-center text-[12px] font-medium text-ink-3" aria-hidden="true">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1.5">
            {d}
          </span>
        ))}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={month.toISOString()}
            ref={grid}
            role="grid"
            aria-label={label}
            onKeyDown={onKeyDown}
            custom={direction}
            initial={reduce ? false : { opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-7 gap-y-1"
          >
            {monthGrid(month).map((day, i) => {
              if (!day) return <span key={`pad-${i}`} />;
              const disabled = day < today;
              const selected = sameDay(day, value);
              const isToday = sameDay(day, today);
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  role="gridcell"
                  disabled={disabled}
                  tabIndex={sameDay(day, focused) ? 0 : -1}
                  aria-selected={selected}
                  aria-label={dayFormat.format(day)}
                  onClick={() => {
                    setFocused(day);
                    onChange(day);
                  }}
                  className={`mx-auto grid aspect-square w-full max-w-11 place-items-center rounded-full text-[14px] tabular-nums transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    selected
                      ? "bg-ink font-medium text-paper"
                      : disabled
                        ? "text-ink-3/40"
                        : `text-ink hover:bg-paper ${isToday ? "ring-1 ring-ink/30 ring-inset" : ""}`
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
