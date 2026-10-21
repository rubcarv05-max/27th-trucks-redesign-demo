# 27th Trucks Inc. — Website Redesign Concept

A one-page, static redesign demo for [27th Trucks Inc.](https://www.27th-trucks.com/), Hialeah, FL vacuum truck specialists.

> **Sales demo only.** This is not the official website. It is not connected to any backend, and the inquiry form sends nothing.
> The page is set to `noindex`, and `robots.txt` blocks crawlers, so it never competes with the live site in search.

## What's inside

| Section | Highlights |
|---|---|
| Hero | Full-bleed real truck photo, dark overlay, "Explore Inventory" / "Contact Our Team" CTAs, featured-truck card, highlights rail |
| Featured inventory | 3 real trucks with photos, prices, tank capacity and key specs. Filter by tank size. **View Details** opens a gallery and full spec sheet. **Inquire** pre-fills the form |
| Why 27th Trucks | Company figures, four pillars, and a tabbed "Inside every build" (tank / pump / valves / chassis) |
| Financing & warranty | SLS Financial financing, 5-yr APEX Tank warranty, 2-yr pump & blower manufacturer warranty |
| Contact | Click-to-call, text link, directions, hours, and a demo-only quote form (clearly labeled) |

Also included: sticky header with active-section highlighting, mobile menu, a mobile call/quote bar, fade-up reveals, and full `prefers-reduced-motion` support (animations and smooth scrolling turn off).

## Stack

Plain HTML, CSS and JavaScript. No build step, no dependencies. The only external request is Google Fonts (Archivo, IBM Plex Sans, IBM Plex Mono).

```
index.html      page markup
styles.css      all styles
main.js         interactions (filter, modal gallery, tabs, form demo, reveals)
assets/img/     photos + logo
robots.txt      blocks indexing
.nojekyll       serve files as-is on GitHub Pages
```

## Run locally

Open `index.html` directly, or serve the folder:

```bash
npx http-server -p 8080
```

## Deploy

The site deploys with **GitHub Pages** (Settings → Pages → Deploy from branch → `main` / root). Any static host also works (Netlify, Vercel, Cloudflare Pages); drop the folder in as-is.

## Content sources and what to confirm with the client

All truck data, prices, warranty and financing details come from 27th-trucks.com (captured Oct 20, 2026). The hero, pump and rear-tank photos are the company's own truck photos supplied for this demo. Nothing is invented. Before this goes live, confirm:

- **2016 Peterbilt 330 ($79,900):** the live listing's description says "2016 Peterbilt 337", "Paccar PX7" and a carbon steel tank, but its spec fields say "Peterbilt 330" and "Paccar PX9". The demo uses the title and spec fields.
- **Company figures** (30+ years, 5,000+ trucks sold, 100% custom-built) are shown exactly as published on the current home page. The "100% customer satisfaction" figure was left out.
- **Testimonials:** the live site has a testimonials heading with no testimonials, so none are shown here.
- **Form:** connect it to email or a CRM (Formspree, Netlify Forms, HubSpot, etc.), then remove the "Demo only" labels.
- **Email:** the live site shows a placeholder (`emailcompany@email.com`), so the demo uses phone and text only.
