# WasifZaman.js

Personal portfolio for Wasif Zaman, live at **[wasifzaman.tech](https://www.wasifzaman.tech)**.

A single-page Next.js site in a neo-brutalist style. Every project on it links to
either a running deployment or a public repository, and every claim in the copy is
taken from the CV in `public/resume.pdf`.

## Stack

| Piece | What |
|---|---|
| Framework | Next.js 16, App Router, Turbopack |
| Language | TypeScript |
| Styling | Tailwind CSS v4, tokens in `app/globals.css` under `@theme inline` |
| Animation | Framer Motion |
| Icons | lucide-react |
| Hosting | Vercel |

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Node 20 or newer.

## Layout

```
app/
  page.tsx           the whole page: data at the top, sections below
  layout.tsx         metadata, fonts
  lib/site.ts        canonical URL, title, description (single source)
  components/        NeoCard, NeoButton, Marquee, ProjectModal, ArchDiagram, navbar
  globals.css        palette tokens, focus rings, reduced-motion
  opengraph-image.tsx, sitemap.ts, robots.ts
public/
  projects/          project screenshots
  resume.pdf         the CV the hero button downloads (see note below)
```

The app lives at the repository root. It used to sit under `website/project/`, which
meant Vercel needed a Root Directory override; flattening it removed that.

## The served CV

`public/resume.pdf` is a **web variant**: the mobile number is redacted out of the
content stream, so it cannot be extracted by a scraper. Email, GitHub, LinkedIn and
the site URL remain. The unredacted original lives outside this repository.

If you regenerate the CV, redact it again before committing. Check with:

```bash
python -c "import re;from pypdf import PdfReader;print(bool(re.search(r'04\d\d', ''.join(p.extract_text() or '' for p in PdfReader('public/resume.pdf').pages))))"
```

`False` means clean.

## Editing content

All copy lives in the `DATA` block at the top of `app/page.tsx`: `PROJECTS`,
`EXPERIENCE`, `EDUCATION`, `CERTIFICATES`, `TOOLBOX`, `FOCUS_AREAS`, `HERO_PROOF`.
Nothing below that block needs touching to change what the site says.

Two rules the content is held to:

1. **A link is only added after it returns 200.** A repository name that looks like
   it should have a deployment usually does not; `autodocs.vercel.app` and
   `aibo.vercel.app` belong to other people, and `tryconduit.dev` no longer resolves.
2. **A project tile shows real output or nothing.** Screenshots in `public/projects/`
   are captures of the running thing. Projects with no interface get an `arch`
   pipeline drawn by `components/ArchDiagram.tsx` instead of a stock image.

## Design rules

Neo-brutalist, and consistent about it:

- Off-white ground `--neo-bg: #FAF9F6`, black text, hard black borders
- `border-[3px]` for cards, buttons and inline elements; `border-[4px]` for section
  dividers and modals
- Offset shadows: `shadow-neo-sm`, `shadow-neo`, `shadow-neo-lg`
- Accents: acid green `--neo-primary`, hot pink `--neo-secondary`, blue `--neo-accent`

Text colour on an accent is decided by measured contrast, not by eye. White on
`#0000FF` is 8.59:1 and fine; white on `#FF00FF` is 3.14:1 and fails WCAG AA, so hot
pink always carries black text.

## Accessibility

- Explicit `:focus-visible` outline on every interactive element, because the hard
  borders swallow the native one
- `prefers-reduced-motion` honoured in CSS and through Framer Motion's
  `useReducedMotion`, which covers the marquee, the hero tilt, the per-letter title
  animation and the custom cursor
- Focus trapped, restored, and Escape-closable in both the project modal and the
  mobile menu
- One tab stop per project card, not two

## Licence

MIT. See [LICENSE](LICENSE).
