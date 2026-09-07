/* ==========================================================================
   United New Style — Shared page chrome (header, footer, drawers, modal)

   Every page includes empty <header id="site-header"></header> and
   <footer id="site-footer"></footer> placeholders, then calls
   mountPartials({ active: 'shop' }) once. This keeps navigation, the cart
   badge, the cart/wishlist drawers and the quick-view modal identical and
   in sync across every page from a single source of truth, without a
   server-side templating step.
   ========================================================================== */

const NAV_ITEMS = [
  { key: 'home', label: 'Home', href: 'index.html' },
  { key: 'shop', label: 'Shop', href: 'shop.html' },
  { key: 'new', label: 'New Arrivals', href: 'shop.html?filter=new' },
  { key: 'about', label: 'About', href: 'index.html#about' },
  { key: 'contact', label: 'Contact', href: 'index.html#contact' }
];

const SHOP_DROPDOWN = [
  { label: 'All Products', href: 'shop.html' },
  { label: 'T-Shirts', href: 'shop-tshirts.html' },
  { label: 'Clothing', href: 'shop-clothing.html' },
  { label: 'Fashion', href: 'shop-fashion.html' }
];

function headerHTML(active) {
  const navLinks = NAV_ITEMS.map(function (item) {
    const isActive = item.key === active ? ' is-active' : '';
    if (item.key === 'shop') {
      return (
        '<li class="nav-item has-dropdown">' +
          '<a href="' + item.href + '" class="nav-link' + isActive + '">' + item.label +
            '<svg class="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' +
          '</a>' +
          '<div class="nav-dropdown">' +
            SHOP_DROPDOWN.map(function (d) {
              return '<a href="' + d.href + '">' + d.label + '</a>';
            }).join('') +
          '</div>' +
        '</li>'
      );
    }
    return '<li class="nav-item"><a href="' + item.href + '" class="nav-link' + isActive + '">' + item.label + '</a></li>';
  }).join('');

  return (
    '<div class="announcement-bar">' +
      '<div class="announcement-track">' +
        '<span>Free Worldwide Shipping</span><span>New Arrivals Weekly</span>' +
        '<span>30-Day Easy Returns</span><span>United New Style</span>' +
      '</div>' +
    '</div>' +
    '<div class="header-inner container">' +
      '<a href="index.html" class="logo" aria-label="United New Style — Home">' +
        '<span class="logo-wordmark">United <span>New Style</span></span>' +
        '<span class="logo-tagline">Premium Garments</span>' +
      '</a>' +
      '<nav class="main-nav" id="main-nav" aria-label="Primary">' +
        '<ul class="nav-links">' + navLinks + '</ul>' +
      '</nav>' +
      '<div class="header-actions">' +
        '<button type="button" class="icon-btn" id="search-toggle" aria-label="Search">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '</button>' +
        '<button type="button" class="icon-btn" id="wishlist-toggle" aria-label="Wishlist">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5c2-.3 3.5.8 4.5 2.2C11.5 5.8 13 4.7 15 5c3.5.5 5 4 3.5 7.5C19 16.65 12 21 12 21z"/></svg>' +
          '<span class="badge-count" id="wishlist-count" hidden>0</span>' +
        '</button>' +
        '<button type="button" class="icon-btn" id="cart-toggle" aria-label="Shopping bag">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>' +
          '<span class="badge-count" id="cart-count" hidden>0</span>' +
        '</button>' +
        '<button type="button" class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div class="nav-overlay" id="nav-overlay"></div>' +
    '<div class="search-overlay" id="search-overlay">' +
      '<div class="container search-overlay-inner">' +
        '<form id="search-form" role="search">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
          '<input type="search" id="search-input" placeholder="Search products…" autocomplete="off" />' +
          '<button type="button" class="search-close" id="search-close" aria-label="Close search">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>' +
          '</button>' +
        '</form>' +
      '</div>' +
    '</div>'
  );
}

function footerHTML() {
  return (
    '<div class="container footer-grid">' +
      '<div class="footer-col footer-brand">' +
        '<span class="logo-wordmark">United <span>New Style</span></span>' +
        '<p>A premium online garment store crafting timeless T-Shirts, Clothing and Fashion for the modern wardrobe.</p>' +
        '<div class="social-links">' +
          '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>' +
          '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1z"/></svg></a>' +
          '<a href="#" aria-label="Pinterest"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 17c1-4 1-8 3-8 2 0 2.5 1.5 2 3-.4 1.5-1.5 2.5-3 2 1 1 2.5 1 3.5 0"/></svg></a>' +
          '<a href="#" aria-label="X (Twitter)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4l16 16M20 4L4 20"/></svg></a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h5>Shop</h5>' +
        '<ul>' +
          '<li><a href="shop-tshirts.html">T-Shirts</a></li>' +
          '<li><a href="shop-clothing.html">Clothing</a></li>' +
          '<li><a href="shop-fashion.html">Fashion</a></li>' +
          '<li><a href="shop.html?filter=new">New Arrivals</a></li>' +
          '<li><a href="shop.html">All Products</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h5>Company</h5>' +
        '<ul>' +
          '<li><a href="index.html#about">About Us</a></li>' +
          '<li><a href="index.html#contact">Contact</a></li>' +
          '<li><a href="faq.html">FAQs</a></li>' +
          '<li><a href="shipping-returns.html">Shipping &amp; Returns</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h5>Get in Touch</h5>' +
        '<ul class="footer-contact">' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/></svg><a href="mailto:info@unitednewstyle.com">info@unitednewstyle.com</a></li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M2.5 12h19M12 2.5c2.5 2.7 3.9 6 3.9 9.5s-1.4 6.8-3.9 9.5c-2.5-2.7-3.9-6-3.9-9.5S9.5 5.2 12 2.5z"/></svg><a href="https://www.unitednewstyle.com" target="_blank" rel="noopener">www.unitednewstyle.com</a></li>' +
        '</ul>' +
      '</div>' +
    '</div>' +
    '<div class="container footer-bottom">' +
      '<p>&copy; <span id="current-year">2026</span> United New Style. All rights reserved.</p>' +
      '<div class="footer-bottom-links">' +
        '<a href="privacy-policy.html">Privacy Policy</a>' +
        '<a href="terms-of-service.html">Terms of Service</a>' +
        '<a href="shipping-returns.html">Shipping &amp; Returns</a>' +
      '</div>' +
    '</div>'
  );
}

function mobileBottomNavHTML(active) {
  function cls(key) { return key === active ? ' is-active' : ''; }
  return (
    '<a href="index.html" class="bottom-nav-item' + cls('home') + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>' +
      '<span>Home</span>' +
    '</a>' +
    '<a href="shop.html" class="bottom-nav-item' + cls('shop') + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>' +
      '<span>Shop</span>' +
    '</a>' +
    '<button type="button" class="bottom-nav-item" id="bottom-search-toggle">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<span>Search</span>' +
    '</button>' +
    '<button type="button" class="bottom-nav-item" id="bottom-wishlist-toggle">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5c2-.3 3.5.8 4.5 2.2C11.5 5.8 13 4.7 15 5c3.5.5 5 4 3.5 7.5C19 16.65 12 21 12 21z"/></svg>' +
      '<span>Wishlist</span>' +
      '<span class="badge-count badge-count-sm" id="bottom-wishlist-count" hidden>0</span>' +
    '</button>' +
    '<button type="button" class="bottom-nav-item" id="bottom-cart-toggle">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>' +
      '<span>Bag</span>' +
      '<span class="badge-count badge-count-sm" id="bottom-cart-count" hidden>0</span>' +
    '</button>'
  );
}

function cartDrawerHTML() {
  return (
    '<div class="drawer-header">' +
      '<h3>Your Bag <span id="drawer-cart-count">(0)</span></h3>' +
      '<button type="button" class="drawer-close" data-close-drawer="cart" aria-label="Close bag">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="drawer-body" id="cart-drawer-body"></div>' +
    '<div class="drawer-footer" id="cart-drawer-footer">' +
      '<div class="drawer-subtotal"><span>Subtotal</span><strong id="cart-drawer-subtotal">$0.00</strong></div>' +
      '<a href="cart.html" class="btn btn-outline-navy btn-block">View Bag</a>' +
      '<a href="cart.html" class="btn btn-gold btn-block">Checkout</a>' +
    '</div>'
  );
}

function wishlistDrawerHTML() {
  return (
    '<div class="drawer-header">' +
      '<h3>Your Wishlist <span id="drawer-wishlist-count">(0)</span></h3>' +
      '<button type="button" class="drawer-close" data-close-drawer="wishlist" aria-label="Close wishlist">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="drawer-body" id="wishlist-drawer-body"></div>'
  );
}

function quickViewHTML() {
  return (
    '<div class="modal-panel quickview-panel">' +
      '<button type="button" class="modal-close" data-close-modal="quickview" aria-label="Close quick view">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>' +
      '</button>' +
      '<div class="quickview-media">' +
        '<span class="badge" id="qv-badge" hidden></span>' +
        '<svg class="product-placeholder-icon" id="qv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"></svg>' +
      '</div>' +
      '<div class="quickview-info">' +
        '<span class="product-category" id="qv-category"></span>' +
        '<h3 id="qv-name"></h3>' +
        '<div class="product-rating" id="qv-rating"></div>' +
        '<div class="product-price" id="qv-price"></div>' +
        '<p class="quickview-desc" id="qv-desc"></p>' +
        '<div class="size-select" id="qv-sizes"><span class="size-label">Size</span><div class="size-chips" id="qv-size-chips"></div></div>' +
        '<div class="qv-actions">' +
          '<div class="qty-stepper" id="qv-qty">' +
            '<button type="button" data-qty-decrease aria-label="Decrease quantity">&minus;</button>' +
            '<input type="text" value="1" readonly aria-label="Quantity" />' +
            '<button type="button" data-qty-increase aria-label="Increase quantity">+</button>' +
          '</div>' +
          '<button type="button" class="btn btn-gold" id="qv-add-to-cart">Add to Bag</button>' +
        '</div>' +
        '<a href="#" id="qv-full-link" class="quickview-full-link">View Full Details &rarr;</a>' +
      '</div>' +
    '</div>'
  );
}

export function mountPartials(opts) {
  opts = opts || {};
  const active = opts.active || '';

  const headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.innerHTML = headerHTML(active);

  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = footerHTML();

  if (!document.querySelector('.bottom-nav')) {
    const bottomNav = document.createElement('nav');
    bottomNav.className = 'bottom-nav';
    bottomNav.setAttribute('aria-label', 'Mobile');
    bottomNav.innerHTML = mobileBottomNavHTML(active);
    document.body.appendChild(bottomNav);
  }

  if (!document.getElementById('cart-drawer')) {
    const cartDrawer = document.createElement('aside');
    cartDrawer.className = 'drawer';
    cartDrawer.id = 'cart-drawer';
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartDrawer.innerHTML = cartDrawerHTML();
    document.body.appendChild(cartDrawer);
  }

  if (!document.getElementById('wishlist-drawer')) {
    const wishlistDrawer = document.createElement('aside');
    wishlistDrawer.className = 'drawer';
    wishlistDrawer.id = 'wishlist-drawer';
    wishlistDrawer.setAttribute('aria-hidden', 'true');
    wishlistDrawer.innerHTML = wishlistDrawerHTML();
    document.body.appendChild(wishlistDrawer);
  }

  if (!document.getElementById('drawer-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.id = 'drawer-backdrop';
    backdrop.className = 'drawer-backdrop';
    document.body.appendChild(backdrop);
  }

  if (!document.getElementById('quickview-modal')) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'quickview-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = quickViewHTML();
    document.body.appendChild(modal);
  }

  if (!document.getElementById('toast')) {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  window.dispatchEvent(new CustomEvent('partials:mounted'));
}
