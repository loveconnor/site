"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { scrollToTarget } from "@/components/smooth-scroll";

const sections = [
  { value: "projects", label: "Projects" },
  { value: "studio-monthly", label: "Studio Monthly" },
  { value: "site-care", label: "Site Care" },
  { value: "faq", label: "FAQ" },
];

/** Glass jump nav, styled like the header pill: a soft highlight glides to the section on screen. */
export function PricingNav() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(sections[0].value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(({ value }) => {
      const element = document.getElementById(value);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none sticky top-24 z-30 flex justify-center px-5 py-4">
      <nav
        aria-label="Jump to pricing section"
        className="pointer-events-auto max-w-full overflow-x-auto rounded-full bg-card/80 p-1 ring-1 ring-ink/5 backdrop-blur-xl [scrollbar-width:none]"
      >
        <ul className="flex">
          {sections.map(({ value, label }) => {
            const current = value === active;
            return (
              <li key={value}>
                <a
                  href={`#${value}`}
                  aria-current={current ? "location" : undefined}
                  onClick={(event) => {
                    const target = document.getElementById(value);
                    if (!target) return;
                    event.preventDefault();
                    setActive(value);
                    scrollToTarget(target, -150);
                  }}
                  className={`relative isolate block rounded-full px-2.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 sm:px-5 sm:text-[14px] ${
                    current ? "text-ink" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  {current && (
                    <motion.span
                      layoutId="pricing-nav-highlight"
                      className="absolute inset-0 -z-10 rounded-full bg-paper-2 ring-1 ring-ink/5"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
