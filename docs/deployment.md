# Deployment notes

Recommended initial hosting for the USAS static export is Cloudflare Pages.

## Build settings

- Framework preset: Next.js (or custom static build)
- Build command: `npm run build`
- Output directory: `out`
- Production branch: `main`

## Custom domain

Connect both:

- `usasbd.org`
- `www.usasbd.org`

Use one as the canonical domain and redirect the other to it.

The current application metadata, robots file and XML sitemap already use `https://usasbd.org` as the canonical production origin.
