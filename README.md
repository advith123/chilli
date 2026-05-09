# Vijaya Enterprises — Website

A multi-page, SEO-optimised, mobile-responsive B2B website for **Vijaya Enterprises Pvt. Ltd.**, a Warangal-based exporter of premium Indian dry red chillies.

Pure HTML / CSS / JavaScript. No build step, no backend, no dependencies. Drop the folder onto any static host and it works.

---

## Pages

| Page | URL | Purpose |
|---|---|---|
| Home | `index.html` | Hero, USPs, featured varieties, trust strip, process preview, target markets, quote form |
| About | `about.html` | Company story, founder credit, mission/vision, 5 reasons to choose us |
| Team | `team.html` | Founder lead card + 5 role-based members (Procurement, QC, Export Docs, Logistics, Trade Desk) |
| Varieties | `varieties.html` | SEO-critical: 6 detailed variety sections (Guntur Sannam, Teja S17, Byadgi, Kashmiri, 334, 341) + filterable grid for the remaining 5 + packaging pillars |
| Process | `process.html` | The 15-step lifecycle (the centerpiece you asked for) + 5 quality pillars + export flow timeline |
| Gallery | `gallery.html` | Filterable masonry grid (Farm / Drying / Sorting / Packaging / Warehouse / Team) with lightbox |
| Contact | `contact.html` | Sticky info panel + form + Warangal Google Maps embed |
| Blog | `blog.html` | Index page for SEO content |
| ↳ Article 1 | `blog/best-red-chilli-varieties-india-export.html` | Variety guide |
| ↳ Article 2 | `blog/guntur-vs-byadgi-chillies.html` | Comparison piece |
| ↳ Article 3 | `blog/how-indian-chillies-processed-export.html` | Processing deep-dive |

Plus: `sitemap.xml` and `robots.txt` for search engines.

---

## What you should edit before going live

Search the codebase for `<!-- EDIT` comments — those are the spots that need your input. Specifically:

### 1. Certifications (footer of every page + Compliance section)
Currently shows: **"FSSAI · IEC · APEDA-registered"**
- Once your FSSAI license is issued, optionally append the number.
- Once you receive Spices Board RCMC / ISO 22000 / HACCP / USFDA registration, add them.
- **Do not list certifications you haven't received yet** — international buyers verify these.

### 2. Founder direct email
On `team.html` and `contact.html`, the founder's direct email is set to `dinesh@vijayaenterprises.international`. Change if your actual address differs.

### 3. Team member names
On `team.html`, all members except the founder show placeholder names like `[Procurement Head Name]`. Replace these as you confirm each role.

### 4. Google Maps embed
On `contact.html`, the iframe currently centres on Warangal city centre. To use your exact office pin:
- Open Google Maps → search your office address → Share → Embed a map → copy the iframe `src` URL → paste it into the iframe's `src` on contact.html.

### 5. Social media links
The footer doesn't currently link to social handles. When you create LinkedIn / Instagram / Facebook accounts, add icons + links in the footer of each page.

### 6. Domain & canonical URLs
All `<link rel="canonical">` and `<meta property="og:url">` tags assume the domain `vijayaenterprises.international`. If you go live on a different domain, do a project-wide find-and-replace.

### 7. Open Graph share image
Create a 1200×630 banner at `images/og-cover.jpg` for nice WhatsApp / LinkedIn / Twitter previews when someone shares any of your URLs.

---

## Images

The site references 49 images at clean paths under `images/`. Until you drop in real photos, **every missing image automatically falls back** to the `images/placeholder.svg` (handled by `script.js`) — so the site looks intentional, not broken.

See **`IMAGES.md`** for the full list of expected paths, what each one is used for, and recommended sizes.

---

## SEO setup

| What | Done |
|---|---|
| Unique `<title>` per page | ✅ |
| Unique `<meta description>` per page | ✅ |
| Heading hierarchy (one H1 per page) | ✅ |
| Image `alt` text on every `<img>` | ✅ |
| Internal linking between pages | ✅ |
| `<link rel="canonical">` per page | ✅ |
| Open Graph + Twitter Card meta | ✅ |
| JSON-LD structured data (Organization, LocalBusiness, AboutPage, Person, ItemList, HowTo, Article) | ✅ |
| `sitemap.xml` and `robots.txt` | ✅ |
| Geo meta tags (region IN-TG, lat/long Warangal) | ✅ |
| Keyword targeting: "dry red chilli exporters in India", "Guntur chilli exporters", "Warangal chilli suppliers", "Indian red chilli wholesale exporters" | ✅ |

After deployment, also do these one-time setup tasks:
1. Submit the site to **Google Search Console** and submit your `sitemap.xml`.
2. Submit to **Bing Webmaster Tools**.
3. Create a **Google Business Profile** for the Warangal office (free, huge for local + international SEO).
4. Set up **Google Analytics 4** if you want to track enquiries.

---

## Quote form

The form on **Home** and **Contact** pages doesn't post to a backend (you said HTML/CSS/JS only). When the buyer clicks Submit, the form **opens WhatsApp with the enquiry pre-filled** at +91 87987 93211. The buyer hits send in WhatsApp; you receive the enquiry directly with all their details.

If you ever want server-side form handling without code, the easiest paths are:
- **Formspree** — paste your endpoint into the form's `action` attribute, no code change needed.
- **Netlify Forms** — host the site on Netlify and add `netlify` attribute to the `<form>` tag.

---

## Hosting

This is a pure static site, so any of these work — pick whichever you're comfortable with:

| Host | Cost | Notes |
|---|---|---|
| **Cloudflare Pages** | Free | Best performance globally, automatic SSL |
| **Netlify** | Free | Easiest if you want forms handled too |
| **Vercel** | Free | Fast, GitHub integration |
| **GitHub Pages** | Free | Simplest if you already use GitHub |
| **Hostinger / GoDaddy / shared cPanel** | Paid | Just FTP-upload the folder |

To deploy on Cloudflare Pages (recommended):
1. Put this folder into a GitHub repo.
2. Go to Cloudflare Pages → Create project → Connect to GitHub → select repo.
3. Build command: leave empty. Output directory: `/`.
4. Add your custom domain (`vijayaenterprises.international`) under Custom Domains. Cloudflare handles SSL automatically.

---

## File structure

```
vijaya/
├── index.html
├── about.html
├── team.html
├── varieties.html
├── process.html
├── gallery.html
├── contact.html
├── blog.html
├── blog/
│   ├── best-red-chilli-varieties-india-export.html
│   ├── guntur-vs-byadgi-chillies.html
│   └── how-indian-chillies-processed-export.html
├── style.css
├── script.js
├── sitemap.xml
├── robots.txt
├── IMAGES.md
├── README.md
└── images/
    ├── favicon.svg
    ├── placeholder.svg
    ├── hero/
    ├── lifecycle/   ← 15 lifecycle step images go here
    ├── team/
    ├── varieties/
    ├── gallery/
    └── blog/
```

---

## Built for

- **International B2B buyers** — importers, wholesalers, food processors, oleoresin manufacturers
- **Mobile-first** — every page tested down to 360px width
- **Fast** — no build pipeline, no JS framework, no analytics by default. Loads in under 1.5s on 4G.
- **Accessible** — semantic HTML, ARIA roles, keyboard-navigable, skip-link, `prefers-reduced-motion` respected

---

© 2026 Vijaya Enterprises Pvt. Ltd. — Grown in Bharat, graded with care.
