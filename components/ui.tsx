import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import Magnet from "@/components/Magnet";
import BlurText from "@/components/BlurText";
import FadeContent from "@/components/FadeContent";
import { Headline } from "@/components/headline";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const variants = {
  primary: { root: "bg-ink text-paper", fill: "bg-accent", hoverText: "" },
  light: { root: "bg-paper text-ink", fill: "bg-accent", hoverText: "hover:text-paper" },
  secondary: {
    root: "text-ink ring-1 ring-ink/15 ring-inset",
    fill: "bg-ink",
    hoverText: "hover:text-paper",
  },
};

/**
 * Pill link: the label rolls to a copy, a fill rises from below with a soft curved
 * edge, and the arrow swaps diagonally. "ghost" is a text link with a drawn underline.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  magnetic?: boolean;
}) {
  const external = href.startsWith("http");
  const linkProps = external ? { target: "_blank", rel: "noreferrer" } : {};

  if (variant === "ghost") {
    return (
      <Link href={href} className="group/button relative inline-flex items-center gap-2 py-1 text-[15px] font-medium" {...linkProps}>
        {children}
        <Arrow className={`transition-transform duration-500 ${EASE} group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5`} />
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ${EASE} group-hover/button:scale-x-100`}
        />
      </Link>
    );
  }

  const v = variants[variant];
  const link = (
    <Link href={href} className={pillClass(variant)} {...linkProps}>
      <PillContent fill={v.fill}>{children}</PillContent>
    </Link>
  );
  if (!magnetic) return link;
  return (
    <Magnet padding={40} magnetStrength={4} maxOffset={8}>
      {link}
    </Magnet>
  );
}

function pillClass(variant: keyof typeof variants) {
  const v = variants[variant];
  return `group/button relative isolate inline-flex h-12 items-center gap-3 overflow-hidden rounded-full px-6 text-[15px] font-medium transition-colors duration-500 ${v.root} ${v.hoverText}`;
}

function PillContent({ fill, children }: { fill: string; children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 -z-10 h-[140%] translate-y-full rounded-t-[50%] transition-[translate,border-radius] duration-700 ${EASE} group-hover/button:translate-y-0 group-hover/button:rounded-t-none ${fill}`}
      />
      <span className="relative block h-[1.25em] overflow-hidden leading-[1.25]">
        <span className={`block transition-transform duration-500 ${EASE} group-hover/button:-translate-y-full`}>
          {children}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-0 block translate-y-full transition-transform duration-500 ${EASE} group-hover/button:translate-y-0`}
        >
          {children}
        </span>
      </span>
      <span className="relative grid h-3.5 w-3.5 place-items-center overflow-hidden">
        <Arrow className={`transition-transform duration-500 ${EASE} group-hover/button:translate-x-4 group-hover/button:-translate-y-4`} />
        <Arrow
          className={`absolute -translate-x-4 translate-y-4 transition-transform duration-500 ${EASE} group-hover/button:translate-x-0 group-hover/button:translate-y-0`}
        />
      </span>
    </>
  );
}

/** The pill button as a <button>, for forms. Same hover as ButtonLink. */
export function PillButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return (
    <button className={`${pillClass(variant)} disabled:cursor-progress disabled:opacity-80 ${className}`} {...props}>
      <PillContent fill={variants[variant].fill}>{children}</PillContent>
    </button>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <p className="flex items-baseline gap-3 text-[13px] font-medium text-ink-2">
      {index && <span className="text-ink-3 tabular-nums">{index}</span>}
      {children}
    </p>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

/** Editorial section header: a hairline index row, then the headline. Use *word* for serif emphasis. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  aside,
  className = "",
  size = "lg",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  aside?: ReactNode;
  className?: string;
  size?: "lg" | "md";
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <div className="flex items-center justify-between gap-6">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          {aside}
        </div>
      )}
      <Headline
        text={title}
        className={`mt-10 max-w-5xl font-medium text-balance ${
          size === "lg"
            ? "text-[clamp(2.2rem,4.6vw,4.25rem)] leading-[1] tracking-[-0.032em]"
            : "text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.04] tracking-[-0.028em]"
        }`}
      />
      {intro && (
        <FadeContent blur duration={0.9} delay={0.15}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">{intro}</p>
        </FadeContent>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  index,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  index?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="pt-36 pb-16 sm:pt-44 sm:pb-24">
      <Container>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <Headline
          as="h1"
          afterIntro
          text={title}
          className="mt-8 max-w-6xl text-[clamp(2.5rem,6.4vw,6.25rem)] leading-[0.96] font-medium tracking-[-0.035em] text-balance"
        />
        {intro && (
          <BlurText
            text={intro}
            animateBy="words"
            delay={14}
            trigger="load"
            className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl"
          />
        )}
        {children}
      </Container>
    </section>
  );
}
