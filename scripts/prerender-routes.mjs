import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { canonicalUrl, defaultRobots, pageSeo, pageStructuredData, socialImage } from "../src/seo-data.js";

const dist = resolve("dist");
const shell = await readFile(resolve(dist, "index.html"), "utf8");

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
  return html;
}

for (const [pathname, seo] of Object.entries(pageSeo)) {
  const output = pathname === "/" ? resolve(dist, "index.html") : resolve(dist, pathname.slice(1), "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, renderRoute(pathname, seo));
}

console.log(`Generated ${Object.keys(pageSeo).length} crawlable route shells.`);
