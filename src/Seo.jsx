import { useEffect } from "react";
import { canonicalUrl, defaultRobots, pageSeo, pageStructuredData, siteStructuredData, socialImage } from "./seo-data";

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function Seo({ pathname }) {
  useEffect(() => {
    const seo = pageSeo[pathname] ?? {
      title: "Page not found | Montanoa",
      description: "Return to Montanoa's coffee farm story in Monteverde, Costa Rica.",
    };
    const url = canonicalUrl(pathname);
    const indexable = Boolean(pageSeo[pathname]);

    document.title = seo.title;
    setMeta("name", "description", seo.description);
    setMeta("name", "robots", indexable ? defaultRobots : "noindex, follow");
    setMeta("name", "googlebot", indexable ? defaultRobots : "noindex, follow");
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", socialImage);
    setMeta("property", "og:image:alt", "Hands holding dried coffee cherries at Montanoa in Monteverde, Costa Rica");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", socialImage);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    let pageSchema = document.head.querySelector("#page-structured-data");
    if (!pageSchema) {
      pageSchema = document.createElement("script");
      pageSchema.id = "page-structured-data";
      pageSchema.type = "application/ld+json";
      document.head.appendChild(pageSchema);
    }
    pageSchema.textContent = JSON.stringify(pageStructuredData(pathname));

    const siteSchema = document.head.querySelector("#site-structured-data");
    if (siteSchema) siteSchema.textContent = JSON.stringify(siteStructuredData());
  }, [pathname]);

  return null;
}
