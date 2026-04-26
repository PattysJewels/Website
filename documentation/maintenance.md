# Jewels by Patty — Maintenance & Architecture Reference

This document explains the technical decisions behind the codebase so that anyone maintaining or extending this site understands *why* things are built the way they are, not just *what* they are.

---

## The Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Astro 6 | Static output, zero JS shipped by default |
| Package manager | Bun | Use `bun`, never `npm`. Lockfile is `bun.lock` |
| Styling | SCSS (Dart Sass) | Compiled to plain CSS at build time, no runtime cost |
| TypeScript | Vanilla TS, no framework | Nav toggle, form behavior — minimal and direct |
| Forms | Netlify Forms | `data-netlify="true"` — no backend or API needed |
| Hosting | Netlify | `netlify.toml` builds with `bun run build`, publishes `dist/` |
| Fonts | Google Fonts (preconnect) | Cormorant Garamond (body/headings) + Great Vibes (script/logo) |

**Always use Bun.** Running `npm install` will create a `package-lock.json` that conflicts with `bun.lock`. If that happens, delete `package-lock.json` and run `bun install` again.

---

## How the Site Is Structured

This is a three-page static site: Home (`/`), Gallery (`/gallery`), Contact (`/contact`), plus a 404 page.

Every page shares the same HTML shell — nav, footer, fonts, global styles — through `BaseLayout.astro`. The pages themselves only contain the content unique to that route. This means there is exactly one place to change the nav links, the footer, or the `<head>` tags.

---

## Astro: Pages and Layouts

### `BaseLayout.astro`

Every page wraps its content in `BaseLayout`:

```astro
<BaseLayout title="Page Title" description="Meta description">
  <!-- page content here -->
</BaseLayout>
```

`BaseLayout` provides:
- The `<html>`, `<head>`, and `<body>` shell
- Google Fonts preconnect and stylesheet link
- The global SCSS import (`main.scss`)
- The `<nav>` and `<ul class="nav__links">` (see nav note below)
- The `<footer>`
- The `<script>` that loads `main.ts`

If the title or description props are omitted, defaults are used (set at the top of `BaseLayout.astro`).

### Why `nav__links` Is Outside `<nav>`

In `BaseLayout.astro`, the `<ul class="nav__links">` is a sibling of `<nav>`, not a child:

```html
<nav class="nav">...</nav>
<ul class="nav__links">...</ul>  <!-- intentionally outside nav -->
```

This is not a mistake. The `<nav>` element uses `backdrop-filter: blur(8px)` for the frosted glass effect. `backdrop-filter` creates a new stacking context, which traps any `position: fixed` child — it becomes fixed relative to the nav element, not the viewport. If `nav__links` were inside `<nav>`, the mobile overlay could never cover the full screen.

Placing it outside means `position: fixed` works correctly against the viewport.

### Pages Are Thin

Pages (`index.astro`, `contact.astro`, `gallery.astro`) contain very little logic. Their job is to:
1. Import `BaseLayout` and the relevant JSON content
2. Do any minimal data wiring in the frontmatter (filter arrays, build href strings)
3. Render HTML using the imported content

All text on every page comes from the JSON files in `src/content/`. The Astro files are just templates.

---

## JSON Content System

All editable content lives in `src/content/`. This is intentional — it means you can update copy, phone numbers, product data, and form labels without touching any Astro or SCSS files.

### `home.json`

Drives every text string on the home page. Structure mirrors the page sections:

```json
{
  "hero": { "eyebrow", "title", "sub", "ctaText", "ctaHref" },
  "about": { "label", "title", "body" (array of paragraphs), "ctaText", "ctaHref", "image", "imageAlt" },
  "featured": { "label", "title", "sub", "maxItems", "ctaText", "ctaHref" },
  "craft": { "label", "title", "items" (array of { icon, title, body }) },
  "cta": { "label", "title", "sub", "ctaText", "ctaHref" }
}
```

`hero.image` is the background image path for the hero section. `about.image` is the photo in the about section. Both should eventually be replaced with real photos of Patty's work.

### `products.json`

An array of jewelry items. Each item has:

```json
{
  "id": "bracelet-001",
  "name": "Stone Bracelet",
  "category": "bracelets",
  "image": "/images/gallery/bracelets/bracelet-001.jpg",
  "placeholder": "https://...",
  "alt": "...",
  "featured": true,
  "materials": ["natural stone", "metal spacers"]
}
```

Two image fields:
- `image` — the real image path in `public/images/gallery/`. This is what the live site should use.
- `placeholder` — a temporary external URL used while real photos are not yet available. In `index.astro`, the code uses `product.placeholder || product.image`, so if a placeholder exists it takes priority.

**When Patty provides real photos:** Add the file to `public/images/gallery/[category]/`, set the `image` path, and either remove the `placeholder` field or leave it — the `||` fallback means the real image will never show until `placeholder` is gone. So delete the `placeholder` field for each item as real photos are added.

`featured: true` controls which items appear in the "Featured Pieces" section on the home page. `maxItems` in `home.json` controls how many are shown (currently 3).

### `contact.json`

Controls everything on the contact page:

- `phone` — Patty's phone number as a display string, e.g., `"(301) 456-4494"`. The Astro page strips non-digits to build the `tel:` href automatically.
- `phoneCard` — the sidebar card next to the form (eyebrow, CTA button text, fallback note if phone is missing, copy text)
- `form.sections` — every label, legend, and option array for all 7 form sections

**To update Patty's phone number:** Change `contact.json` → `"phone"`. The `tel:` link is generated automatically.

**To add or remove a form option:** Find the relevant `Options` array inside `form.sections` and add or remove a string. The Astro template loops over these arrays — no markup changes needed.

### `site.json`

Global business info (site name, tagline, phone fallback). `contact.astro` falls back to `site.phone` if `contact.json` has no phone set:

```ts
const displayPhone = contactContent.phone || site.phone || 'TBD';
```

So the phone number can live in either file. `contact.json` takes priority.

### `seo.json`

Default title and description used when a page does not pass its own props to `BaseLayout`. The home page imports this and passes it explicitly.

---

## Netlify Forms

The contact form works through Netlify's built-in form handling. No backend, no API keys, no third-party service.

The form tag in `contact.astro`:

```html
<form
  name="custom-order"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  enctype="multipart/form-data"
>
  <input type="hidden" name="form-name" value="custom-order" />
  <input type="hidden" name="bot-field" />
  ...
</form>
```

- `data-netlify="true"` tells Netlify to intercept and handle the submission
- `netlify-honeypot="bot-field"` is a spam trap — bots fill the hidden field, humans don't, and Netlify filters those out
- `enctype="multipart/form-data"` is required because the form accepts file uploads (reference photos)
- The hidden `form-name` input is required by Netlify when the form is rendered by a framework (Astro) rather than plain HTML

Submissions appear in the Netlify dashboard under **Forms**. Netlify can also be configured to send email notifications for each submission.

---

## SCSS Architecture

### The Two-Tiered Variable System

This is the most important pattern in the stylesheet. There are two kinds of variables:

**SCSS variables (`$name`)** exist only at build time. They are resolved when SCSS compiles to CSS and then they disappear. The browser never sees them. They exist for one purpose: doing math.

**CSS custom properties (`--name`)** exist at runtime inside the compiled CSS. They are inherited by every element via the cascade and can be referenced from any file without imports.

```scss
// _variables.scss

// Tier 1 — SCSS computes the gold palette from one source
$accent: #c9a84c;
$accent-dark:    color.scale($accent, $lightness: -12%);
$accent-light:   color.scale($accent, $lightness: 22%);

// Tier 2 — Results become CSS custom properties
:root {
  --gold:       #{$accent-dark};    // #{} interpolation is required here
  --gold-light: #{$accent-light};
}
```

Everything in every other SCSS file uses `var(--gold)`, never `$accent-dark`.

**Why not use `$accent-dark` everywhere?**
With modern SCSS `@use`, variables are module-scoped. Every partial that needed `$accent-dark` would have to `@use '../abstracts/variables'` at the top. CSS custom properties on `:root` are global via the cascade — no import needed anywhere.

**Why not use CSS custom properties for the math?**
CSS has no native `color.scale()` equivalent. SCSS does the computation at build time, then hands the results to custom properties.

**To change the entire gold palette sitewide:** Change the `$accent` hex on line 4 of `_variables.scss`. Run `bun run build`. Every gold token updates automatically.

### Load Order in `main.scss`

```
abstracts/   ← variables only (no CSS output, just :root block)
base/        ← reset, typography, global utilities
layout/      ← header, footer, container
components/  ← buttons, cards, gallery, forms, contact card
pages/       ← home, gallery, contact (page-specific styles)
```

Each layer can use what came before it. Page-level files are loaded last so they can override component defaults without specificity fights.

### Component Override Pattern

The base `.btn` in `components/_buttons.scss` defines the default style (gold border, transparent background, charcoal text). When a button needs different treatment in a specific section, the page partial adds a context selector:

```scss
// pages/_home.scss — hero button is solid gold
.hero__content .btn {
  background: var(--gold);
  color: var(--white);
}
```

This keeps the base component clean. All context overrides live in the relevant page partial and are traceable by searching for the component class name.

### SCSS Rules

- Use `@use`, never `@import`. `@import` is deprecated in Dart Sass.
- Use `color.scale($color, $lightness: X%)`, never `darken()` or `lighten()`.
- No hardcoded hex values outside `_variables.scss`. Everything else uses `var(--token)`.

---

## Key CSS Decisions

### iOS Safari Address Bar

The mobile nav overlay uses:

```scss
.nav__links {
  top: -3rem;
  min-height: calc(100dvh + 3rem);
}
```

`100dvh` is the dynamic viewport height — it accounts for the iOS address bar. The extra `3rem` bleed above the viewport covers the transparent address bar area that sits outside `position: fixed` bounds. Without this, a sliver of the page would be visible above the overlay on iPhone.

### Body Scroll Lock

When the mobile nav opens, `main.ts` sets:

```ts
document.body.style.overflow = open ? 'hidden' : '';
```

The empty string `''` on close removes the inline style entirely rather than setting `overflow: auto`, which would conflict with the body's default behavior.

### Fluid Typography with `clamp()`

Font sizes use `clamp(min, fluid, max)` throughout rather than breakpoint media queries:

```scss
font-size: clamp(4rem, 12vw, 8rem);
```

`4rem` is the floor (mobile), `8rem` is the ceiling (wide desktop), `12vw` is the fluid value in between. This avoids font-size jumps at breakpoints.

### The `.wrapper` Class

The max-width container is a single utility class:

```scss
.wrapper {
  max-width: 1160px;
  margin-inline: auto;
  padding-inline: 1.75rem;
}
```

It is not scoped to any component. Apply it to any element that needs to be constrained to the content column.

### Script Font Padding

`.main_header` (the "Jewels by Patty" hero headline) uses `background-clip: text` for the shimmer gradient. This clips the gradient exactly to the text bounding box. Without padding, the font's descenders and flourishes get cut off.

The padding is in `em` units so it scales with the fluid `font-size`:

```scss
.main_header {
  padding: 0.2em 0.15em 0.35em;
}
```

Do not add `letter-spacing` to this element. Letter-spacing adds space after the last glyph, which falls outside the gradient background area and produces a visible clip on the right edge of the text.

---

## Color Reference

All colors are CSS custom properties. Change them in `_variables.scss`.

| Token | Approximate Value | Used for |
|---|---|---|
| `--cream` | off-white warm | Default page background |
| `--cream-mid` | slightly warmer | Featured/alternating section backgrounds |
| `--cream-dark` | deeper cream | CTA band, subtle borders |
| `--gold` | dark gold (derived) | Borders, label text, icon accents |
| `--gold-mid` | `#c9a84c` base | Base gold, shimmer midpoint |
| `--gold-light` | lighter gold | Image outlines, hover states |
| `--gold-pale` | very light gold | Form borders, section dividers |
| `--charcoal` | `#2a2620` near-black | Footer background, strong text, nav bars |
| `--text` | dark warm brown | Body copy |
| `--text-muted` | medium warm gray | Subtext, captions, form labels |
| `--silver` | cool gray | Footer copyright |
| `--white` | `#ffffff` | Card surfaces, button text on gold |
| `--shimmer-*` | derived | `.main_header` gradient only |
| `--nav-bg` | cream 88% opacity | Frosted nav bar |
| `--hero-overlay` | cream 82% opacity | Wash over hero background image |
| `--shine` | white 25% opacity | Gallery card hover shimmer |

---

## Common Maintenance Tasks

### Change the gold color sitewide
`src/assets/scss/abstracts/_variables.scss` → change `$accent` on line 4.

### Update Patty's phone number
`src/content/contact.json` → change `"phone"`. The display string and `tel:` link are both generated from this field automatically.

### Add or remove a contact form option
`src/content/contact.json` → find the relevant `Options` array inside `form.sections` and add/remove a string. No markup changes needed — the Astro template loops over the array.

### Add a real gallery photo
1. Add the image file to `public/images/gallery/[category]/`
2. Open `src/content/products.json`
3. Set `"image"` to the file path (e.g., `"/images/gallery/bracelets/bracelet-001.jpg"`)
4. Delete the `"placeholder"` field for that item

### Add a new product to the gallery
Add an object to `src/content/products.json`. Set `"featured": true` to include it in the home page featured section (limited to `maxItems` in `home.json`).

### Update homepage copy
`src/content/home.json` — every section label, heading, paragraph, and CTA is here.

### Add a new page
1. Create `src/pages/yourpage.astro` and wrap it in `BaseLayout`
2. If it needs page-specific styles, create `src/assets/scss/pages/_yourpage.scss`
3. Add `@use 'pages/yourpage'` to `src/assets/scss/main.scss`
4. Add a nav link to `BaseLayout.astro` inside `<ul class="nav__links">`

---

## What Not to Do

- **Do not use `@import` in SCSS.** This project uses `@use`. `@import` is deprecated.
- **Do not use `darken()` or `lighten()`.** Use `color.scale($color, $lightness: X%)`.
- **Do not hardcode hex values** in any SCSS file other than `_variables.scss`.
- **Do not run `npm install`.** Use `bun install`.
- **Do not move `nav__links` inside `<nav>`.** The `backdrop-filter` on nav creates a stacking context that would trap `position: fixed` children.
- **Do not add `letter-spacing` to `.main_header`.** It causes the shimmer gradient to be clipped on the trailing edge.
- **Do not set `font-weight` above 400 on headings.** Cormorant Garamond is a display serif; heavier weights lose the elegance.
- **Do not remove `enctype="multipart/form-data"` from the contact form.** Without it, file uploads will fail silently.
