# Assets Folder Guide — United New Style

This folder is where you add your **real brand and product media**. Nothing in
this repository invents or redesigns your final logo — the site currently
uses a styled text wordmark ("United New Style") as a placeholder so the
header and footer render correctly until your logo files are added.

## Folder structure

```
assets/
├── logo/         Brand logo, favicon, social share image
├── hero/         Homepage hero background image
├── categories/   Category card images (T-Shirts, Clothing, Fashion)
├── products/     Product photography
├── about/        Brand story / about section image
└── icons/        Reserved for any custom icon files (site currently uses inline SVG icons, so this is optional)
```

## 1. Logo (`assets/logo/`)

Add your final logo files here:

| File | Purpose | Recommended format |
|---|---|---|
| `logo.png` | Main logo for light/white backgrounds (header) | PNG, transparent background |
| `logo-white.png` | Logo variant for dark/navy backgrounds (footer) | PNG, transparent background |
| `favicon.ico` or `favicon.svg` | Browser tab icon | ICO or SVG, square |
| `social-share.jpg` | Image shown when the site link is shared (Open Graph) | JPG, 1200×630px |

**To swap the text wordmark for your logo image:**

In `index.html`, find the `<a class="logo">` block inside the `<header>` and
replace the `<span class="logo-wordmark">` markup with:

```html
<img src="assets/logo/logo.png" alt="United New Style" />
```

Do the same for the `.footer-brand` block in the footer, using
`assets/logo/logo-white.png`.

Once `assets/logo/favicon.svg` (or `.ico`) is replaced with your final
favicon, no other changes are needed — `index.html` already links to it.

## 2. Hero image (`assets/hero/`)

Add `hero-banner.jpg` (recommended 1920×1080px or larger, landscape). The
hero section in `css/style.css` already references this path with a navy
gradient as a fallback, so the site looks complete with or without it.

## 3. Category images (`assets/categories/`)

Add:
- `tshirts.jpg`
- `clothing.jpg`
- `fashion.jpg`

Recommended: 1000×1300px (portrait), consistent lighting and styling across
the three images.

## 4. Product images (`assets/products/`)

Add your product photography here (e.g. `product-1.jpg`, `product-2.jpg`,
...). Recommended: square or 3:4 portrait, consistent white/neutral
background, at least 1000px on the longest side.

Then, in `index.html`, inside each `.product-card` → `.product-media` div,
add an image tag before the placeholder icon, for example:

```html
<div class="product-media">
  <img src="assets/products/product-1.jpg" alt="Signature Crew Tee" />
  ...
</div>
```

The sample products currently on the homepage (names, prices, categories)
are placeholder catalog data — replace them with your real product
information.

## 5. About / brand story image (`assets/about/`)

Add `brand-story.jpg` (recommended 1000×1250px, portrait). Used in the
"About Brand" section.

## Notes

- All image paths above are already wired into `index.html` and
  `css/style.css` with graceful fallbacks (navy/gold gradients or icon
  placeholders), so the site will not show broken images while you prepare
  final photography — it will simply look more complete once files are
  added.
- Keep file names lowercase with hyphens, no spaces, to stay compatible
  with all hosting environments (including Hostinger).
