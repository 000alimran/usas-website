# USAS Website

Official website starter for **University Students' Association of Shyamnagar (USAS)**.

Domain: **usasbd.org**

## Positioning

The website is designed as the digital network of Shyamnagar's university students, alumni and future leaders, built around four pillars:

- Community
- Opportunity
- Knowledge
- Impact

## Stack

- Next.js 16.3.4
- React 19.2
- TypeScript
- App Router
- Static export for low-cost hosting
- No external font or UI dependency

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The static site is exported to `out/`.

## Deployment

Recommended first deployment: **Cloudflare Pages** or another static hosting provider.

- Build command: `npm run build`
- Output directory: `out`
- Production domain: `usasbd.org`

After the first deployment is live, connect `usasbd.org` and `www.usasbd.org` through the DNS provider used for the purchased domain.

## Content architecture

The first version includes the core homepage experience and static routes for the planned About, Community, Programs, Events, Knowledge, Impact, Get Involved, Transparency and Contact architecture.

The data and copy are centralized in `lib/site-data.ts` so the next phase can connect verified content and a CMS without redesigning the whole site.

## Before public launch

- Replace prototype/generic content with verified committee-approved copy.
- Add official social profiles and contact channels.
- Add verified community metrics.
- Connect membership and event forms to a real data backend.
- Add real member profiles only after defining privacy/consent rules.
- Add event photos, reunion archive material, reports and partner logos.
