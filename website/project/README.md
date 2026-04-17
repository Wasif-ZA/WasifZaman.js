# Wasif Zaman — Portfolio

Neo-brutalist personal portfolio for [wasifzaman.tech](https://www.wasifzaman.tech).

## Stack

- **Framework** Next.js 16 (App Router) + Turbopack
- **Language** TypeScript
- **Styling** Tailwind CSS v4 (`@theme inline` tokens in `app/globals.css`)
- **Animation** Framer Motion
- **Icons** lucide-react

## Design identity

Neo-brutalist, non-negotiable:
- Off-white background (`--neo-bg: #FAF9F6`)
- Hard 3px (or 4px for modals/section dividers) black borders
- Offset black shadows (`shadow-neo`, `shadow-neo-lg`, `shadow-neo-sm`)
- Bold uppercase type
- Clashing accent colors: acid-green `--neo-primary`, hot-pink `--neo-secondary`, primary-blue `--neo-accent`

Design tokens live in `app/globals.css` — do not add magic hex values in components.

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Lint with `eslint-config-next` |

## Project layout

```
app/
  components/        # NeoButton, NeoCard, NeoTabs, ProjectModal, Marquee, Navbar
  globals.css        # Design tokens + marquee keyframes + stroke utilities
  layout.tsx         # Root layout + site-wide metadata
  page.tsx           # Single-page portfolio
  opengraph-image.tsx  # /opengraph-image (edge runtime)
  robots.ts          # /robots.txt
  sitemap.ts         # /sitemap.xml
public/
  project images/    # Project screenshots
```

## Deploy

Auto-deploys to Vercel from `main`. Branch previews build on push.

## Credits

Built by Wasif Zaman. Content licensed CC-BY 4.0 unless otherwise noted; code MIT.
