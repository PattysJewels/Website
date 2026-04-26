# Website name

### File Structure

```
pattys-jewels/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       ├── branding/
│       │   ├── logo.svg
│       │   └── wordmark.svg
│       ├── gallery/
│       │   ├── bracelets/
│       │   ├── necklaces/
│       │   ├── earrings/
│       │   └── featured/
│       ├── hero/
│       │   └── hero-main.jpg
│       └── placeholders/
│           └── product-placeholder.jpg
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── ui/
│   │   ├── scss/
│   │   │   ├── base/
│   │   │   │   ├── _reset.scss
│   │   │   │   ├── _typography.scss
│   │   │   │   └── _globals.scss
│   │   │   ├── abstracts/
│   │   │   │   ├── _variables.scss
│   │   │   │   ├── _mixins.scss
│   │   │   │   ├── _functions.scss
│   │   │   │   └── _breakpoints.scss
│   │   │   ├── layout/
│   │   │   │   ├── _container.scss
│   │   │   │   ├── _header.scss
│   │   │   │   ├── _footer.scss
│   │   │   │   └── _grid.scss
│   │   │   ├── components/
│   │   │   │   ├── _buttons.scss
│   │   │   │   ├── _cards.scss
│   │   │   │   ├── _gallery.scss
│   │   │   │   ├── _forms.scss
│   │   │   │   └── _contact.scss
│   │   │   ├── pages/
│   │   │   │   ├── _home.scss
│   │   │   │   ├── _gallery.scss
│   │   │   │   └── _contact.scss
│   │   │   └── main.scss
│   │   │
│   │   └── ts/
│   │       ├── main.ts
│   │       ├── gallery.ts
│   │       ├── contact-form.ts
│   │       └── utils/
│   │           ├── phone.ts
│   │           └── analytics.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── SeoHead.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── FeaturedGallery.astro
│   │   │   ├── AboutBrand.astro
│   │   │   ├── ContactCTA.astro
│   │   │   └── CustomOrderForm.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       ├── GalleryItem.astro
│   │       └── SectionTitle.astro
│   │
│   ├── content/
│   │   ├── site.json
│   │   ├── contact.json
│   │   ├── home.json
│   │   ├── gallery.json
│   │   ├── seo.json
│   │   └── products.json
│   │
│   ├── data/
│   │   ├── products.ts
│   │   ├── testimonials.ts
│   │   └── navigation.ts
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   │
│   ├── lib/
│   │   ├── formatters.ts
│   │   ├── content.ts
│   │   └── validators.ts
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── gallery.astro
│   │   ├── contact.astro
│   │   └── 404.astro
│   │
│   ├── styles/
│   │   └── main.scss
│   │
│   ├── types/
│   │   ├── content.ts
│   │   └── product.ts
│   │
│   └── env.d.ts
│
├── documentation/
│   ├── brand-notes.md
│   ├── content-plan.md
│   ├── deployment.md
│   ├── maintenance.md
│   ├── project-scope.md
│   └── site-map.md
│
├── notes/
│   ├── client-call-notes.md
│   ├── todo.md
│   ├── questions-for-patty.md
│   └── asset-checklist.md
│
├── scripts/
│   ├── optimize-images.ts
│   └── generate-sitemap.ts
│
├── .gitignore
├── .prettierrc
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```




