import AnimatedContent from "@/components/AnimatedContent";

/** Principles as a 2×2 set of quiet cards: number at the top, title and body settled at the bottom. */
export function Principles({ items }: { items: { title: string; body: string }[] }) {
  return (
    <AnimatedContent stagger={0.1} distance={30} className="grid gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="flex h-full min-h-[300px] flex-col justify-between gap-12 rounded-[24px] bg-card p-8 ring-1 ring-line ring-inset sm:p-10"
        >
          <p className="text-[13px] font-medium text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
          <div>
            <h3 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.08] font-medium tracking-[-0.026em]">
              {item.title}
            </h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-2">{item.body}</p>
          </div>
        </div>
      ))}
    </AnimatedContent>
  );
}
