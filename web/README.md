# True North IT Consulting Website

The rebuilt company website: a Next.js static export in `web/`. It replaces the old React app in `tnorth/` and keeps using the existing contact API in `backend/`.

## Run It

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

`npm run build` first runs `scripts/check-content.mjs`, which fails on em or en dashes in copy, on the old company names, and on the invented clients and claims removed from the old site.

## Configuration

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_ORIGIN` | Canonical domain | `https://truenorthitc.com` |
| `NEXT_PUBLIC_CONTACT_API` | Contact form endpoint | the existing API on Vercel |
| `NEXT_PUBLIC_GRIT_URL` | GRIT's own website | unset: GRIT links go to `/grit/` |

The contact API only accepts requests from truenorthitc.com (and the origins in `backend/server.js`). From any other address the form shows a "send it by email" fallback, so no enquiry is lost.

## Content Rules

Only real claims. No invented clients, testimonials, results or metrics. Add real testimonials to `TESTIMONIALS` in `src/lib/content.ts` once a client agrees to be quoted. GRIT numbers come from the GRIT architecture documents.

## Deploy

Firebase Hosting, same project as before: `cd web && npm run build && firebase deploy --only hosting`. `firebase.json` here serves `out/` with clean URLs.
