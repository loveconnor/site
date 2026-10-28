"use client";

import { useEffect, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import {
  CurtainView,
  expandWindow,
  heroRect,
  hideLabel,
  openWindow,
  panelMode,
  showLabel,
  uncoverPanel,
  windowMode,
} from "@/components/curtain";

const EVENT = "moirel:intro";
const STORAGE_KEY = "moirel-intro-seen";
const WORD = "Moirel";

const subscribe = (callback: () => void) => {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
};
const getSnapshot = () => {
  const state = document.documentElement.dataset.intro;
  return state === "leaving" || state === "done";
};

/** True once the intro curtain has started to lift (or was skipped). */
export function useIntroReady() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Page transitions hold headline reveals while their curtain covers the page. */
export function holdReveals() {
  document.documentElement.dataset.intro = "transition";
  window.dispatchEvent(new Event(EVENT));
}
export function releaseReveals() {
  finish("done");
}

function finish(state: "leaving" | "done") {
  document.documentElement.dataset.intro = state;
  window.dispatchEvent(new Event(EVENT));
}

// Runs before first paint: skip the curtain for the rest of the session.
const skipScript = `try{if(sessionStorage.getItem("${STORAGE_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="done"}catch(e){}`;

export function Intro() {
  useEffect(() => {
    if (document.documentElement.dataset.intro === "done") {
      window.dispatchEvent(new Event(EVENT));
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    const root = document.getElementById("intro");
    if (!root) return;
    // On the home page a window opens onto the hero and grows into it; elsewhere the ink lifts away.
    const tl = gsap.timeline({ delay: 0.2 });
    if (heroRect()) {
      windowMode(root);
      tl.add(openWindow(root))
        .add(showLabel(root), 0.35)
        .add(hideLabel(root), "+=0.5")
        .call(() => finish("leaving"), [], "-=0.3")
        .add(expandWindow(root), "-=0.45");
    } else {
      panelMode(root);
      tl.add(showLabel(root))
        .add(hideLabel(root), "+=0.4")
        .call(() => finish("leaving"), [], "-=0.2")
        .add(uncoverPanel(root), "-=0.35");
    }
    tl.call(() => finish("done"));
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <CurtainView id="intro" label={WORD} />
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: skipScript }}
      />
    </>
  );
}
