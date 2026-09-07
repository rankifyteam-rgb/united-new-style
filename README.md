# United New Style

Premium online garment store — official website source.

- **Website:** [www.unitednewstyle.com](https://www.unitednewstyle.com)
- **Email:** info@unitednewstyle.com
- **Categories:** T-Shirts • Clothing • Fashion

## About this repository

This is a static HTML/CSS/JavaScript website — no build step, no framework
and no server-side dependencies required. It is ready to deploy directly to
Hostinger (or any static host). The site includes a working front-end cart
and wishlist (backed by the browser's `localStorage`), product filtering and
sorting, and a quick-view modal — all client-side, ready for a real
commerce backend to be connected later (see "Notes for future development"
below).

## Project structure

```
united-new-style/
├── index.html                Homepage
├── shop.html                 All Products (collection page)
├── shop-tshirts.html         T-Shirts collection page
├── shop-clothing.html        Clothing collection page
├── shop-fashion.html         Fashion collection page
├── product-crew-tee.html     Product detail page — Heritage Crew Tee
├── product-oxford-shirt.html Product detail page — Heritage Oxford Shirt
├── product-denim-jacket.html Product detail page — Premium Denim Jacket
├── cart.html                 Shopping bag page
├── faq.html                  FAQ page
├── shipping-returns.html     Shipping & Returns policy
├── privacy-policy.html       Privacy Policy
├── terms-of-service.html     Terms of Service
├── 404.html                  Custom "page not found" page
├── robots.txt                Search engine crawl rules
├── sitemap.xml                Sitemap for SEO
├── css/
│   └── style.css             Full design system: layout, components, responsive rules
├── js/
│   ├── partials.js           Shared header/footer/nav/drawers/quick-view — single source of truth for every page
│   ├── ui.js                 Cross-page interactions (menus, drawers, quick view, search, accordions)
│   ├── cart.js                Cart state (localStorage), used by every page
│   ├── wishlist.js           Wishlist state (localStorage)
│   ├── render.js              Shared product card / star rating rendering
│   ├── data/
│   │   └── products.js       Product catalog — single source of truth for all pricing/inventory data
│   └── pages/
│       ├── home.js            Homepage-specific rendering
│       ├── collection.js      Collection page filtering/sorting
│       ├── product.js         Product detail page logic
│       └── cart.js            Cart page rendering
└── assets/                   Your logo & image files go here — see assets/README.md
    ├── logo/
    ├── hero/
    ├── categories/
    ├── products/
    ├── about/
    └── icons/
```

## Adding your logo and images

No final logo or product photography has been invented for this project.
The header currently shows a styled text wordmark ("United New Style") as a
placeholder. **See [assets/README.md](assets/README.md)** for exact file
names, recommended sizes, and the small code changes needed to swap in your
real logo, hero image, category photos and product photography once
they're ready.

## The product catalog

All product data (names, prices, sale prices, sizes, ratings, descriptions)
lives in **`js/data/products.js`** as a single array. Every page — the
homepage's Best Sellers/New Arrivals, the collection pages, the cart, and
the quick-view modal — reads from this one file, so there is only one place
to update pricing or inventory. The 18 products currently in the catalog are
placeholder data for the initial build; replace them with your real product
information when ready (or later, swap the static array for a `fetch()`
call to a real backend — every page already reads the data through the same
small set of functions, so nothing else needs to change).

## Deploying to Hostinger

1. Log in to Hostinger's **hPanel** and open **File Manager** (or use FTP).
2. Upload the entire contents of this repository into your domain's
   `public_html` folder, preserving the folder structure (`css/`, `js/`,
   `assets/`, and all `.html` files at the root).
3. Confirm `index.html` is at the root of `public_html` — this is required
   for `www.unitednewstyle.com` to load the homepage automatically.
4. Once your SSL certificate is active (Hostinger provides free SSL), the
   site will be live at `https://www.unitednewstyle.com`.

No build tools, Node.js, or server-side code are required — this is a
pure static site.

## Local preview

The site uses native JavaScript modules (`<script type="module">`), which
browsers block from loading over a plain `file://` path. **Serve the folder
over local HTTP** rather than double-clicking `index.html`:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Any static server works the same way
(e.g. `npx serve`, the VS Code "Live Server" extension). This restriction
only applies to local preview — once uploaded to Hostinger (or any real web
host), pages are served over `https://` and load normally.

## Notes for future development

- Newsletter and contact forms are front-end only (they show a confirmation
  message but do not send data anywhere yet). Connect them to an email
  service (e.g. Mailchimp, Klaviyo) or a form backend before launch.
- The cart and wishlist are fully functional client-side (localStorage) —
  add to bag, quantities, remove, and a demo promo code (`WELCOME10`) all
  work. There is no payment gateway connected yet; the cart page says so
  plainly rather than faking a checkout. Connect Stripe/PayPal/etc. and wire
  it into `js/pages/cart.js`'s checkout button when ready.
- Product photography is not yet added — see `assets/README.md`.
