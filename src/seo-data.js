const nodeSiteUrl = typeof process !== "undefined" ? process.env?.VITE_SITE_URL : undefined;
const browserSiteUrl = import.meta.env?.VITE_SITE_URL;

export const siteUrl = (browserSiteUrl || nodeSiteUrl || "https://montanoa-preview.vercel.app").replace(/\/$/, "");
export const socialImage = `${siteUrl}/assets/montanoa-coffee-hands-start-16x9.webp`;

export const isProductionSite = !new URL(siteUrl).hostname.endsWith(".vercel.app");
export const defaultRobots = isProductionSite
  ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  : "noindex, nofollow";

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

export function siteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Montanoa",
        description: "A family-run coffee farm, coffee academy and nature stay in San Luis, Monteverde, Costa Rica.",
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#business` },
      },
      {
        "@type": ["LocalBusiness", "TouristAttraction"],
        "@id": `${siteUrl}/#business`,
        name: "Montanoa",
        alternateName: "Montanoa Coffee & Village",
        description: "A family-run coffee farm, coffee academy and nature stay in San Luis, Monteverde, Costa Rica.",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/assets/brand/montanoa-logo-white.png`,
        image: socialImage,
        email: "coffee@montanoa.com",
        telephone: "+50683182105",
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Luis",
          addressRegion: "Puntarenas",
          addressCountry: "CR",
        },
        areaServed: {
          "@type": "Place",
          name: "Monteverde, Puntarenas, Costa Rica",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "visitor information",
          email: "coffee@montanoa.com",
          telephone: "+50683182105",
        },
        makesOffer: [
          { "@type": "Offer", url: `${siteUrl}/farm`, itemOffered: { "@type": "Service", name: "Coffee farm visit" } },
          { "@type": "Offer", url: `${siteUrl}/academy`, itemOffered: { "@type": "Service", name: "Coffee education and training" } },
          { "@type": "Offer", url: `${siteUrl}/stay`, itemOffered: { "@type": "Service", name: "Nature lodging" } },
        ],
        knowsAbout: [
          "Costa Rican specialty coffee",
          "coffee farming",
          "coffee processing",
          "barista education",
          "coffee tasting",
          "nature lodging",
        ],
      },
    ],
  };
}
