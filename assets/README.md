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

The header and footer on every page are generated from a single file —
`js/partials.js` — so you only need to change this in one place. Open
`js/partials.js` and in the `headerHTML()` function replace:

```js
'<span class="logo-wordmark">United <span>New Style</span></span>'
```

with:

```js
'<img src="assets/logo/logo.png" alt="United New Style" />'
```

Do the same inside `footerHTML()` using `assets/logo/logo-white.png` for the
dark footer background.

Once `assets/logo/favicon.svg` (or `.ico`) is replaced with your final
favicon, no other changes are needed — every page already links to it.

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
the three images. These power the category tiles on the homepage.

## 4. Product images (`assets/products/`)

Product data lives in one place: **`js/data/products.js`**. Every product
card, the quick-view modal, collection pages and the cart all read from this
file, so adding real photos is a data change, not a markup change.

Add your photography here (e.g. `heritage-crew-tee.jpg`), then open
`js/data/products.js` and set the `image` field on the matching product:

```js
{
  id: 'tee-heritage-crew',
  name: 'Heritage Crew Tee',
  // ...
  image: 'assets/products/heritage-crew-tee.jpg', // was: null
}
```

Once `image` is set, that product's card automatically shows the photo
instead of the icon placeholder — everywhere it appears. Recommended: 3:4
portrait, consistent white/neutral background, at least 1000px on the
longest side.

The four full product pages (`product-crew-tee.html`,
`product-oxford-shirt.html`, `product-denim-jacket.html`,
`product-didar-mubarak.html`) each have their own gallery with a main image
and 4 thumbnails — replace the placeholder `<div class="pdp-gallery-main">` /
`<button class="pdp-thumb">` blocks in those files with `<img>` tags pointing
at your photos.

For **`product-didar-mubarak.html`** specifically, add 4 photos to
`assets/products/didar-mubarak/`: a front flat-lay, an angled flat-lay, a
folded shot, and a lifestyle photo — matching the 4 reference images
supplied for this product — then wire them into the main image and the 4
thumbnail buttons on that page the same way.

The full catalog (18 sample products, names, prices, categories) is
placeholder data for the initial build — replace it with your real product
information in `js/data/products.js` when ready. See the comment at the top
of that file for the data shape.

## 5. About / brand story image (`assets/about/`)

Add `brand-story.jpg` (recommended 1000×1250px, portrait). Used in the
"About Brand" section on the homepage.

## Notes

- All image paths above are already wired into the site's CSS/JS with
  graceful fallbacks (navy/gold gradients or icon placeholders), so nothing
  will show as a broken image while you prepare final photography — pages
  will simply look more complete once files are added.
- Keep file names lowercase with hyphens, no spaces, to stay compatible
  with all hosting environments (including Hostinger).
