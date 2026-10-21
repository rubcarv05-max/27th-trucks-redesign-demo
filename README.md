# 27th Trucks Inc. — Website Redesign Concept

A one-page, static redesign demo for [27th Trucks Inc.](https://www.27th-trucks.com/), Hialeah, FL vacuum truck specialists.

**Live demo:** https://rubcarv05-max.github.io/27th-trucks-redesign-demo/

> **Sales demo only.** This is not the official website. It is not connected to any backend, and the inquiry form sends nothing.
> The page is set to `noindex`, and `robots.txt` blocks crawlers, so it never competes with the live site in search.

## What's inside

| Section | Highlights |
|---|---|
| Hero | Full-bleed real truck photo, "Explore Inventory" / "Contact Our Team" CTAs, featured-truck card, highlights rail |
| On the lot | Side-scrolling strip with all 9 trucks currently listed. Pauses on hover, has a Pause button, and becomes a swipeable row with reduced motion. Featured trucks open the detail view; the others open their live listing |
| Featured inventory | 3 trucks with photos, prices, tank size and key specs. Filter by tank size. **View Details** opens a gallery and full spec sheet. **Inquire** pre-fills the form |
| Why 27th Trucks | Company figures, four pillars, and a tabbed "What goes into our builds" |
| Reviews | Google rating (4.3, 35 reviews) and the 7 reviews shown on the current site, word for word. Carousel with arrows, dots, drag and gentle auto-advance |
| Financing & warranty | Real SLS Financial application link, 5-yr APEX Tank warranty, 2-yr pump & blower warranty with manufacturer links |
| Contact | Click-to-call, text, directions, hours, and a demo-only quote form (clearly labeled) |

Interaction details: buttons have hover lift, a light sweep, a click ripple and magnetic movement on the hero CTAs. Navigation is sticky with active-section highlighting, and there is a mobile menu and a mobile call/quote bar. Everything respects `prefers-reduced-motion`.

## Stack

Plain HTML, CSS and JavaScript. No build step, no dependencies. The only external request is Google Fonts.

```
index.html      page markup
styles.css      all styles
main.js         interactions
assets/img/     photos + logo (assets/img/strip = photo-strip versions)
robots.txt      blocks indexing
.nojekyll       serve files as-is on GitHub Pages
```

Run locally: `npx http-server -p 8080`, then open http://localhost:8080.
Deploy: GitHub Pages from `main` / root, or drop the folder on any static host.

## Verification log (checked against 27th-trucks.com on Oct 20, 2026)

| Claim on the demo | Source on the live site | Status |
|---|---|---|
| 2023 International MV607, 2,500 gal aluminum, **$109,900** | Inventory page + listing | ✅ matches |
| 2017 Peterbilt 337, 2,000 gal, **$85,000** | Inventory page + listing | ✅ matches |
| 2016 Peterbilt 330, 2,500 gal, **$79,900** | Inventory page + listing | ✅ matches (see note below) |
| 6 other trucks in the photo strip, $74,900–$79,900 | Inventory page (9 trucks total) | ✅ matches |
| **30+** years of expertise | Home page stats + About page | ✅ as published |
| **5,000+** trucks sold | Home page stats | ✅ as published |
| 100% custom-built trucks | Home page stats | ✅ as published |
| Google rating **4.3**, based on **35** reviews | Reviews widget on home page | ✅ matches |
| 7 customer reviews, all 5-star | Reviews widget on home page | ✅ quoted word for word |
| SLS Financial financing + application link | Financing page "apply now" | ✅ link works |
| APEX Tank exclusive dealer, 5-yr nationwide tank warranty | Warranty page | ✅ matches |
| 2-yr manufacturer warranty on pump & blower packages (Battioni, NVE, Masport) | Warranty page | ✅ matches |
| Address, phone, hours (Mon–Fri 8–5, Sat by appointment, Sun closed) | Contact page / header | ✅ matches |

Omitted on purpose: the "100% customer satisfaction" stat (can't be backed up), and the reviews widget's "AI-generated summary" (it's not a customer review).

All links were checked: every in-page anchor resolves, and every external link returns HTTP 200. Facebook rejects automated requests but loads normally in a browser.

## Issues found on the current site (worth mentioning to the owner)

- **Broken warranty PDF links.** The "pdf download" links on the Warranty and Financing pages point to `https://https:/cdn.prod...`, which doesn't resolve. The file they're meant to reach is a **US Tanks** warranty PDF, while the page copy talks about APEX Tank.
- **2016 Peterbilt 330 listing contradicts itself.** The description says "2016 Peterbilt 337", "Paccar PX7" and a carbon steel tank, but the spec fields say "330" and "Paccar PX9". The demo uses the title and spec fields.
- **2017 Kenworth T370 listing** has a description that talks about a "2016 Freightliner M2".
- **Inventory spec labels are shifted.** On the grid view, "Engine:" shows the pump and "Transmission Type:" shows the engine.
- **Typos:** "Iternational 4300", "Maport Viper", "Satisfied Clientes", "PDF Downwload".
- **Placeholder email:** `emailcompany@email.com` appears in the header contact panel.

## Before going live

- Connect the form to email or a CRM (Formspree, Netlify Forms, HubSpot, etc.), then remove the "Demo only" labels.
- Confirm the figures and the 2016 Peterbilt 330 details with the owner.
- Ask for permission to quote the Google reviews (they come from the company's own site).
