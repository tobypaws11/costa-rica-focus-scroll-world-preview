import { useEffect, useState } from "react";

const normalizePath = (path) => {
  if (!path || path === "/") return "/";
  return `/${path.split("?")[0].split("#")[0].replace(/^\/+|\/+$/g, "")}`;
};

export function usePathname() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const update = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return pathname;
}

export function Link({ to, onClick, children, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || props.target === "_blank"
    ) return;

    event.preventDefault();
    const next = normalizePath(to);
    if (next !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, "", next);
      window.dispatchEvent(new Event("popstate"));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return <a href={to} onClick={handleClick} {...props}>{children}</a>;
}
