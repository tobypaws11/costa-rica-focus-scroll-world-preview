export const siteUrl = "https://montanoa.com";
export const socialImage = `${siteUrl}/assets/montanoa-coffee-hands-start-16x9.webp`;

export const defaultRobots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const pageSeo = {
  "/": {
    title: "Montanoa | Coffee Farm, Academy & Stay in Monteverde",
    description: "Visit Montanoa, a family-run coffee farm in San Luis, Monteverde, Costa Rica. Explore farm tours, specialty coffee education and nature lodging.",
    label: "Home",
  },
  "/about": {
    title: "Our Family Story | Montanoa Coffee Farm",
    description: "Meet the Leitón family and discover how Montanoa grew from a windswept cattle pasture into a biodiverse coffee farm in Monteverde.",
    label: "Our story",
  },
  "/farm": {
    title: "Coffee Farm Tour in Monteverde | Montanoa",
    description: "Walk Montanoa's working coffee farm in San Luis, Monteverde, and follow the seed-to-cup process from shade-grown cherries to the finished cup.",
    label: "The farm",
  },
  "/coffee": {
    title: "Costa Rican Specialty Coffee | Montanoa",
    description: "Learn how Montanoa grows, harvests, processes and evaluates specialty coffee on a family farm below the Monteverde Cloud Forest.",
    label: "Specialty coffee",
  },
  "/academy": {
    title: "Coffee Academy & Barista Training | Montanoa",
    description: "Explore Montanoa Academy's coffee education, barista training, workshops and online learning rooted in a working Costa Rican coffee farm.",
    label: "Coffee Academy",
  },
  "/stay": {
    title: "Nature Lodging in Monteverde | Montanoa",
    description: "Stay at Montanoa's hillside guest house in San Luis, Monteverde, surrounded by coffee fields, tropical birds and cloud-forest mountains.",
    label: "Nature lodging",
  },
  "/visit": {
    title: "Plan Your Montanoa Visit | Monteverde, Costa Rica",
    description: "Plan a Montanoa farm tour, Academy session or nature stay in San Luis, Monteverde. Find direct phone, email and WhatsApp contact details.",
    label: "Plan a visit",
  },
};

export function canonicalUrl(pathname = "/") {
  return pathname === "/" ? `${siteUrl}/` : `${siteUrl}${pathname}`;
}

export function pageStructuredData(pathname = "/") {
  const seo = pageSeo[pathname] ?? {
    title: "Page not found | Montanoa",
    description: "Return to Montanoa's coffee farm story in Monteverde, Costa Rica.",
    label: "Page not found",
  };
  const url = canonicalUrl(pathname);
  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#business` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: socialImage,
    },
  };

  if (pathname !== "/" && pageSeo[pathname]) {
    page.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Montanoa",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seo.label,
          item: url,
        },
      ],
    };
  }

  return page;
}
