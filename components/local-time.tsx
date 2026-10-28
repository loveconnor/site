"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
});

const subscribe = (callback: () => void) => {
  const id = window.setInterval(callback, 15_000);
  return () => window.clearInterval(id);
};

/** Current time in Columbus, rendered only in the browser to avoid a hydration mismatch. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, () => format.format(new Date()), () => null);
  return <span className="tabular-nums">{time ?? " "}</span>;
}
