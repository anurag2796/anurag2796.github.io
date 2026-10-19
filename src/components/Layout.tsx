import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JumpLink } from "@/components/links";
import { jumpTo } from "@/lib/nav";

type NavState = { scrollTo?: string } | null;

/** Resets scroll and focus on route changes so keyboard and screen-reader users land on the new page. */
function useRouteFocus(mainRef: React.RefObject<HTMLElement | null>) {
  const location = useLocation();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const state = location.state as NavState;
    const isFirst = prevPath.current === null;
    const pathChanged = prevPath.current !== location.pathname;
    prevPath.current = location.pathname;

    if (state?.scrollTo) {
      requestAnimationFrame(() => jumpTo(state.scrollTo!));
      return;
    }
    // Query-string changes (e.g. Work filters) keep scroll and focus where they are.
    if (isFirst || !pathChanged) return;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps
}

export function Layout() {
  const mainRef = useRef<HTMLElement>(null);
  useRouteFocus(mainRef);

  return (
    <>
      <JumpLink to="main" className="skip">
        Skip to content
      </JumpLink>
      <SiteHeader />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
