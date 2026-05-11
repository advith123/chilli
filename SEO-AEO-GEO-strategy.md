# Vijaya Enterprises — SEO, AEO & GEO Strategy

**Site:** https://vijayaenterprises.international
**Audited:** 11 May 2026
**Target ICP:** International B2B buyers — importers, wholesalers, food processors, oleoresin manufacturers
**Primary markets:** Middle East, EU, SE Asia, US, Bangladesh, Sri Lanka

---

## 0. Executive summary

The site is well above the bar for a brand-new B2B export site. Per-page canonicals, OG/Twitter cards, geo meta, basic Schema.org (Organization, LocalBusiness, AboutPage, ContactPage, HowTo, ItemList, Article), a sitemap, robots.txt, semantic HTML, and accessibility hooks are all in place. The biggest wins now are not "more meta tags" — they are:

1. **AEO-grade structured data**: FAQPage, BreadcrumbList, expanded Product schema with offers and aggregateRating, Service schema for "Bulk Dry Red Chilli Export," and a richer HowTo with per-step images and durations. These are what Google's AI Overviews, Bing Copilot, and Perplexity citation engines actually parse.
2. **GEO controls (AI crawlers)**: Explicit allow/deny rules for `GPTBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`, `Applebot-Extended`, `Bytespider`, plus an `llms.txt` file that gives generative engines a clean, factual brief of who you are. Without these, you cede the choice to crawler defaults.
3. **LCP and weight**: `hero-bg.jpg` is **7.0 MB**. That single file alone will tank your Lighthouse score and your Google rankings for "Indian red chilli exporters" — Core Web Vitals are a confirmed ranking factor. Convert to AVIF/WebP with responsive `srcset`, target < 200 KB for the LCP image.
4. **Entity-rich content**: The site reads like a brochure. AI engines cite content that reads like a fact sheet — SHU ranges, ASTA values, moisture %, capsaicin content, harvest months, district-level origin. Add a short "Quick facts" block to each variety on `varieties.html` and you become the citation source for "What is the SHU of Teja S17?" queries.
5. **Sitemap**: Currently has no `<lastmod>`, no image entries, and no hreflang. Both Google and AI crawlers use these signals. Replacement provided.

Estimated effort to ship every recommendation in this doc: **8–12 hours of dev work** across 2 weeks. ROI: discoverability gains start within 4–6 weeks of Google Search Console submission; AI engine citations start showing up within 2–3 indexing cycles of the AI crawlers.

---

## 1. Audit findings (what's there, what's missing)

### What's already done well

| Area | Status |
|---|---|
| Per-page unique `<title>` and `<meta description>` | Present |
| Per-page `<link rel="canonical">` | Present |
| Open Graph + Twitter Card meta | Present |
| Geo meta (`geo.region`, `geo.position`, `ICBM`) | Present |
| Heading hierarchy (one H1 per page) | Present |
| Internal linking via primary nav | Present |
| JSON-LD: Organization, LocalBusiness, AboutPage, ContactPage, Person, ItemList, HowTo, Article | Present |
| `sitemap.xml` + `robots.txt` | Present (but minimal) |
| `lang="en"` on `<html>` | Present |
| Skip link + ARIA roles | Present |

### Gaps (priority-ordered)

| Priority | Gap | Impact |
|---|---|---|
| P0 | `hero-bg.jpg` is 7.0 MB — kills LCP | Ranking + UX |
| P0 | No FAQPage schema anywhere | Largest AEO miss — FAQ rich results drive 30-60% of "answer" SERP clicks |
| P0 | No BreadcrumbList schema | Both Google and AI engines use breadcrumbs for site graph |
| P0 | Robots.txt has no AI crawler rules | You're invisible / over-exposed to LLMs by default |
| P0 | No `llms.txt` file | Emerging GEO standard — Perplexity, Anthropic, OpenAI honor it |
| P1 | Sitemap has no `<lastmod>` or image entries | Crawl prioritization + Google Images miss |
| P1 | Product schema is skeletal (no offers, sku, brand details, aggregateRating) | Misses product rich results |
| P1 | HowTo on `process.html` has no `image`, no per-step `image`, no per-step `timeRequired` | Misses HowTo rich result |
| P1 | No author entity / E-E-A-T signals on blog articles | Lower trust for YMYL-adjacent content |
| P2 | No comparison tables in HTML (only prose) | Comparison tables are heavily quoted by AI engines |
| P2 | No "Quick facts" block per variety (SHU, ASTA, moisture, harvest months) | Missed entity citations |
| P2 | No `dateModified` on articles, only `datePublished` | Freshness signal lost |
| P2 | Google Fonts loaded without `font-display: swap` audit | CLS risk |
| P2 | No `<picture>` + `srcset` for hero/varieties images | Bandwidth + CWV |
| P3 | Address is only "Warangal" — no street, no PIN-area precision in NAP | Local pack ranking suffers |
| P3 | Blog: only 3 articles | Topical authority too thin |
| P3 | No internal `Service` schema for export services | Misses service rich results |
| P3 | No `hreflang` annotations (even self-referential) | Future-proofing for `/ar/`, `/zh/` markets |

---

## 2. Technical SEO — immediate fixes

### 2.1 Performance & Core Web Vitals

**The hero image alone is responsible for ~95% of the page weight on `index.html`.** Convert and serve responsively:

```bash
# Generate responsive variants (AVIF + WebP + JPG fallback) at 3 widths
# Recommended tool: sharp-cli or squoosh-cli
# Targets: < 200 KB for LCP image at 1920w AVIF

npx @squoosh/cli --avif '{"cqLevel":33}' --resize '{"width":1920}' hero-bg.jpg
npx @squoosh/cli --webp '{"quality":80}' --resize '{"width":1920}' hero-bg.jpg
npx @squoosh/cli --avif '{"cqLevel":33}' --resize '{"width":1280}' hero-bg.jpg
npx @squoosh/cli --avif '{"cqLevel":33}' --resize '{"width":768}' hero-bg.jpg
```

Then in `index.html`, replace the CSS `background-image` with a `<picture>` element placed behind the hero text:

```html
<picture class="hero__bg" aria-hidden="true">
  <source type="image/avif" srcset="
    images/hero-bg-768.avif 768w,
    images/hero-bg-1280.avif 1280w,
    images/hero-bg-1920.avif 1920w" sizes="100vw">
  <source type="image/webp" srcset="
    images/hero-bg-768.webp 768w,
    images/hero-bg-1280.webp 1280w,
    images/hero-bg-1920.webp 1920w" sizes="100vw">
  <img src="images/hero-bg-1280.jpg" alt="" fetchpriority="high" decoding="async" />
</picture>
```

Add to `<head>` of `index.html` only:

```html
<link rel="preload" as="image" href="images/hero-bg-1280.avif" type="image/avif" fetchpriority="high">
```

Other CWV wins:

- Add `loading="lazy" decoding="async"` to **every** `<img>` below the fold (lifecycle/, gallery/, blog list thumbnails).
- The first lifecycle image should NOT be lazy — it's typically above the fold on the process page.
- Add `width` and `height` attributes to every `<img>` (CLS prevention). They can be the intrinsic pixel dimensions; CSS overrides for layout.
- Self-host fonts or use `font-display: swap` query param: change Google Fonts URL to append `&display=swap` (already present in your URL — verify it's not overridden by CSS).
- Add `defer` to `script.js` if not already.
- Inline critical CSS for above-the-fold (hero) and load `style.css` async.

### 2.2 Image SEO

- Rename images with descriptive slugs before launch:
  - `images/varieties/guntur-s4.jpeg` → `images/varieties/guntur-sannam-s4-dry-red-chilli.jpg`
  - `images/varieties/S17-Teja.jpg` → `images/varieties/teja-s17-dry-red-chilli-warangal.jpg`
  - `images/lifecycle/1.jpeg` → `images/lifecycle/01-plowing-chilli-field-telangana.jpg`
- Every `<img>` should have specific alt text (avoid generic "chilli" — write "Sun-drying Teja S17 chillies on raised platforms at Warangal yard").
- Generate the `og-cover.jpg` at 1200×630 (still missing per the README).

### 2.3 Internal linking

The footer should include a `<nav aria-label="Footer">` block linking every product variety, every blog article, and the key utility pages. Each variety section on `varieties.html` should link to:

- The relevant blog article (e.g., Guntur Sannam → guntur-vs-byadgi-chillies blog)
- The process page anchored to the relevant step
- The contact page with a UTM-tagged anchor (`contact.html?variety=teja-s17`)

Add **next/prev** links between blog articles (Schema.org `Article.relatedLink` or simple `<nav>` at end of article).

### 2.4 URL hygiene

You currently use `.html` extensions everywhere. That's fine for static hosting, but configure your host (Cloudflare Pages settings) to:

- Serve `/about.html` at `/about` (clean URL) AND keep the `.html` version redirecting 301 to the clean URL. This is one toggle on most hosts.
- Update all canonicals and internal links to the clean URL format after deploy.

### 2.5 HTTPS, HSTS, and security headers

On Cloudflare Pages, in the dashboard, enable:

- Always Use HTTPS: On
- HSTS: Enabled, max-age 31536000, includeSubDomains
- Add a `_headers` file (Cloudflare Pages convention) for security headers:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN
```

Security headers don't directly rank you, but they affect trust signals that bleed into E-E-A-T.

---

## 3. Structured data overhaul (the big AEO unlock)

The eight schema types you have are good; you're missing seven more that move the needle. Below is what to add and where. Full copy-paste JSON-LD blocks are in `structured-data-blocks.html`.

### 3.1 Add to **every page** (or use a shared snippet)

**BreadcrumbList** — emit a Schema breadcrumb that matches the user's navigation path. This shows up as the breadcrumb trail in Google SERPs and is heavily used by AI engines to understand site structure.

**WebSite + SearchAction** — only on `index.html`. Enables Google sitelinks search box.

### 3.2 Add to `index.html`

- **WebSite** with `potentialAction` SearchAction
- **Organization** — already there, but expand with `sameAs` (LinkedIn, IndiaMART, Alibaba storefront, ExportersIndia profile, ZaubaCorp listing, GST listing) once those exist. `sameAs` is the single biggest entity-grounding signal you can give to AI engines.
- **FAQPage** — 4–6 buyer-side FAQs ("What dry red chilli varieties does Vijaya Enterprises export?", "What is your minimum order quantity?", "Do you ship FOB or CIF?", "How long is your quote turnaround?", "Are you FSSAI/APEDA registered?"). This is the highest-ROI single change you can make on the homepage.

### 3.3 Add / expand on `varieties.html`

Upgrade the current bare `ItemList` to a list of `Product` items with:

- `name`, `description`, `image`, `brand`, `category`, `countryOfOrigin`
- `gtin13` or `mpn` if you ever assign internal SKUs
- `additionalProperty` array containing **SHU (Scoville)**, **ASTA color value**, **capsaicin %**, **moisture %**, **stem-on/stem-cut**, **typical length cm** — these are the exact facts AI engines lift verbatim
- `offers` of type `AggregateOffer` with `priceCurrency`, `lowPrice`, `highPrice`, `availability`, `priceValidUntil` (use a rolling 90-day quote validity)
- Once you have testimonials, `aggregateRating`

### 3.4 Expand HowTo on `process.html`

Current schema has only `name` and `text` per step. Add per step:

- `image` (URL to the lifecycle image for that step — you already have them)
- `timeRequired` in ISO 8601 (`PT3D` for "3 days drying", etc.)
- `tool` array where relevant (tractor, sun-drying yard, color sorter, etc.)
- A top-level `image`, `estimatedCost`, `supply` array, and `tool` array on the HowTo itself

This is the difference between "we have HowTo schema" and "we get a HowTo carousel in SERPs."

### 3.5 Blog articles — upgrade Article → BlogPosting + Author + Reviewed

For each blog article add:

- `@type: "BlogPosting"` (more specific than `Article`)
- `dateModified` (auto-set on each edit)
- `wordCount`
- `articleSection`
- `mainEntityOfPage`
- `author` as a `Person` (not just `Organization`) with `url`, `jobTitle`, `worksFor`. Real author entity = E-E-A-T win.
- `image` as an `ImageObject` with width/height
- `inLanguage`: "en"

Create a real `/authors/dinesh-rao-balguri.html` author page that the `author.url` points to. Add `Person` schema there with `sameAs` to LinkedIn, photo, jobTitle, full bio. AI engines (especially Perplexity) trace `author.url` and treat author-page-backed bylines as far more authoritative than bare names.

### 3.6 Add a `Service` schema

Either on `index.html` (in addition to others) or on a new `services.html` page. Captures your actual offering as Schema.org `Service` with `serviceType: "Bulk Dry Red Chilli Export"`, `provider`, `areaServed` (array of all your target countries — UAE, Saudi Arabia, Vietnam, Bangladesh, Sri Lanka, Indonesia, Malaysia, USA, UK, Germany, Spain), `hasOfferCatalog` listing your six varieties as offers.

### 3.7 Gallery → ImageGallery

`gallery.html` should have an `ImageGallery` schema with each photo as an `ImageObject` (with `contentUrl`, `caption`, `name`, `creditText`, `creator`). Trips Google Images.

### 3.8 Validate

After implementing, validate every page through:

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org validator: https://validator.schema.org
- Bing Markup Validator (URL inspector inside Webmaster Tools)

Aim for zero warnings, not just zero errors.

---

## 4. Sitemap & robots — full replacements provided

### 4.1 New `sitemap.xml`

The replacement file (see `sitemap.xml` in the same package) adds:

- `<lastmod>` timestamps on every URL (use ISO 8601, e.g., `2026-05-11`)
- The `xmlns:image` namespace and `<image:image>` entries on visual-heavy pages (gallery, varieties, blog articles). Each entry has `<image:loc>`, `<image:title>`, `<image:caption>`
- Self-referential `<xhtml:link rel="alternate" hreflang="en">` and `hreflang="x-default"` — sets you up to add `/ar/`, `/zh/` paths later without a sitemap re-architecture
- A future-proof `<sitemap-index>` pattern: split into `sitemap-pages.xml`, `sitemap-blog.xml`, `sitemap-images.xml` once you cross ~50 URLs

### 4.2 New `robots.txt`

The current robots.txt is one line of allow and one disallow. The replacement:

- Explicitly allows `Googlebot`, `Bingbot`, `DuckDuckBot`, `Slurp` (Yahoo)
- Explicitly allows **AI training/answer crawlers** (you want citations): `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`, `Anthropic-AI`, `PerplexityBot`, `Perplexity-User`, `Google-Extended` (separate from Googlebot), `Applebot-Extended`, `Meta-ExternalAgent`, `cohere-ai`, `Bytespider` (TikTok / Doubao)
- Blocks low-value scrapers and aggressive crawlers (AhrefsBot, SemrushBot, MJ12bot, DotBot) by default — you can selectively allow if you want their tools
- Disallows `/images/placeholder.svg` (already there), Sitemap reference (already there)
- Adds `Sitemap:` to every block — required because `Sitemap` is a top-level directive not bound to a User-agent

If you DO NOT want LLMs trained on your site, change every AI crawler line from `Allow:` to `Disallow:`. **My recommendation: allow them.** You want to be cited; you have nothing on the site that's confidential.

---

## 5. AEO — Answer Engine Optimization

AEO is the discipline of getting Google's AI Overviews, Bing Copilot, You.com, and similar answer engines to pull *your* sentence into their generated answer. Three levers:

### 5.1 FAQ blocks with FAQPage schema

Add a real FAQ section near the bottom of `index.html`, `varieties.html`, `contact.html`, `process.html`. Each section uses `<details><summary>` for accessibility and is mirrored in `FAQPage` JSON-LD. Suggested FAQs:

**index.html:**
1. What dry red chilli varieties does Vijaya Enterprises export?
2. What is your minimum order quantity (MOQ)?
3. Do you ship FOB, CIF, or both?
4. Which ports does Vijaya Enterprises export from?
5. How long is your quote turnaround?
6. Are you FSSAI / APEDA / Spices Board registered?

**varieties.html:**
1. What is the SHU (heat) of Guntur Sannam S4?
2. What's the difference between Teja S17 and Guntur Sannam?
3. Is Byadgi chilli low-pungent? What's its ASTA color?
4. Which Indian red chilli variety has the highest color value?
5. What's the typical moisture content of export-grade Indian dry chillies?

**process.html:**
1. How long does it take to dry red chillies for export?
2. What's the difference between sun-dried and machine-dried chillies?
3. How are stems handled in export-grade chillies?
4. What's the typical shelf life of Indian dry red chillies?

**contact.html:**
1. Where is Vijaya Enterprises located?
2. What payment terms do you accept (LC, TT, advance)?
3. Can you provide samples before bulk order?

Every answer should be **45–80 words**, factual, contain the key entity terms, and end with a concrete commitment (price range, lead time, MOQ, etc.). AI engines preferentially quote answers in this length window.

### 5.2 Quick-fact blocks per entity

On `varieties.html`, every variety should have a **fact-box at the top of its section**, before the prose:

```
GUNTUR SANNAM S4
SHU: 35,000–40,000        Origin: Guntur, AP
ASTA: 32–38               Length: 5–7 cm
Capsaicin: 0.226%         Moisture (max): 11%
Harvest: Dec–Mar          Stem: With/Without
```

This is the single biggest source of "Vijaya Enterprises" citations you'll get in ChatGPT/Claude answers, because LLMs greedily extract structured fact rows. Mirror them in `Product.additionalProperty` schema.

### 5.3 Comparison tables

Render proper HTML `<table>`s for:

- Guntur Sannam vs Teja S17 vs Byadgi vs Kashmiri (SHU, ASTA, capsaicin, use case)
- Guntur S4 vs S5 vs S6 vs S10
- Stem-on vs stem-cut export grades
- FCL 20ft vs 40ft container capacity by variety

Tables with `<thead>` and `<tbody>` and clear column headers are heavily extracted by AI answer engines.

### 5.4 Definition-first paragraphs

Every blog article should open with a 40-60 word **definition paragraph** that fully answers the implicit question of the URL slug, in plain language. AI engines lift this paragraph verbatim. Example for `best-red-chilli-varieties-india-export.html`:

> The best red chilli varieties for export from India are Guntur Sannam S4 (heat-driven, ASTA 32–38), Teja S17 (highest pungency at 75,000–90,000 SHU), Byadgi Kaddi (low-heat, deep-red, oleoresin-grade), Kashmiri Deghi Mirch (color-only, sub-2000 SHU), 334 Wonder Hot, and 341 Indo-5. Selection depends on buyer use-case: color, heat, capsaicin extraction, or culinary blend.

---

## 6. GEO — Generative Engine Optimization

GEO is the layer above AEO: you're not just trying to get cited in one AI Overview — you're trying to become the canonical, factual entity that *every* generative engine references when the topic comes up. Different mechanics:

### 6.1 `llms.txt`

Emerging convention (proposed by Jeremy Howard, adopted by Anthropic and Mistral docs, increasingly recognized by Perplexity). It's a simple Markdown file at `/llms.txt` that gives generative engines a clean, factual brief of who you are and what's worth knowing about you. File provided in this package.

Also serve `/llms-full.txt` — a longer, full-content version including condensed page text. Generative crawlers can pull either depending on context.

### 6.2 Entity grounding via `sameAs`

The single highest-leverage GEO move: get your `Organization` schema's `sameAs` populated with every external profile that confirms "this is who Vijaya Enterprises is":

- LinkedIn company page
- ZaubaCorp / Tofler company listing (auto-generated for any Indian Pvt. Ltd.)
- GST portal listing
- IndiaMART seller profile
- ExportersIndia profile
- Spices Board India RCMC public listing (once you have it)
- APEDA exporter directory listing
- IEC public lookup (DGFT)
- Google Business Profile URL
- Wikipedia / Wikidata entry (only after you cross meaningful press; don't force this)

Each `sameAs` URL ties your entity to a known, trusted index. LLMs use these to resolve "who is Vijaya Enterprises" with high confidence.

### 6.3 Factual, machine-readable about pages

Add to `about.html` an "**At a glance**" structured fact block (also mirrored in schema):

```
Legal name:     Vijaya Enterprises Pvt. Ltd.
Founded:        2026
Founder:        Dinesh Rao Balguri
HQ:             Warangal, Telangana, India
Industry:       Spice exports
Specialization: Dry red chillies (Guntur, Teja, Byadgi, Kashmiri, 334, 341)
Sourcing:       Telangana & Andhra Pradesh farm belts
Container ops:  FCL (20ft, 40ft), LCL, mixed loads
Ports:          Chennai, Visakhapatnam
Markets served: UAE, Saudi Arabia, Bangladesh, Sri Lanka, Vietnam, Malaysia, USA, UK
Certifications: FSSAI, IEC, APEDA-registered
```

LLMs ingest these blocks almost verbatim into their entity cards.

### 6.4 Stable, citable factual claims

AI engines reward claims that are:

- Specific (numbers, ranges, dates)
- Stable (won't be obsolete next week)
- Sourced (citation or visible authority)
- Repeated in structured + unstructured form

For every variety, every process step, every market, restate the key fact in three places: schema, fact-box, prose. The redundancy is the point.

### 6.5 AI crawler welcome — and exclusion control

Already covered in §4.2. Allowing AI crawlers is the prerequisite for being cited at all. If you ever publish proprietary trade data you don't want trained on, put it in a `/private/` directory and `Disallow:` that path specifically.

### 6.6 Content that survives RAG chunking

When AI engines retrieve, they chunk pages into 500–1000 token spans. Two consequences:

- **Self-contained sections**: every H2 section should make sense if quoted in isolation, without depending on the H1 above it. Repeat the entity name and key qualifier inside each section ("At Vijaya Enterprises, the Teja S17 we source from Khammam district…").
- **No critical info in images alone**: any number, date, or fact that lives only in a PNG/JPG is invisible to text-based RAG. Restate everything textually.

---

## 7. Content strategy — topical authority for B2B chilli export

You have 3 blog articles. To become the topical authority for "Indian red chilli export" in Google and LLMs, target **20–25 articles across the 12 months** post-launch. Suggested clusters:

### Cluster A: Variety guides (deep, evergreen)

1. (✓ exists) Best Red Chilli Varieties in India for Export
2. (✓ exists) Guntur vs Byadgi: Which Chilli Should You Import?
3. Teja S17 Buyer's Guide: SHU, ASTA, and Sourcing
4. Kashmiri Deghi Mirch vs Spanish Paprika: An Importer's Comparison
5. 334 Wonder Hot vs 341 Indo-5: Heat, Color, Use-Case
6. Stem-On vs Stem-Cut Dry Red Chillies: What Buyers Should Specify
7. Whole, Powder, Flakes: Choosing the Right Format for Your Use Case

### Cluster B: Process & quality (E-E-A-T heavy)

8. (✓ exists) How Indian Chillies Are Processed for Export
9. ASTA Color Value Explained for Spice Buyers
10. Capsaicin Content: How It's Measured and What It Means for Your Order
11. Moisture, Mold, and Mycotoxins: What "Export Grade" Really Means
12. ETO and Steam Sterilization in Indian Chilli Exports
13. Color Sorting Technology in Indian Spice Yards

### Cluster C: Logistics & trade (high-intent)

14. FCL vs LCL Shipping for Spice Imports
15. Indian Chilli Export Documentation: APEDA, FSSAI, Phytosanitary
16. INCOTERMS for Spice Buyers: FOB vs CIF vs DAP
17. Chennai vs Visakhapatnam: Which Port for Spice Exports
18. Payment Terms in Indian Spice Trade: LC, TT, DA, DP Explained
19. Container Loading: Pallets vs Loose Bags

### Cluster D: Market-specific (geo-targeted)

20. Sourcing Indian Red Chillies for the UAE Spice Trade
21. Bangladesh Importer's Guide to Indian Dry Red Chillies
22. EU Buyers: ETO Bans and What to Specify
23. US FDA Requirements for Indian Spice Imports
24. Korea and Japan: Sulfur Dioxide Limits in Spice Imports

### Cluster E: Industry / lifestyle (link bait)

25. Why Warangal Became a Chilli Hub: A History
26. The Guntur Chilli Yard — World's Largest, Inside

Each article should be **1500–2500 words**, include a comparison table, a "Quick answer" definition paragraph at top, an FAQ section with FAQPage schema, internal links to varieties.html, contact CTA, and one original photo or diagram.

Publishing cadence: 2 per month for the first 6 months, 1 per month thereafter.

---

## 8. Local SEO & international rollout

### 8.1 Google Business Profile (single biggest one-time SEO action)

Create immediately at https://business.google.com:

- Business name: **Vijaya Enterprises Pvt. Ltd.**
- Category: **Spice exporter** (primary), **Exporter**, **Wholesaler** (secondary)
- Full street address (not just "Warangal" — needs the actual building, locality, PIN)
- Phone: +91-87987-93211 (must match site NAP exactly)
- Website URL
- Business hours
- 10+ photos: storefront, warehouse, sorting lines, packaging, team, lifecycle
- Initial 3–5 verified customer reviews after first shipments

Add a `GeoCoordinates` block on contact.html that matches the GBP pin coordinates exactly.

### 8.2 NAP consistency

Name, Address, Phone must appear **identically** on:

- Every page footer
- Schema.org LocalBusiness on every page (currently only on index)
- Google Business Profile
- IndiaMART listing
- ZaubaCorp/Tofler
- Any directory submissions

Any variance (e.g., "Warangal" vs "Warangal, Telangana" vs "Hanamkonda") splits your citation graph.

### 8.3 International signals (hreflang)

For now, the site is English-only. When you add Arabic for GCC buyers or Mandarin for Chinese importers:

- Use `/ar/` and `/zh/` subdirectories
- Add `hreflang` annotations both in `<head>` of each page AND in the sitemap:

```html
<link rel="alternate" hreflang="en" href="https://vijayaenterprises.international/varieties.html" />
<link rel="alternate" hreflang="ar" href="https://vijayaenterprises.international/ar/varieties.html" />
<link rel="alternate" hreflang="x-default" href="https://vijayaenterprises.international/varieties.html" />
```

The replacement `sitemap.xml` is already structured to make this extension trivial.

### 8.4 Off-site signals

Order of priority for backlink acquisition:

1. APEDA exporter directory (free, official)
2. Spices Board India member directory (after Spices Board membership)
3. IndiaMART verified seller (paid; high domain authority and buyer flow)
4. ExportersIndia.com listing (paid; same reasoning)
5. Alibaba Gold Supplier (paid; high-intent buyer traffic)
6. TradeIndia listing
7. Indiana directories for spice trade
8. Industry guest posts: Spice Trade News, World Spice Congress publications
9. Trade fair / event mentions (World of Perishables Dubai, Gulfood, SIAL Paris)
10. LinkedIn long-form posts by founder linking back to deep variety pages

Each authoritative backlink with anchor text containing "dry red chilli exporter" or a variety name is worth more than 10 generic directory submissions.

---

## 9. Measurement & ongoing operations

### 9.1 First-week setup (one-time)

- [ ] Submit `sitemap.xml` to Google Search Console (https://search.google.com/search-console)
- [ ] Submit to Bing Webmaster Tools (https://www.bing.com/webmasters)
- [ ] Submit to Yandex Webmaster (small but matters for Russia/CIS buyers)
- [ ] Submit to Naver (Korean buyers) and Baidu (Chinese buyers) if those markets matter
- [ ] Set up Google Analytics 4 + GTM (event tag the quote form submissions, contact clicks, phone clicks, blog scroll-depth)
- [ ] Set up Microsoft Clarity for free session recordings (you'll learn more from 50 recordings than from 5 reports)
- [ ] Connect GSC ↔ GA4
- [ ] Validate every page via Rich Results Test, fix any warnings
- [ ] Run a baseline Lighthouse pass on `/`, `/varieties.html`, `/process.html`. Record numbers.

### 9.2 Monthly cadence

- Publish 1–2 new blog articles per the content plan above
- Refresh the variety pages quarterly with current crop year, color/heat ranges
- Add new GBP photos monthly (Google rewards active profiles heavily)
- Solicit 1 buyer review per shipment for GBP
- Update `<lastmod>` in sitemap on every page edit (or automate via a build script)

### 9.3 KPIs

| Metric | Source | 90-day target | 12-month target |
|---|---|---|---|
| Indexed pages | GSC Index Coverage | 11/11 | 30+ (with blog growth) |
| Avg position for "dry red chilli exporters in India" | GSC | < 30 | < 10 |
| Impressions/month | GSC | 5,000+ | 50,000+ |
| Clicks/month from organic | GSC | 200+ | 3,000+ |
| Organic quote form submissions | GA4 events | 5+ | 50+ |
| AI engine citations | Manual ChatGPT/Claude/Perplexity probes monthly | First citation | Cited in 25%+ of relevant queries |
| Core Web Vitals (Mobile) all green | GSC CWV report | Yes | Yes |
| Backlinks (referring domains) | Ahrefs / free tools | 10+ | 100+ |

### 9.4 AI citation tracking (monthly probe queries)

Once a month, run these queries against ChatGPT, Claude, Gemini, Perplexity:

- "Who are the major dry red chilli exporters in India?"
- "Compare Guntur Sannam and Byadgi chillies"
- "What is the SHU of Teja S17?"
- "How are Indian red chillies processed for export?"
- "Chilli exporters in Warangal Telangana"

Record whether Vijaya Enterprises appears. Track over time. This is your GEO scoreboard.

---

## 10. 90-day implementation roadmap

### Week 1 — Foundation (P0 fixes)

- [ ] Drop in the replacement `sitemap.xml`, `robots.txt`, and add `llms.txt` and `llms-full.txt`
- [ ] Compress `hero-bg.jpg` to AVIF/WebP responsive set; convert to `<picture>` element
- [ ] Add `loading="lazy"` and width/height to all below-fold images
- [ ] Add `BreadcrumbList` JSON-LD to every page
- [ ] Add `WebSite` + SearchAction to index.html
- [ ] Add `FAQPage` schema + corresponding HTML FAQ section to index.html, varieties.html, process.html, contact.html
- [ ] Create `og-cover.jpg` at 1200×630

### Week 2 — Schema and content depth

- [ ] Upgrade `ItemList` on varieties.html to a list of full `Product` items with `additionalProperty` for SHU/ASTA/moisture
- [ ] Add fact-boxes (visible HTML) at top of each variety section
- [ ] Expand `HowTo` on process.html with per-step `image` and `timeRequired`
- [ ] Upgrade blog `Article` → `BlogPosting` with `author` as `Person`, `dateModified`, `wordCount`, `mainEntityOfPage`
- [ ] Create `/authors/dinesh-rao-balguri.html` with `Person` schema
- [ ] Add `ImageGallery` schema to gallery.html
- [ ] Add `Service` schema to index.html

### Week 3 — Local & off-site

- [ ] Create and fully populate Google Business Profile (10+ photos, hours, exact address)
- [ ] Submit to APEDA exporter directory
- [ ] Create LinkedIn company page
- [ ] Submit site to Google Search Console, Bing, Yandex
- [ ] Set up GA4 + event tagging
- [ ] Run Rich Results Test on every page, fix warnings

### Weeks 4–8 — Content velocity

- [ ] Publish 4 new blog articles from the content plan
- [ ] Solicit 3+ Google reviews from initial customers
- [ ] Get first 5 directory listings (IndiaMART, ExportersIndia, TradeIndia, ZaubaCorp claim, GST-portal listing)
- [ ] First monthly AI citation probe

### Weeks 9–12 — Refinement

- [ ] Re-run Lighthouse, target all-green on Mobile
- [ ] Refresh variety page content with summer crop data
- [ ] Publish 4 more articles
- [ ] First Bing Webmaster review of indexing health
- [ ] Identify top 5 keywords by impression count in GSC and add targeted content for each

---

## Appendix A — Files included in this strategy package

| File | Purpose |
|---|---|
| `SEO-AEO-GEO-strategy.md` | This document |
| `sitemap.xml` | Drop-in replacement with `<lastmod>`, image entries, hreflang |
| `robots.txt` | Drop-in replacement with explicit AI crawler controls |
| `llms.txt` | GEO standard file at `/llms.txt` |
| `structured-data-blocks.html` | Copy-paste JSON-LD snippets for every recommendation |

---

## Appendix B — Quick reference: which schema goes where

| Page | Schemas to include |
|---|---|
| `index.html` | Organization, LocalBusiness, WebSite (SearchAction), BreadcrumbList, FAQPage, Service |
| `about.html` | AboutPage, Organization, BreadcrumbList |
| `varieties.html` | BreadcrumbList, FAQPage, multiple `Product` (one per variety, with `additionalProperty` for SHU/ASTA/etc) |
| `process.html` | BreadcrumbList, FAQPage, HowTo (with per-step images and `timeRequired`) |
| `team.html` | BreadcrumbList, Person (founder + each team member) |
| `gallery.html` | BreadcrumbList, ImageGallery (with ImageObject for each photo) |
| `blog.html` | BreadcrumbList, Blog (CollectionPage), ItemList of BlogPosting |
| `blog/*.html` | BreadcrumbList, BlogPosting, Person (author), FAQPage (if applicable), Article-level ImageObject |
| `contact.html` | BreadcrumbList, ContactPage, LocalBusiness (full with GeoCoordinates), FAQPage |
| `/authors/dinesh-rao-balguri.html` (new) | Person, ProfilePage |

---

*Document version 1.0 — drafted 11 May 2026. Re-audit recommended at +90 days and +180 days.*
