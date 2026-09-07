# United New Style

Premium online garment store — official website source.

- **Website:** [www.unitednewstyle.com](https://www.unitednewstyle.com)
- **Email:** info@unitednewstyle.com
- **Categories:** T-Shirts • Clothing • Fashion

## About this repository

This is a static HTML/CSS/JavaScript website — no build step, no framework
and no server-side dependencies required. It is ready to deploy directly to
Hostinger (or any static host).

## Project structure

```
united-new-style/
├── index.html                Homepage
├── faq.html                  FAQ page
├── shipping-returns.html     Shipping & Returns policy
├── privacy-policy.html       Privacy Policy
├── terms-of-service.html     Terms of Service
├── 404.html                  Custom "page not found" page
├── robots.txt                Search engine crawl rules
├── sitemap.xml                Sitemap for SEO
├── css/
│   └── style.css             Global stylesheet (design system, layout, responsive rules)
├── js/
│   └── main.js                Front-end interactions (mobile nav, forms, toasts, FAQ accordion)
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
names, recommended sizes, and the two-line code change needed to swap in
your real logo, hero image, category photos and product photography once
they're ready.

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

Open `index.html` directly in a browser, or serve the folder locally, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes for future development

- Newsletter and contact forms are currently front-end only (they show a
  confirmation message but do not send data anywhere). Connect them to an
  email service (e.g. Mailchimp, Klaviyo) or a form backend before launch.
- "Add to Bag" buttons update a visual cart counter for demonstration but
  are not yet connected to a real shopping cart or checkout system.
- Sample product names/prices on the homepage are placeholder catalog data
  — replace with your real product information.
