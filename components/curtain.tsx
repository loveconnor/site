import { gsap } from "gsap";
import { MoireMark } from "@/components/moire";

const INK = "#161513";

// Curved edges as border-radius strings with matching units, so GSAP can interpolate them.
const FLAT = "0% 0% 0% 0% / 0vh 0vh 0vh 0vh";
const CURVED_TOP = "50% 50% 0% 0% / 14vh 14vh 0vh 0vh";
const CURVED_BOTTOM = "0% 0% 50% 50% / 0vh 0vh 14vh 14vh";

/**
 * The shared curtain behind the intro and page transitions. Two ways to cover the page:
 * - a panel of ink that rises with a curved leading edge (like the buttons' hover fill), used
 *   for page transitions and for a first visit to an inner page;
 * - a rounded window cut out of the ink (a transparent box whose huge shadow is the ink),
 *   used for a first visit to the home page, where it opens onto the hero and grows past it.
 * A name rises in the lower left. Markup only; the timelines below animate it.
 */
export function CurtainView({ id, label, idle = false }: { id: string; label: string; idle?: boolean }) {
  return (
    <div
      id={id}
      aria-hidden="true"
      className="fixed inset-0 z-[100] overflow-hidden text-paper"
      style={idle ? { visibility: "hidden" } : undefined}
    >
      <div data-c="panel" className="absolute inset-0" style={{ background: INK, borderRadius: FLAT }} />
      <div
        data-c="window"
        className="absolute"
        style={{ left: "50%", top: "50%", width: 0, height: 0, borderRadius: 16, boxShadow: `0 0 0 200vmax ${INK}` }}
      />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[13px] font-medium sm:inset-x-8 sm:top-7">
        <span data-c="meta" className="flex items-center gap-2.5" style={{ opacity: 0 }}>
          <MoireMark size={14} inverted />
          Moirel Studio
        </span>
        <span data-c="meta" className="hidden text-paper/50 sm:inline" style={{ opacity: 0 }}>
          Independent design and development
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6 sm:inset-x-8 sm:bottom-7">
        {/* Generous padding (pulled back with margins) keeps descenders and the last letter inside the mask. */}
        <span className="-mx-[0.12em] -my-[0.2em] block overflow-hidden px-[0.12em] py-[0.2em] text-[clamp(2.75rem,8vw,7.5rem)] leading-[1]">
          <span className="font-wide block font-medium tracking-[-0.045em] whitespace-nowrap">
            {label.split("").map((letter, i) => (
              <span key={i} data-c="letter" className="inline-block" style={{ transform: "translateY(115%)" }}>
                {letter === " " ? " " : letter}
              </span>
            ))}
          </span>
        </span>
        <span data-c="meta" className="hidden pb-[0.6em] text-[13px] font-medium text-paper/50 sm:inline" style={{ opacity: 0 }}>
          Columbus, Ohio
        </span>
      </div>
    </div>
  );
}

const q = (root: Element, key: string) => root.querySelectorAll(`[data-c="${key}"]`);

/** The home hero panel, if it is on screen. Next keeps the previous route mounted but hidden, so only a visible one counts. */
export function heroRect() {
  const rect = [...document.querySelectorAll("#hero-frame")]
    .map((hero) => hero.getBoundingClientRect())
    .find((r) => r.width > 0 && r.height > 0);
  return rect && rect.top >= 0 && rect.top < 40 ? rect : undefined;
}

/* Panel: page transitions and inner-page intros. */

/** Cover with the panel and set the window aside. */
export function panelMode(root: Element) {
  gsap.set(q(root, "window"), { display: "none" });
  gsap.set(q(root, "panel"), { display: "block" });
}

/** The panel rises from below; its curved top edge flattens as it covers the page. */
export function coverPanel(root: Element) {
  return gsap.fromTo(
    q(root, "panel"),
    { yPercent: 100, borderRadius: CURVED_TOP },
    { yPercent: 0, borderRadius: FLAT, duration: 0.9, ease: "expo.inOut" },
  );
}

/** The panel carries on upward and leaves through the top, its bottom edge curving away. */
export function uncoverPanel(root: Element) {
  return gsap.fromTo(
    q(root, "panel"),
    { yPercent: 0, borderRadius: FLAT },
    { yPercent: -100, borderRadius: CURVED_BOTTOM, duration: 1.05, ease: "expo.inOut" },
  );
}

/* Window: the first visit to the home page. */

type Box = { left: number; top: number; width: number; height: number; borderRadius: number };

/** Cover with the window and set the panel aside. */
export function windowMode(root: Element) {
  gsap.set(q(root, "panel"), { display: "none" });
  gsap.set(q(root, "window"), { display: "block" });
}

function smallBox(): Box {
  const width = Math.min(Math.max(window.innerWidth * 0.3, 220), 380);
  const height = Math.round(width * 0.64);
  return { left: (window.innerWidth - width) / 2, top: (window.innerHeight - height) / 2 - 24, width, height, borderRadius: 16 };
}

/** The window opens from a point into a small glimpse of the hero. */
export function openWindow(root: Element) {
  const small = smallBox();
  return gsap.fromTo(
    q(root, "window"),
    { left: window.innerWidth / 2, top: small.top + small.height / 2, width: 0, height: 0, borderRadius: 16 },
    { ...small, duration: 1, ease: "expo.inOut" },
  );
}

/**
 * The window grows past the hero panel to the full screen, so the page's margin and the
 * panel's rounded corners are revealed by the motion itself rather than appearing at the end.
 */
export function expandWindow(root: Element) {
  return gsap.to(q(root, "window"), {
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    borderRadius: 0,
    duration: 1.25,
    ease: "expo.inOut",
  });
}

/* Label: shared. */

/** The name rises letter by letter and the small details fade in. */
export function showLabel(root: Element) {
  return gsap
    .timeline()
    .fromTo(q(root, "letter"), { y: 0, yPercent: 115 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.035 }, 0)
    .fromTo(q(root, "meta"), { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.08 }, 0.15);
}

/** The name lifts out of view and the details fade. */
export function hideLabel(root: Element) {
  return gsap
    .timeline()
    .to(q(root, "letter"), { yPercent: -115, duration: 0.6, ease: "power3.in", stagger: 0.02 }, 0)
    .to(q(root, "meta"), { opacity: 0, duration: 0.4, ease: "power1.in" }, 0);
}
