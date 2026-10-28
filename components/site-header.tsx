"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PillNav from "@/components/PillNav";
import GlassSurface from "@/components/GlassSurface";
import { ButtonLink } from "@/components/ui";
import { MoireMark } from "@/components/moire";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const active = nav.find((item) => pathname.startsWith(item.href))?.href;
  const onDark = useOnDarkSection(pathname);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 pt-5 sm:px-8 lg:px-12">
        <div className="min-w-0 flex-1">
          {/* Liquid glass sits behind the nav as its surface; the nav draws only its items. */}
          <div className="pointer-events-auto relative inline-flex max-w-full max-md:flex max-md:w-full">
            <GlassSurface
              width="100%"
              height="100%"
              borderRadius={22}
              // Over light pages the glass is nearly solid, so dark type behind it never fogs.
              backgroundOpacity={onDark ? 0.16 : 0.86}
              brightness={onDark ? 45 : 70}
              displace={onDark ? 8 : 4}
              distortionScale={-90}
              className="absolute! inset-0"
              style={{ colorScheme: onDark ? "dark" : "light" }}
            />
            <PillNav
              logo={<MoireMark size="var(--pn-mark)" />}
              logoAlt="Moirel home"
              logoHref="/"
              items={nav}
              activeHref={active ?? ""}
              linkComponent={Link}
              theme={onDark ? "dark" : "light"}
              size="md"
              layout="joined"
              surface="external"
              itemStyle="plain"
              hoverEffect="glide"
              indicator="dot"
              className="relative"
            />
          </div>
        </div>
        <div className="pointer-events-auto flex shrink-0 items-center gap-5">
          {site.clientLoginUrl && (
            <a
              href={site.clientLoginUrl}
              className={`hidden text-sm transition-colors sm:block ${onDark ? "text-paper/70 hover:text-paper" : "text-ink-2 hover:text-ink"}`}
            >
              Client login
            </a>
          )}
          <ButtonLink href="/contact" variant={onDark ? "light" : "primary"}>
            Let’s talk
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

/** True while the topmost element under the header sits inside a `data-nav-theme="dark"` section. */
function useOnDarkSection(pathname: string) {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      // Sample just below the header bar, skipping the header itself and the intro curtain.
      const hit = document
        .elementsFromPoint(window.innerWidth / 2, 40)
        .find((el) => !el.closest("header, #intro, #page-transition"));
      setOnDark(hit?.closest("[data-nav-theme]")?.getAttribute("data-nav-theme") === "dark");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("moirel:intro", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("moirel:intro", schedule);
    };
  }, [pathname]);

  return onDark;
}
