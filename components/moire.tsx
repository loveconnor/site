export type PatternKind = "rings" | "lines" | "radial" | "grid";

const range = (from: number, to: number, step: number) =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

function Layer({ kind, cx, cy }: { kind: PatternKind; cx: number; cy: number }) {
  switch (kind) {
    case "rings":
      return range(6, 340, 7).map((r) => <circle key={r} cx={cx} cy={cy} r={r} />);
    case "radial":
      return range(0, 179, 2.25).map((deg) => {
        const a = (deg * Math.PI) / 180;
        // Rounded so server and browser trig agree during hydration.
        const x = Math.round(Math.cos(a) * 50000) / 100;
        const y = Math.round(Math.sin(a) * 50000) / 100;
        return <line key={deg} x1={cx - x} y1={cy - y} x2={cx + x} y2={cy + y} />;
      });
    case "lines":
      return range(-300, 700, 6).map((x) => <line key={x} x1={x} y1={-300} x2={x} y2={600} />);
    case "grid":
      return range(-300, 700, 9).flatMap((v) => [
        <line key={`v${v}`} x1={v} y1={-300} x2={v} y2={600} />,
        <line key={`h${v}`} x1={-300} y1={v} x2={700} y2={v} />,
      ]);
  }
}

/** Two near-identical line fields, one slowly turning, interfere into a moiré. */
export function MoirePlate({
  kind,
  className = "",
  label,
  stroke = "var(--ink)",
  surface = "bg-card",
}: {
  kind: PatternKind;
  className?: string;
  label?: string;
  /** Line colour; pass a light colour for dark panels. */
  stroke?: string;
  /** Background class; pass "" to sit on whatever is behind it. */
  surface?: string;
}) {
  const offset = kind === "rings" || kind === "radial" ? 34 : 0;
  return (
    <div className={`overflow-hidden ${surface} ${className.includes("absolute") ? "" : "relative"} ${className}`}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full [&_*]:[vector-effect:non-scaling-stroke]"
        aria-hidden="true"
      >
        <g
          stroke={stroke}
          strokeWidth={0.9}
          fill="none"
          opacity={0.55}
        >
          <g>
            <Layer kind={kind} cx={200 - offset} cy={150} />
          </g>
          <g className="moire-drift" style={{ transform: "rotate(3deg)" }}>
            <Layer kind={kind} cx={200 + offset} cy={150} />
          </g>
        </g>
      </svg>
      {label && (
        <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-[13px] tracking-wide text-ink-2 backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}

/** The studio mark, traced from assets/logo.png. */
export function MoireMark({ size = 28, inverted = false }: { size?: number | string; inverted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block max-h-full max-w-full shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: inverted ? "var(--paper)" : "currentColor",
        maskImage: "url(/logo.svg)",
        maskSize: "contain",
        maskPosition: "center",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
