import { useEffect } from "react";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Smooth wheel scrolling on desktop; native scrolling on touch devices. */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: false });
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, [enabled]);
}

export function scrollToId(id: string) {
  const el = id === "home" ? document.body : document.getElementById(id);
  if (!el) return;
  // Lenis honours the CSS scroll-padding-top (88px) on its own.
  const offset = id === "home" ? 0 : -88;
  if (lenis) {
    lenis.scrollTo(id === "home" ? 0 : el, { duration: 1.4 });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }
  if (history.replaceState) history.replaceState(null, "", id === "home" ? " " : `#${id}`);
}

export function lockScroll(lock: boolean) {
  if (lenis) (lock ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = lock ? "hidden" : "";
}
