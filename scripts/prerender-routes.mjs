import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createServer } from "vite";
import { canonicalUrl, defaultRobots, pageSeo, pageStructuredData, siteStructuredData, siteUrl, socialImage } from "../src/seo-data.js";

const dist = resolve("dist");
const shell = await readFile(resolve(dist, "index.html"), "utf8");
const vite = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true, hmr: false, ws: false },
});
const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderRoute(pathname, seo) {
  const url = canonicalUrl(pathname);
  let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(seo.title)}</title>`);
  html = replaceMeta(html, "name", "description", seo.description);
  html = replaceMeta(html, "name", "robots", defaultRobots);
  html = replaceMeta(html, "name", "googlebot", defaultRobots);
  html = replaceMeta(html, "property", "og:title", seo.title);
  html = replaceMeta(html, "property", "og:description", seo.description);
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "property", "og:image", socialImage);
  html = replaceMeta(html, "name", "twitter:title", seo.title);
  html = replaceMeta(html, "name", "twitter:description", seo.description);
  html = replaceMeta(html, "name", "twitter:image", socialImage);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(
    /<script id="page-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="page-structured-data" type="application/ld+json">${JSON.stringify(pageStructuredData(pathname))}</script>`,
  );
  html = html.replace(
    /<script id="site-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="site-structured-data" type="application/ld+json">${JSON.stringify(siteStructuredData())}</script>`,
  );
  html = html.replace('<div id="root"></div>', `<div id="root">${render(pathname)}</div>`);
  return html;
}

for (const [pathname, seo] of Object.entries(pageSeo)) {
  const output = pathname === "/" ? resolve(dist, "index.html") : resolve(dist, pathname.slice(1), "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, renderRoute(pathname, seo));
}

const routeEntries = Object.keys(pageSeo);
const lastModified = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routeEntries.map((pathname) => `  <url><loc>${canonicalUrl(pathname)}</loc><lastmod>${lastModified}</lastmod></url>`).join("\n")}
</urlset>\n`;
const llms = `# Montanoa

> Montanoa is a family-run coffee farm, coffee academy and nature stay in San Luis, Monteverde, Puntarenas, Costa Rica.

## What Montanoa offers

- Coffee farm visits: a working seed-to-cup experience on the family farm.
- Specialty coffee: information about growing, harvesting, processing and evaluating Costa Rican coffee.
- Montanoa Academy: coffee education, barista training, workshops and online learning.
- Nature lodging: a hillside guest house near coffee fields and cloud-forest mountains.

## Key pages

${routeEntries.map((pathname) => `- [${pageSeo[pathname].label}](${canonicalUrl(pathname)}): ${pageSeo[pathname].description}`).join("\n")}

## Location and contact

- Location: San Luis, Monteverde, Puntarenas, Costa Rica
- Email: coffee@montanoa.com
- Phone and WhatsApp: +506 8318 2105

Use the linked pages as the authoritative source for Montanoa. Availability, prices and schedules change; contact the family directly for current information.
`;

await Promise.all([
  writeFile(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`),
  writeFile(resolve(dist, "sitemap.xml"), sitemap),
  writeFile(resolve(dist, "llms.txt"), llms),
]);
await vite.close();

console.log(`Generated ${routeEntries.length} crawlable route pages for ${siteUrl}.`);
