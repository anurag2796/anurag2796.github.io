import { useEffect } from "react";

const BASE_TITLE = "Anurag Lnu";

/** Sets the document title for the current page. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE_TITLE}` : `${BASE_TITLE} · Software engineer, AI systems`;
  }, [title]);
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scrolls to an element on the current page and moves keyboard focus to it.
 * Used instead of `href="#id"` because the hash is owned by the router.
 * Returns false when the element does not exist.
 */
export function jumpTo(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  el.focus({ preventScroll: true });
  return true;
}
