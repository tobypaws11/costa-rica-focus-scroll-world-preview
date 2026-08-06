import { useEffect, useState } from "react";
import { Link } from "./router";

export const navItems = [
  { to: "/about", label: "Story" },
  { to: "/farm", label: "Farm" },
  { to: "/coffee", label: "Coffee" },
  { to: "/academy", label: "Academy" },
  { to: "/stay", label: "Stay" },
];

export function ArrowUpRight() {
  return (
    <svg className="arrow-up-right" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <Link className="wordmark" to="/" aria-label="Montanoa home">
      <img src="/assets/brand/montanoa-logo-white.png" alt="Montanoa — In coffea veritas" />
    </Link>
  );
}

export function SiteHeader({ overlay = false, pathname = "/" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className={`site-header ${overlay ? "is-overlay" : "is-page"}`}>
      <a className="skip-link" href={overlay ? "#home-story" : "#main-content"}>Skip to content</a>
      <Wordmark />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            aria-current={pathname === item.to ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="visit-link" to="/visit" aria-current={pathname === "/visit" ? "page" : undefined}>
        Plan a visit <ArrowUpRight />
      </Link>
      <button
        className={`menu-toggle ${open ? "is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <i aria-hidden="true"><b /><b /></i>
      </button>
      <nav id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            aria-current={pathname === item.to ? "page" : undefined}
          >
            <span>{item.label}</span><ArrowUpRight />
          </Link>
        ))}
        <Link className="mobile-visit" to="/visit">Plan a visit <ArrowUpRight /></Link>
        <div className="mobile-contact">
          <a href="mailto:coffee@montanoa.com">coffee@montanoa.com</a>
          <span>San Luis, Monteverde</span>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Wordmark />
      <nav aria-label="Footer navigation">
        {navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
        <Link to="/visit">Visit</Link>
      </nav>
      <div>
        <a href="mailto:coffee@montanoa.com">coffee@montanoa.com</a>
        <a href="tel:+50683182105">+506 8318 2105</a>
        <span>San Luis, Monteverde<br />Puntarenas, Costa Rica</span>
      </div>
    </footer>
  );
}
