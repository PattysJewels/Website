
# Patty's Jewels Project Structure Guide

This document explains the recommended file structure for the Patty's Jewels website project, what each folder is for, what kinds of files belong there, and how to keep the project organized as it grows.

---

## Top-Level Structure

```text
pattys-jewels/
├── public/
├── src/
├── documentation/
├── notes/
├── scripts/
├── .gitignore
├── .prettierrc
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## 1. `public/`

Use `public/` for files that should be served directly by Astro without processing.

```text
public/
├── favicon.svg
├── robots.txt
└── images/
    ├── branding/
    ├── gallery/
    ├── hero/
    └── placeholders/
```

### What goes here
- Final website images
- Business logo files
- Hero/banner images
- Jewelry gallery images
- Favicon
- Static files like `robots.txt`

### Why this folder exists
Anything in `public/` becomes directly accessible on the live site.

Example:
- `public/images/gallery/bracelets/bracelet-001.jpg`
- accessible as `/images/gallery/bracelets/bracelet-001.jpg`

### Recommended image structure

```text
public/images/
├── branding/
│   ├── logo.svg
│   └── wordmark.svg
├── hero/
│   └── hero-main.jpg
├── gallery/
│   ├── bracelets/
│   ├── necklaces/
│   ├── earrings/
│   ├── rings/
│   └── featured/
└── placeholders/
    └── product-placeholder.jpg
```

### Put these items here
- Patty's logo once finalized
- Final exported jewelry photos
- Hero image for homepage
- Placeholder image if a product image is missing

---

## 2. `src/`

This is the main code folder. All Astro pages, components, styles, TypeScript, and content live here.

```text
src/
├── assets/
├── components/
├── content/
├── data/
├── layouts/
├── lib/
├── pages/
├── styles/
├── types/
└── env.d.ts
```

---

## 3. `src/assets/`

Use this for project assets that are part of the source code or build system.

```text
src/assets/
├── images/
├── scss/
└── ts/
```

### Purpose
This folder is for source-side assets, not final client content.

### Good uses
- UI icons
- SCSS partials
- TS utility scripts
- design files used internally

### Avoid putting client gallery images here
Jewelry images that will be displayed on the site should usually go in `public/images/`.

---

## 4. `src/assets/images/`

```text
src/assets/images/
├── icons/
└── ui/
```

### What goes here
- Small interface graphics
- SVG icons
- Decorative UI graphics
- Background patterns used in the site design

### Do not use this for
- Patty's main gallery photos
- business images that belong in `public/images/`

---

## 5. `src/assets/scss/`

This is the SCSS architecture folder.

```text
src/assets/scss/
├── abstracts/
├── base/
├── layout/
├── components/
├── pages/
└── main.scss
```

### 5a. `src/assets/scss/abstracts/`

```text
abstracts/
├── _variables.scss
├── _mixins.scss
├── _functions.scss
└── _breakpoints.scss
```

### What goes here
Global SCSS tools used throughout the project.

#### `_variables.scss`
Put:
- colors
- font sizes
- spacing values
- shadows
- border radius tokens

Example:
```scss
$color-primary: #7b4f35;
$color-accent: #d6b36a;
$color-text: #2a2a2a;
$radius-md: 12px;
$spacing-lg: 2rem;
```

#### `_mixins.scss`
Put:
- reusable media-query helpers
- flex helpers
- button patterns

#### `_functions.scss`
Put:
- SCSS helper functions if needed

#### `_breakpoints.scss`
Put:
- breakpoint values
- responsive helper constants

---

### 5b. `src/assets/scss/base/`

```text
base/
├── _reset.scss
├── _typography.scss
└── _globals.scss
```

### What goes here
Site-wide foundational styles.

#### `_reset.scss`
- normalize/reset rules

#### `_typography.scss`
- body text styling
- heading styles
- paragraph defaults
- link styling

#### `_globals.scss`
- body background
- general spacing defaults
- shared utility classes

---

### 5c. `src/assets/scss/layout/`

```text
layout/
├── _container.scss
├── _header.scss
├── _footer.scss
└── _grid.scss
```

### What goes here
Large structural layout styles.

#### `_container.scss`
- max-width wrappers
- standard page padding

#### `_header.scss`
- site header styles
- nav spacing
- top branding area

#### `_footer.scss`
- footer styling
- contact info display
- copyright section

#### `_grid.scss`
- reusable layout grids
- responsive columns

---

### 5d. `src/assets/scss/components/`

```text
components/
├── _buttons.scss
├── _cards.scss
├── _gallery.scss
├── _forms.scss
└── _contact.scss
```

### What goes here
Styles for reusable components.

#### `_buttons.scss`
- CTA buttons
- secondary buttons
- phone call buttons

#### `_cards.scss`
- product cards
- featured item cards

#### `_gallery.scss`
- image grid styling
- hover behavior
- responsive gallery layout

#### `_forms.scss`
- inquiry form
- custom order form fields
- labels, inputs, validation states

#### `_contact.scss`
- phone display section
- contact methods block

---

### 5e. `src/assets/scss/pages/`

```text
pages/
├── _home.scss
├── _gallery.scss
└── _contact.scss
```

### What goes here
Page-specific styles only.

#### `_home.scss`
- hero layout
- featured section
- homepage intro

#### `_gallery.scss`
- page-level gallery spacing or filters

#### `_contact.scss`
- custom order page layout
- contact page spacing

---

### 5f. `src/assets/scss/main.scss`

This is the main SCSS entry file.

### What goes here
Imports for all SCSS partials.

Example:
```scss
@use "abstracts/variables";
@use "abstracts/mixins";
@use "base/reset";
@use "base/typography";
@use "base/globals";
@use "layout/container";
@use "layout/header";
@use "layout/footer";
@use "components/buttons";
@use "components/cards";
@use "components/gallery";
@use "components/forms";
@use "pages/home";
@use "pages/gallery";
@use "pages/contact";
```

---

## 6. `src/assets/ts/`

```text
src/assets/ts/
├── main.ts
├── gallery.ts
├── contact-form.ts
└── utils/
    ├── phone.ts
    └── analytics.ts
```

### What goes here
Client-side TypeScript.

#### `main.ts`
- general site-wide interactions
- nav behavior
- small global enhancements

#### `gallery.ts`
- gallery-specific behavior
- category filtering if added later
- lightbox support if added

#### `contact-form.ts`
- form validation
- submission handling
- feedback messages

#### `utils/phone.ts`
- phone formatting helpers
- click-to-call formatting

#### `utils/analytics.ts`
- optional event tracking hooks

---

## 7. `src/components/`

Reusable Astro components.

```text
src/components/
├── layout/
├── sections/
└── ui/
```

### 7a. `src/components/layout/`

```text
layout/
├── Header.astro
├── Footer.astro
├── Navigation.astro
└── SeoHead.astro
```

### What goes here
Site-wide layout components.

#### `Header.astro`
- top logo
- nav
- CTA button

#### `Footer.astro`
- phone number
- simple copyright
- contact prompt

#### `Navigation.astro`
- menu links

#### `SeoHead.astro`
- page title
- meta description
- Open Graph tags

---

### 7b. `src/components/sections/`

```text
sections/
├── Hero.astro
├── FeaturedGallery.astro
├── AboutBrand.astro
├── ContactCTA.astro
└── CustomOrderForm.astro
```

### What goes here
Larger reusable page sections.

#### `Hero.astro`
Homepage hero section.

#### `FeaturedGallery.astro`
Shows selected jewelry pieces on the homepage.

#### `AboutBrand.astro`
Short section describing Patty's jewelry style and materials.

#### `ContactCTA.astro`
Prompt to call or request a custom order.

#### `CustomOrderForm.astro`
Reusable form block.

---

### 7c. `src/components/ui/`

```text
ui/
├── Button.astro
├── Card.astro
├── GalleryItem.astro
└── SectionTitle.astro
```

### What goes here
Smaller UI building blocks.

#### `Button.astro`
- standard button wrapper

#### `Card.astro`
- generic content card

#### `GalleryItem.astro`
- one jewelry item display

#### `SectionTitle.astro`
- reusable section heading block

---

## 8. `src/content/`

This is the best place for client-editable text and structured JSON content.

```text
src/content/
├── site.json
├── contact.json
├── home.json
├── gallery.json
├── seo.json
└── products.json
```

### Why this folder matters
This makes it easier to change copy later without digging through Astro components.

### 8a. `src/content/site.json`

Put global business information here.

Example:
```json
{
  "siteName": "Patty's Jewels",
  "tagline": "Handcrafted jewelry with real stones and custom charm.",
  "phone": "(555) 555-5555",
  "email": "",
  "businessLocation": "Baltimore, MD"
}
```

### Put here
- business name
- tagline
- phone number
- email if added
- location if relevant

---

### 8b. `src/content/home.json`

Put homepage copy here.

Example:
```json
{
  "heroTitle": "Handcrafted Jewelry with Personality",
  "heroText": "Browse Patty's jewelry and reach out for custom pieces made with care.",
  "ctaText": "Request a Custom Order",
  "featuredSectionTitle": "Featured Pieces",
  "aboutTitle": "About Patty's Jewels",
  "aboutText": "Patty creates jewelry with real stones, thoughtful color combinations, and unique details."
}
```

### Put here
- homepage hero headline
- hero paragraph
- CTA text
- short about section copy

---

### 8c. `src/content/contact.json`

Put contact page copy here.

Example:
```json
{
  "contactTitle": "Get in Touch",
  "contactText": "Interested in a piece or want something custom? Reach out by phone or through the form.",
  "showPhone": true,
  "showForm": true
}
```

### Put here
- contact page heading
- phone/contact instructions
- form display flags

---

### 8d. `src/content/gallery.json`

Put page-specific gallery text here.

Example:
```json
{
  "galleryTitle": "Jewelry Gallery",
  "galleryIntro": "Browse recent and featured pieces from Patty's collection."
}
```

---

### 8e. `src/content/seo.json`

Put SEO defaults here.

Example:
```json
{
  "defaultTitle": "Patty's Jewels",
  "defaultDescription": "Handcrafted jewelry with real stones and custom designs.",
  "ogImage": "/images/hero/hero-main.jpg"
}
```

---

### 8f. `src/content/products.json`

Put jewelry item metadata here.

Example:
```json
[
  {
    "id": "bracelet-001",
    "name": "Stone Bracelet",
    "category": "bracelets",
    "image": "/images/gallery/bracelets/bracelet-001.jpg",
    "alt": "Handmade stone bracelet",
    "featured": true,
    "materials": ["real stone", "metal spacer"]
  }
]
```

### Put here
- product name
- category
- image path
- alt text
- featured flag
- materials
- optional description

### Good use
This lets you add or remove gallery items without editing the component markup directly.

---

## 9. `src/data/`

```text
src/data/
├── products.ts
├── testimonials.ts
└── navigation.ts
```

### What goes here
Use `data/` for content that benefits from TypeScript logic instead of raw JSON.

#### `products.ts`
Use only if product data needs transformation or validation.

#### `testimonials.ts`
Optional future use if Patty gets customer quotes.

#### `navigation.ts`
Navigation link definitions.

Example:
```ts
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" }
];
```

---

## 10. `src/layouts/`

```text
src/layouts/
├── BaseLayout.astro
└── PageLayout.astro
```

### What goes here

#### `BaseLayout.astro`
Main site layout wrapper for:
- HTML shell
- head tags
- global styles
- header/footer

#### `PageLayout.astro`
Optional page wrapper for internal consistency.

---

## 11. `src/lib/`

```text
src/lib/
├── formatters.ts
├── content.ts
└── validators.ts
```

### What goes here
General helpers that do not belong directly in components.

#### `formatters.ts`
- phone formatting
- title cleanup
- display string helpers

#### `content.ts`
- JSON import helpers
- content normalization

#### `validators.ts`
- contact form validation
- schema checks

---

## 12. `src/pages/`

Actual route files.

```text
src/pages/
├── index.astro
├── gallery.astro
├── contact.astro
└── 404.astro
```

### What goes here

#### `index.astro`
Homepage

#### `gallery.astro`
Gallery page

#### `contact.astro`
Contact/custom-order page

#### `404.astro`
Not found page

---

## 13. `src/styles/`

```text
src/styles/
└── main.scss
```

### Recommended note
You do not need both `src/styles/main.scss` and `src/assets/scss/main.scss` unless you have a reason.

Use one approach.

### Better recommendation
Use:
- `src/assets/scss/` for all partials
- `src/assets/scss/main.scss` as the main stylesheet entry

If you do that, you can remove `src/styles/` completely.

---

## 14. `src/types/`

```text
src/types/
├── content.ts
└── product.ts
```

### What goes here
TypeScript types and interfaces.

#### `content.ts`
Types for JSON file shapes.

Example:
```ts
export interface SiteContent {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  businessLocation: string;
}
```

#### `product.ts`
Types for gallery/product items.

Example:
```ts
export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  alt: string;
  featured: boolean;
  materials: string[];
}
```

---

## 15. `documentation/`

Formal project documentation.

```text
documentation/
├── brand-notes.md
├── content-plan.md
├── deployment.md
├── maintenance.md
├── project-scope.md
└── site-map.md
```

### What goes here

#### `brand-notes.md`
- visual style decisions
- color palette
- tone notes

#### `content-plan.md`
- which text belongs on each page
- missing copy still needed

#### `deployment.md`
- hosting steps
- domain setup
- DNS notes
- launch checklist

#### `maintenance.md`
- how to update the site later
- how to swap images
- what the client owns vs what you manage

#### `project-scope.md`
- deliverables
- exclusions
- agreed features

#### `site-map.md`
- simple site architecture

---

## 16. `notes/`

Informal working notes.

```text
notes/
├── client-call-notes.md
├── todo.md
├── questions-for-patty.md
└── asset-checklist.md
```

### What goes here

#### `client-call-notes.md`
- call summaries
- client comments
- business notes

#### `todo.md`
- build tasks
- bug list
- launch checklist

#### `questions-for-patty.md`
- missing content questions
- confirmation items

#### `asset-checklist.md`
- logo received?
- phone number confirmed?
- photos received?
- domain approved?

---

## 17. `scripts/`

```text
scripts/
├── optimize-images.ts
└── generate-sitemap.ts
```

### What goes here
Developer utilities.

#### `optimize-images.ts`
- resize/compress jewelry photos

#### `generate-sitemap.ts`
- optional site map generation

---

## 18. Root Files

### `.gitignore`
Ignore:
- `node_modules`
- build output
- `.env`
- OS junk files

### `.prettierrc`
Formatting rules for project consistency.

### `astro.config.mjs`
Astro project config.

### `package.json`
Dependencies and scripts.

### `package-lock.json`
Lockfile.

### `tsconfig.json`
TypeScript config.

### `README.md`
Project overview.

Suggested README sections:
- project name
- stack
- how to run locally
- folder structure summary
- deployment notes

---


## 20. Final Organizational Rules

### Put in `public/`
- final client-facing images
- favicon
- robots.txt

### Put in `src/content/`
- text content
- business info
- product metadata
- contact info
- SEO defaults

### Put in `src/components/`
- reusable Astro UI pieces

### Put in `src/pages/`
- actual route files

### Put in `src/assets/scss/`
- all styles and SCSS architecture

### Put in `src/assets/ts/`
- browser-side scripts

### Put in `src/types/`
- TS interfaces and types

### Put in `documentation/`
- formal project docs

### Put in `notes/`
- scratch notes and client follow-ups

---


## 22. Recommendation on Content Editing

For this project, the smartest structure is:

- **JSON for editable text and product data**
- **Astro components for page layout**
- **SCSS partials for styling**
- **TypeScript only where interaction is needed**

That keeps the site easy to update later without overengineering it.
