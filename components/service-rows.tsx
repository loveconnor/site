import Link from "next/link";
import { Arrow } from "@/components/ui";

export type ServiceRow = {
  title: string;
  body: string;
  includes: string[];
  price: string;
  href: string;
};

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/** Numbered service rows that show their scope at rest; hover eases a card surface in behind. */
export function ServiceRows({ rows }: { rows: ServiceRow[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {rows.map((row, i) => (
        <li key={row.title}>
          <Link
            href={row.href}
            className="group relative isolate grid grid-cols-[2.5rem_1fr] gap-x-4 py-10 sm:grid-cols-[3.5rem_1fr_auto] sm:py-12"
          >
            <span
              aria-hidden="true"
              className={`absolute inset-x-[-1.25rem] inset-y-2 -z-10 scale-[0.98] rounded-[20px] bg-card opacity-0 transition-all duration-500 ${EASE} group-hover:scale-100 group-hover:opacity-100`}
            />
            <span className="pt-2 text-[13px] text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-[clamp(1.8rem,3vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.03em]">
                {row.title}
              </h3>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-2">{row.body}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ul className="flex flex-wrap gap-2" aria-label="Includes">
                  {row.includes.map((item) => (
                    <li key={item} className="rounded-full px-3 py-1.5 text-[13px] text-ink-2 ring-1 ring-line ring-inset">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[14px] font-medium text-ink">{row.price}</p>
              </div>
            </div>
            <span
              className="hidden h-12 w-12 place-items-center rounded-full ring-1 ring-line transition-colors duration-500 group-hover:bg-ink group-hover:text-paper group-hover:ring-ink sm:grid"
              aria-hidden="true"
            >
              <Arrow className={`transition-transform duration-500 ${EASE} group-hover:rotate-45`} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
