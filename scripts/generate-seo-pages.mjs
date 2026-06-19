import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const publicDir = resolve(root, 'public');
const sourcePath = resolve(root, 'src/data/seo-pages.json');
const pages = JSON.parse(await readFile(sourcePath, 'utf8'));
const siteUrl = 'https://hvgamingsystems.com.au';
const siteName = 'High Voltage Gaming Systems';
const siteEmail = 'info@hvgamingsystems.com.au';
const lastmod = new Date().toISOString().slice(0, 10);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function cleanGenerated(value) {
  return value.replace(/[ \t]+$/gm, '');
}

function listItems(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n');
}

function optionalAreaGroups(page) {
  if (!page.areaGroups?.length) return '';

  return `<section class="grid three" aria-label="Regional coverage">
          ${page.areaGroups
            .map(
              (group) => `<article class="card">
            <h3>${escapeHtml(group.title)}</h3>
            <ul>${listItems(group.areas)}</ul>
          </article>`,
            )
            .join('\n')}
        </section>`;
}

function optionalVenueExamples(page) {
  if (!page.venueExamples?.length) return '';

  return `<section class="card" aria-label="Venue examples">
          <h2>Venue experience</h2>
          <p>Examples include regional hotels, pubs, resorts and hospitality venues where amusement equipment, pool tables or games-room attractions are part of the venue experience.</p>
          <div class="links">${page.venueExamples.map((venue) => `<span>${escapeHtml(venue)}</span>`).join('\n')}</div>
        </section>`;
}

function optionalSearchTerms(page) {
  if (!page.alternateTerms?.length) return '';

  return `<section class="card" aria-label="Common search terms">
          <h2>Common ways venues search for this</h2>
          <p>Venue operators use different language for the same commercial equipment. High Voltage Gaming Systems can help when the enquiry is about arcade machines, commercial game machines, arcade games, prize machines or a broader games-room setup for a pub, club, resort or accommodation venue.</p>
          <div class="links">${page.alternateTerms.map((term) => `<span>${escapeHtml(term)}</span>`).join('\n')}</div>
        </section>`;
}

function landingLinks(currentSlug) {
  return pages
    .filter((page) => page.slug !== currentSlug)
    .map((page) => `<a href="/${page.slug}/">${escapeHtml(page.shortTitle)}</a>`)
    .join('\n');
}

function jsonLdFor(page) {
  const pageUrl = `${siteUrl}/${page.slug}/`;
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: siteName,
          url: `${siteUrl}/`,
          email: siteEmail,
          logo: `${siteUrl}/assets/hv/logo-primary.png`,
          areaServed: ['Albury-Wodonga', 'Murray region', 'Riverina region'],
        },
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: page.metaTitle,
          description: page.metaDescription,
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${pageUrl}#service` },
          inLanguage: 'en-AU',
        },
        {
          '@type': 'Service',
          '@id': `${pageUrl}#service`,
          name: page.title,
          description: page.intro,
          provider: { '@id': `${siteUrl}/#organization` },
          serviceType: page.shortTitle,
          ...(page.alternateTerms?.length ? { alternateName: page.alternateTerms } : {}),
          areaServed: page.primaryAreas.map((name) => ({ '@type': 'Place', name })),
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${page.shortTitle} services`,
            itemListElement: page.services.map((service) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service,
              },
            })),
          },
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: page.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${siteUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: page.title,
              item: pageUrl,
            },
          ],
        },
      ],
    },
    null,
    2,
  );
}

function pageTemplate(page) {
  const pageUrl = `${siteUrl}/${page.slug}/`;
  const title = escapeHtml(page.title);
  const links = landingLinks(page.slug);

  return `<!doctype html>
<html lang="en-AU">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.metaTitle)}</title>
    <meta name="description" content="${escapeHtml(page.metaDescription)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_AU" />
    <meta property="og:title" content="${escapeHtml(page.metaTitle)}" />
    <meta property="og:description" content="${escapeHtml(page.metaDescription)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${siteUrl}${page.image}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.metaTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(page.metaDescription)}" />
    <meta name="twitter:image" content="${siteUrl}${page.image}" />
    <link rel="icon" type="image/png" sizes="96x96" href="/google-favicon.png" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <script type="application/ld+json">${jsonLdFor(page)}</script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;600;700&display=swap');
      :root { color-scheme: dark; --pink: #ff0092; --cyan: #4bd6ff; --violet: #8e28de; --ink: #05060a; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #05060a; color: #fff; font-family: "Open Sans", Helvetica, Arial, sans-serif; }
      a { color: inherit; }
      img { display: block; max-width: 100%; }
      .page { min-height: 100vh; background:
        linear-gradient(180deg, rgba(5,6,10,0.48), rgba(5,6,10,0.96) 54%, #05060a),
        radial-gradient(circle at 12% 18%, rgba(255,0,146,0.18), transparent 30%),
        radial-gradient(circle at 86% 12%, rgba(75,214,255,0.16), transparent 28%),
        #05060a; }
      .wrap { width: min(1120px, calc(100% - 40px)); margin: 0 auto; }
      .nav { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 22px 0; }
      .logo { height: 48px; width: auto; }
      .nav-links { display: flex; flex-wrap: wrap; gap: 18px; color: rgba(255,255,255,0.72); font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      .nav-links a { text-decoration: none; }
      .hero { display: grid; gap: 36px; align-items: center; padding: 56px 0 44px; }
      .eyebrow { display: inline-flex; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; padding: 8px 13px; color: #ff9ad4; font-size: 11px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; background: rgba(255,255,255,.07); }
      h1, h2, h3 { font-family: "Bebas Neue", Impact, sans-serif; letter-spacing: .06em; text-transform: uppercase; }
      h1 { max-width: 840px; margin: 20px 0 0; font-size: clamp(3.4rem, 8vw, 6.8rem); line-height: .9; }
      .lead { max-width: 760px; margin: 22px 0 0; color: rgba(241,245,249,.88); font-size: 19px; line-height: 1.7; }
      .actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
      .button { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; border: 1px solid var(--pink); background: var(--pink); padding: 14px 20px; color: #fff; font-size: 13px; font-weight: 700; letter-spacing: .14em; text-decoration: none; text-transform: uppercase; box-shadow: 0 0 36px rgba(255,0,146,.28); }
      .button.secondary { border-color: rgba(142,40,222,.48); background: rgba(142,40,222,.18); }
      .hero-img { overflow: hidden; border: 1px solid rgba(255,255,255,.14); border-radius: 28px; background: rgba(255,255,255,.05); box-shadow: 0 24px 90px rgba(0,0,0,.38); }
      .hero-img img { width: 100%; height: min(56vw, 520px); object-fit: cover; }
      section { padding: 34px 0; }
      .grid { display: grid; gap: 18px; }
      .three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .card { border: 1px solid rgba(255,255,255,.13); border-radius: 24px; background: linear-gradient(180deg, rgba(24,29,43,.82), rgba(8,11,18,.96)); padding: 24px; box-shadow: 0 18px 70px rgba(0,0,0,.28); }
      h2 { margin: 0 0 18px; font-size: clamp(2.4rem, 5vw, 4rem); line-height: .95; }
      h3 { margin: 0 0 12px; font-size: 2rem; line-height: 1; }
      p, li { color: rgba(226,232,240,.88); line-height: 1.72; }
      ul { margin: 0; padding-left: 1.2rem; }
      li + li { margin-top: 8px; }
      .links { display: flex; flex-wrap: wrap; gap: 10px; }
      .links a, .links span { border: 1px solid rgba(75,214,255,.24); border-radius: 999px; background: rgba(75,214,255,.09); padding: 10px 13px; color: #d9f8ff; font-size: 13px; font-weight: 700; text-decoration: none; }
      footer { border-top: 1px solid rgba(255,255,255,.08); margin-top: 44px; padding: 28px 0 34px; color: rgba(148,163,184,.9); font-size: 13px; }
      @media (min-width: 920px) { .hero { grid-template-columns: 1.03fr .97fr; padding: 76px 0 56px; } }
      @media (max-width: 780px) { .nav { align-items: flex-start; flex-direction: column; } .three, .two { grid-template-columns: 1fr; } .wrap { width: min(100% - 28px, 1120px); } }
    </style>
  </head>
  <body>
    <div class="page">
      <header class="wrap nav">
        <a href="/#home" aria-label="${siteName} home"><img class="logo" src="/assets/hv/logo-primary.png" alt="${siteName}" /></a>
        <nav class="nav-links" aria-label="Main navigation">
          <a href="/#services">Services</a>
          <a href="/#range">Range</a>
          <a href="/#gallery">Gallery</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      <main class="wrap">
        <section class="hero">
          <div>
            <span class="eyebrow">${escapeHtml(page.eyebrow)}</span>
            <h1>${escapeHtml(page.hero)}</h1>
            <p class="lead">${escapeHtml(page.intro)}</p>
            <div class="actions">
              <a class="button" href="/#contact">Make an enquiry</a>
              <a class="button secondary" href="mailto:${siteEmail}">${siteEmail}</a>
            </div>
          </div>
          <div class="hero-img">
            <img src="${page.image}" alt="${title}" />
          </div>
        </section>

        <section class="grid three" aria-label="Service details">
          <article class="card">
            <h3>Service areas</h3>
            <ul>${listItems(page.primaryAreas)}</ul>
          </article>
          <article class="card">
            <h3>Best for</h3>
            <ul>${listItems(page.bestFor)}</ul>
          </article>
          <article class="card">
            <h3>What we help with</h3>
            <ul>${listItems(page.services)}</ul>
          </article>
        </section>

        <section class="grid two" aria-label="Venue outcomes">
          <article class="card">
            <h2>What this adds to the venue</h2>
            <ul>${listItems(page.outcomes)}</ul>
          </article>
          <article class="card">
            <h2>Questions venue operators ask</h2>
            ${page.faqs
              .map(
                (faq) => `<h3>${escapeHtml(faq.question)}</h3>
            <p>${escapeHtml(faq.answer)}</p>`,
              )
              .join('\n')}
          </article>
        </section>

        ${optionalAreaGroups(page)}

        ${optionalVenueExamples(page)}

        ${optionalSearchTerms(page)}

        <section class="card">
          <h2>Related local services</h2>
          <div class="links">${links}</div>
        </section>
      </main>

      <footer class="wrap">
        <strong>${siteName}</strong><br />
        Arcade machines, pool tables, prize attractions, leasing options and technical support for hospitality, tourism and entertainment venues across the Murray and Riverina region.
      </footer>
    </div>
  </body>
</html>
`;
}

for (const page of pages) {
  const outDir = resolve(publicDir, page.slug);
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, 'index.html'), cleanGenerated(pageTemplate(page)), 'utf8');
}

const sitemapUrls = [
  {
    loc: `${siteUrl}/`,
    priority: '1.0',
  },
  ...pages.map((page) => ({
    loc: `${siteUrl}/${page.slug}/`,
    priority: '0.8',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

await writeFile(resolve(publicDir, 'sitemap.xml'), cleanGenerated(sitemap), 'utf8');

console.log(`Generated ${pages.length} SEO landing pages and sitemap.xml`);
