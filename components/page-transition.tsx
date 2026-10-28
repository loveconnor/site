"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { CurtainView, coverPanel, hideLabel, panelMode, showLabel, uncoverPanel } from "@/components/curtain";
import { holdReveals, releaseReveals } from "@/components/intro";
import { projects } from "@/lib/work";

const ID = "page-transition";

const titles: Record<string, string> = {
  "/": "Moirel",
  "/work": "Work",
  "/services": "Services",
  "/pricing": "Pricing",
  "/studio": "Studio",
  "/contact": "Let’s talk",
  "/privacy": "Privacy",
  "/terms": "Terms",
};

function titleFor(pathname: string) {
  if (titles[pathname]) return titles[pathname];
  const slug = pathname.match(/^\/work\/([^/]+)/)?.[1];
  return projects.find((project) => project.slug === slug)?.name ?? "Moirel";
}

/**
 * Route transition on the intro's curtain: on an internal link click an ink panel rises over
 * the page with the destination's name, the route changes behind it, and the panel carries
 * on upward to reveal the new page.
 * Browser back/forward and reduced motion navigate normally.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [label, setLabel] = useState("");
  const [href, setHref] = useState<string | null>(null);
  const target = useRef<string | null>(null);
  const covered = useRef(false);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      event.preventDefault();
      // Ignore further clicks while a transition is already running.
      if (target.current) return;
      target.current = url.pathname;
      setLabel(titleFor(url.pathname));
      setHref(url.pathname + url.search + url.hash);
    };
    // Capture phase, so this runs before Next's Link handler, which respects defaultPrevented.
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  // Once the destination's name has rendered: close the curtain, then navigate behind it.
  useLayoutEffect(() => {
    const root = document.getElementById(ID);
    if (!href || !root) return;
    panelMode(root);
    gsap.set(root, { visibility: "visible" });
    timeline.current = gsap
      .timeline()
      .add(coverPanel(root))
      .add(showLabel(root), 0.45)
      .call(
        () => {
          covered.current = true;
          holdReveals();
          router.push(href);
        },
        [],
        1.25,
      );
    return () => {
      timeline.current?.kill();
    };
  }, [href, router]);

  // The new route has rendered behind the panel: clear the name and lift the panel away.
  useEffect(() => {
    const root = document.getElementById(ID);
    if (!root || !covered.current || pathname !== target.current) return;
    covered.current = false;
    // Started after a short pause so the new page has scrolled to the top and laid out.
    let tl: gsap.core.Timeline | undefined;
    const start = gsap.delayedCall(0.2, () => {
      tl = gsap
        .timeline()
        .add(hideLabel(root))
        .add(uncoverPanel(root), 0.3)
        .call(releaseReveals, [], 0.7)
        .call(() => {
          gsap.set(root, { visibility: "hidden" });
          target.current = null;
          setHref(null);
        });
    });
    return () => {
      start.kill();
      tl?.progress(1).kill();
    };
  }, [pathname]);

  // Never leave the curtain down if navigation stalls.
  useEffect(() => {
    if (!href) return;
    const id = window.setTimeout(() => {
      const root = document.getElementById(ID);
      if (!root || !target.current) return;
      timeline.current?.kill();
      gsap.set(root, { visibility: "hidden" });
      releaseReveals();
      target.current = null;
      covered.current = false;
      setHref(null);
    }, 8000);
    return () => window.clearTimeout(id);
  }, [href]);

  return <CurtainView id={ID} label={label} idle />;
}
