import Link from "next/link";
import SplitText from "@/components/SplitText";
import { MoireMark } from "@/components/moire";
import { Container } from "@/components/ui";
import { LocalTime } from "@/components/local-time";
import { CurrentYear } from "@/components/current-year";
import { nav, site } from "@/lib/site";

const linkClass = "w-fit text-ink-2 transition-colors hover:text-ink";

/** Sits beneath the page and is revealed as the content scrolls away. */
export function SiteFooter() {
  return (
    <footer className="sticky bottom-0 z-0 overflow-hidden bg-paper-2">
      <Container className="grid gap-12 pt-20 pb-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <MoireMark size={30} />
            <span className="text-lg font-medium tracking-[-0.02em]">{site.legalName}</span>
          </div>
          <p className="mt-6 max-w-xs text-2xl leading-snug font-medium tracking-[-0.02em] text-ink">{site.signature}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-2">
            Independent design and development by {site.founder}. Based in {site.location}. Working remotely.
          </p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-3 text-sm">
          <p className="mb-2 text-[13px] text-ink-3 font-medium">Studio</p>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={linkClass}>
            Let’s talk
          </Link>
        </nav>
        <div className="grid content-start gap-3 text-sm">
          <p className="mb-2 text-[13px] text-ink-3 font-medium">Elsewhere</p>
          <a href={`mailto:${site.email}`} className={linkClass}>
            Email
          </a>
          <a href={site.githubUrl} className={linkClass} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={site.portfolioUrl} className={linkClass} target="_blank" rel="noreferrer">
            connorlove.com
          </a>
          <a href={site.bookingUrl} className={linkClass} target="_blank" rel="noreferrer">
            Book a call
          </a>
        </div>
        <div className="grid content-start gap-3 text-sm">
          <p className="mb-2 text-[13px] text-ink-3 font-medium">Info</p>
          {site.clientLoginUrl && (
            <a href={site.clientLoginUrl} className={linkClass}>
              Client login
            </a>
          )}
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
          <Link href="/terms" className={linkClass}>
            Service terms
          </Link>
          <p className="text-ink-2">
            Columbus · <LocalTime />
          </p>
        </div>
      </Container>

      <div className="select-none" aria-hidden="true">
        <SplitText
          text="Moirel"
          tag="p"
          splitType="chars"
          textAlign="center"
          delay={60}
          duration={1.1}
          rootMargin="0px"
          className="block w-full pt-[0.04em] text-[27vw] leading-[1] font-medium tracking-[-0.055em] text-ink"
        />
      </div>

      <Container className="flex flex-col gap-2 border-t border-ink/10 py-5 text-xs text-ink-3 sm:flex-row sm:justify-between">
        <p>
          © <CurrentYear /> {site.legalName}
        </p>
        <p>{site.signature}</p>
      </Container>
    </footer>
  );
}
