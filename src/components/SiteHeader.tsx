import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { NavLink, useLocation } from "react-router";
import { Go } from "@/components/links";
import { jumpTo } from "@/lib/nav";
import { GITHUB, LINKEDIN, MAILTO, RESUME, ROUTES } from "@/site";

const PRIMARY = [
  { to: ROUTES.work, label: "Work" },
  { to: ROUTES.experience, label: "Experience" },
  { to: ROUTES.about, label: "About" },
];

/** "Get in touch" scrolls to the contact band when the page has one, otherwise opens email. */
function onContactClick(e: MouseEvent<HTMLAnchorElement>) {
  if (document.getElementById("contact")) {
    e.preventDefault();
    jumpTo("contact");
  }
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Move focus into the menu when it opens.
  useEffect(() => {
    if (open) menuRef.current?.querySelector<HTMLElement>("a")?.focus();
  }, [open]);

  // Close the menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };

  // Esc closes; Tab cycles between the menu button and the menu's links.
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close(true);
      return;
    }
    if (e.key !== "Tab") return;
    const items = [
      buttonRef.current,
      ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
    ].filter(Boolean) as HTMLElement[];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <header className="site-header" onKeyDown={onKeyDown}>
      <nav aria-label="Primary" className="wrap site-nav">
        <Go to={ROUTES.home} className="brand" aria-label="Anurag Lnu, home">
          <span className="brand-name">Anurag Lnu</span>
          <span className="brand-tag">Software engineer · AI systems</span>
        </Go>

        <div className="nav-links">
          {PRIMARY.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link" viewTransition>
              {item.label}
            </NavLink>
          ))}
          <a className="nav-link" href={RESUME}>
            Résumé ↗
          </a>
          <a className="btn btn-ink btn-sm" href={MAILTO} onClick={onContactClick}>
            Get in touch
          </a>
        </div>

        <div className="nav-compact">
          <a className="resume-link" href={RESUME}>
            Résumé
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <div id="site-menu" ref={menuRef} className="site-menu">
          {PRIMARY.map((item) => (
            <NavLink key={item.to} to={item.to} className="row-link" viewTransition>
              {item.label} <span aria-hidden="true">→</span>
            </NavLink>
          ))}
          <a className="row-link" href={RESUME}>
            Résumé <span aria-hidden="true">↗</span>
          </a>
          <a
            className="btn btn-primary"
            href={MAILTO}
            onClick={(e) => {
              onContactClick(e);
              setOpen(false);
            }}
          >
            Get in touch
          </a>
          <div className="menu-socials">
            <a href={GITHUB}>GitHub</a>
            <a href={LINKEDIN}>LinkedIn</a>
            <a href={MAILTO}>Email</a>
          </div>
        </div>
      )}
    </header>
  );
}
