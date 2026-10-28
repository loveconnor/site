"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import WarmTooltip, { WarmTooltipGroup } from "@/components/WarmTooltip";

const subscribe = () => () => {};

/** WarmTooltip measures the window while rendering, so it mounts after hydration. */
export function CapacityTooltip({ content, children }: { content: string; children: ReactNode }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const trigger = (
    <span tabIndex={0} className="cursor-help underline decoration-ink-3 decoration-dotted underline-offset-4">
      {children}
    </span>
  );
  if (!mounted) return trigger;
  return (
    <WarmTooltipGroup>
      <WarmTooltip content={content} surfaceColor="#161513" inkColor="#f6f4ef" side="bottom">
        {trigger}
      </WarmTooltip>
    </WarmTooltipGroup>
  );
}
