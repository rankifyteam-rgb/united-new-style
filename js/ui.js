/* ==========================================================================
   United New Style — Shared UI interactions
   Header, mobile menu, cart/wishlist drawers, quick view modal, search
   overlay, toasts, accordions, countdown, testimonial scroller. Call
   initUI() once per page after mountPartials(). Page-specific rendering
   (home/collection/product/cart) lives in js/pages/*.js.
   ========================================================================== */

import { getCart, getCount, getSubtotal, updateQty, removeItem, addItem, formatPrice } from './cart.js';
import { getWishlist, toggleWishlist, removeFromWishlist } from './wishlist.js';
import { PRODUCTS, getProductById } from './data/products.js';
import { starsHTML, CATEGORY_ICONS } from './render.js';

let toastTimer;

export function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove('is-visible');
  }, 2600);
}

/* -------------------------------------------------------------- Header --- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------- Mobile menu --- */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navOverlay = document.getElementById('nav-overlay');

  function closeNav() {
    if (!mainNav) return;
    mainNav.classList.remove('is-open');
    if (navOverlay) navOverlay.classList.remove('is-visible');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  function toggleNav() {
    if (!mainNav) return;
    const isOpen = mainNav.classList.toggle('is-open');
    if (navOverlay) navOverlay.classList.toggle('is-visible', isOpen);
    if (navToggle) navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  }

  if (navToggle) navToggle.addEventListener('click', toggleNav);
  if (navOverlay) navOverlay.addEventListener('click', closeNav);
  document.querySelectorAll('.nav-links > .nav-item > a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });
}

/* -------------------------------------------------------------- Drawers --- */
function openDrawer(id) {
  const drawer = document.getElementById(id);
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer) return;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  if (backdrop) backdrop.classList.add('is-visible');
  document.body.classList.add('no-scroll');
}

function closeAllDrawers() {
  document.querySelectorAll('.drawer.is-open').forEach(function (drawer) {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
  });
  const backdrop = document.getElementById('drawer-backdrop');
  if (backdrop) backdrop.classList.remove('is-visible');
  document.body.classList.remove('no-scroll');
}

function categoryIconSvg(category) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">' + (CATEGORY_ICONS[category] || CATEGORY_ICONS.tshirts) + '</svg>';
}

function cartLineRowHTML(line) {
  return (
    '<div class="drawer-line" data-line-id="' + line.id + '" data-line-size="' + line.size + '">' +
      '<div class="drawer-line-thumb">' + categoryIconSvg(line.category) + '</div>' +
      '<div class="drawer-line-info">' +
        '<h4>' + line.name + '</h4>' +
        '<span class="drawer-line-size">Size: ' + line.size + '</span>' +
        '<div class="qty-stepper qty-stepper-sm">' +
          '<button type="button" data-line-decrease aria-label="Decrease quantity">&minus;</button>' +
          '<input type="text" value="' + line.qty + '" readonly aria-label="Quantity" />' +
          '<button type="button" data-line-increase aria-label="Increase quantity">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="drawer-line-price">' +
        '<span>' + formatPrice(line.price * line.qty) + '</span>' +
        '<button type="button" class="drawer-line-remove" data-line-remove aria-label="Remove ' + line.name + '">Remove</button>' +
      '</div>' +
    '</div>'
  );
}

function renderCartDrawer() {
  const cart = getCart();
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  const countLabel = document.getElementById('drawer-cart-count');
  if (countLabel) countLabel.textContent = '(' + getCount(cart) + ')';

  if (!body) return;
  if (!cart.length) {
    body.innerHTML = '<div class="drawer-empty"><p>Your bag is empty.</p><a href="shop.html" class="btn btn-outline-navy">Start Shopping</a></div>';
    if (footer) footer.style.display = 'none';
    return;
  }
  if (footer) footer.style.display = '';
  body.innerHTML = cart.map(cartLineRowHTML).join('');
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  if (subtotalEl) subtotalEl.textContent = formatPrice(getSubtotal(cart));
}

function renderWishlistDrawer() {
  const ids = getWishlist();
  const body = document.getElementById('wishlist-drawer-body');
  const countLabel = document.getElementById('drawer-wishlist-count');
  if (countLabel) countLabel.textContent = '(' + ids.length + ')';
  if (!body) return;

  if (!ids.length) {
    body.innerHTML = '<div class="drawer-empty"><p>Your wishlist is empty.</p><a href="shop.html" class="btn btn-outline-navy">Discover Products</a></div>';
    return;
  }

  body.innerHTML = ids.map(function (id) {
    const product = getProductById(id);
    if (!product) return '';
    const price = product.salePrice != null ? product.salePrice : product.price;
    return (
      '<div class="drawer-line" data-wishlist-line="' + product.id + '">' +
        '<div class="drawer-line-thumb">' + categoryIconSvg(product.category) + '</div>' +
        '<div class="drawer-line-info">' +
          '<h4>' + product.name + '</h4>' +
          '<span class="drawer-line-size">' + formatPrice(price) + '</span>' +
        '</div>' +
        '<div class="drawer-line-price">' +
          '<button type="button" class="btn btn-navy btn-sm" data-wishlist-add="' + product.id + '">Add to Bag</button>' +
          '<button type="button" class="drawer-line-remove" data-wishlist-remove="' + product.id + '">Remove</button>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

function updateBadgeCounts() {
  const cartCount = getCount();
  const wishCount = getWishlist().length;

  ['cart-count', 'bottom-cart-count'].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = String(cartCount);
    el.hidden = cartCount === 0;
  });

  ['wishlist-count', 'bottom-wishlist-count'].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = String(wishCount);
    el.hidden = wishCount === 0;
  });

  document.querySelectorAll('.product-wishlist').forEach(function (btn) {
    const id = btn.getAttribute('data-wishlist');
    if (id) btn.classList.toggle('is-active', getWishlist().indexOf(id) !== -1);
  });
}

function initDrawers() {
  ['cart-toggle', 'bottom-cart-toggle'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', function () { renderCartDrawer(); openDrawer('cart-drawer'); });
  });
  ['wishlist-toggle', 'bottom-wishlist-toggle'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', function () { renderWishlistDrawer(); openDrawer('wishlist-drawer'); });
  });

  document.addEventListener('click', function (e) {
    const closeBtn = e.target.closest('[data-close-drawer]');
    if (closeBtn) closeAllDrawers();
  });

  const backdrop = document.getElementById('drawer-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeAllDrawers);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllDrawers();
  });

  document.addEventListener('click', function (e) {
    const decrease = e.target.closest('[data-line-decrease]');
    const increase = e.target.closest('[data-line-increase]');
    const remove = e.target.closest('[data-line-remove]');
    const row = e.target.closest('.drawer-line[data-line-id]');
    if (!row) return;
    const id = row.getAttribute('data-line-id');
    const size = row.getAttribute('data-line-size');
    const cart = getCart();
    const line = cart.find(function (l) { return l.id === id && l.size === size; });
    if (!line) return;

    if (decrease) updateQty(id, size, line.qty - 1);
    if (increase) updateQty(id, size, line.qty + 1);
    if (remove) removeItem(id, size);
  });

  document.addEventListener('click', function (e) {
    const addBtn = e.target.closest('[data-wishlist-add]');
    const removeBtn = e.target.closest('[data-wishlist-remove]');
    if (addBtn) {
      const product = getProductById(addBtn.getAttribute('data-wishlist-add'));
      if (product) {
        addItem(product);
        showToast(product.name + ' added to your bag');
      }
    }
    if (removeBtn) {
      removeFromWishlist(removeBtn.getAttribute('data-wishlist-remove'));
    }
  });

  window.addEventListener('cart:updated', function () {
    renderCartDrawer();
    updateBadgeCounts();
  });
  window.addEventListener('wishlist:updated', function () {
    renderWishlistDrawer();
    updateBadgeCounts();
  });

  updateBadgeCounts();
}

/* ---------------------------------------------------- Add to cart (grid) --- */
function initAddToCartDelegation() {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-add-to-cart]');
    if (!btn || btn.id === 'qv-add-to-cart') return;
    const id = btn.getAttribute('data-add-to-cart');
    const product = getProductById(id);
    if (!product) return;
    addItem(product);
    showToast(product.name + ' added to your bag');
    renderCartDrawer();
  });

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-wishlist]');
    if (!btn) return;
    const id = btn.getAttribute('data-wishlist');
    const product = getProductById(id);
    if (!product) return;
    const added = toggleWishlist(id);
    showToast(added ? product.name + ' added to your wishlist' : product.name + ' removed from your wishlist');
  });
}

/* ------------------------------------------------------------ Quick View --- */
function initQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (!modal) return;
  let currentProduct = null;
  let selectedSize = null;

  function open(product) {
    currentProduct = product;
    selectedSize = product.sizes[0];

    document.getElementById('qv-category').textContent = product.categoryLabel;
    document.getElementById('qv-name').textContent = product.name;
    document.getElementById('qv-desc').textContent = product.description;
    document.getElementById('qv-rating').innerHTML = starsHTML(product.rating) + '<span class="rating-count">(' + product.reviews + ' reviews)</span>';

    const badgeEl = document.getElementById('qv-badge');
    if (product.badge) {
      badgeEl.textContent = product.badge;
      badgeEl.hidden = false;
      badgeEl.className = 'badge badge-' + product.badge.toLowerCase();
    } else {
      badgeEl.hidden = true;
    }

    const priceEl = document.getElementById('qv-price');
    priceEl.innerHTML = product.salePrice != null
      ? '<span class="price-current sale">' + formatPrice(product.salePrice) + '</span><span class="price-old">' + formatPrice(product.price) + '</span>'
      : '<span class="price-current">' + formatPrice(product.price) + '</span>';

    const chipsEl = document.getElementById('qv-size-chips');
    chipsEl.innerHTML = product.sizes.map(function (size, i) {
      return '<button type="button" class="size-chip' + (i === 0 ? ' is-selected' : '') + '" data-size="' + size + '">' + size + '</button>';
    }).join('');

    const qtyInput = document.querySelector('#qv-qty input');
    if (qtyInput) qtyInput.value = '1';

    const fullLink = document.getElementById('qv-full-link');
    if (product.page) {
      fullLink.href = product.page;
      fullLink.hidden = false;
    } else {
      fullLink.hidden = true;
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-quickview]');
    if (trigger) {
      const product = getProductById(trigger.getAttribute('data-quickview'));
      if (product) open(product);
    }
    if (e.target.closest('[data-close-modal="quickview"]')) close();
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  modal.addEventListener('click', function (e) {
    const sizeChip = e.target.closest('.size-chip');
    if (sizeChip) {
      modal.querySelectorAll('.size-chip').forEach(function (c) { c.classList.remove('is-selected'); });
      sizeChip.classList.add('is-selected');
      selectedSize = sizeChip.getAttribute('data-size');
    }

    const qtyInput = modal.querySelector('#qv-qty input');
    if (e.target.closest('[data-qty-increase]') && qtyInput) {
      qtyInput.value = String(parseInt(qtyInput.value, 10) + 1);
    }
    if (e.target.closest('[data-qty-decrease]') && qtyInput) {
      qtyInput.value = String(Math.max(1, parseInt(qtyInput.value, 10) - 1));
    }

    if (e.target.id === 'qv-add-to-cart' && currentProduct) {
      const qty = parseInt(qtyInput ? qtyInput.value : '1', 10) || 1;
      addItem(currentProduct, selectedSize, qty);
      showToast(currentProduct.name + ' added to your bag');
      close();
      renderCartDrawer();
      openDrawer('cart-drawer');
    }
  });
}

/* -------------------------------------------------------------- Search --- */
function initSearch() {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const form = document.getElementById('search-form');
  if (!overlay) return;

  function open() {
    overlay.classList.add('is-visible');
    if (input) setTimeout(function () { input.focus(); }, 50);
  }
  function close() {
    overlay.classList.remove('is-visible');
  }

  ['search-toggle', 'bottom-search-toggle'].forEach(function (id) {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', open);
  });
  const closeBtn = document.getElementById('search-close');
  if (closeBtn) closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const q = input ? input.value.trim() : '';
      if (q) window.location.href = 'shop.html?q=' + encodeURIComponent(q);
    });
  }
}

/* ------------------------------------------------------------ Accordion --- */
function initAccordions() {
  document.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const item = trigger.closest('.accordion-item, .faq-item');
      if (!item) return;
      const group = item.parentElement;
      const singleOpen = group && group.hasAttribute('data-accordion-single');
      const wasOpen = item.classList.contains('is-open');
      if (singleOpen) {
        group.querySelectorAll('.accordion-item, .faq-item').forEach(function (el) {
          el.classList.remove('is-open');
        });
      }
      item.classList.toggle('is-open', !wasOpen);
    });
  });
}

/* ------------------------------------------------------------ Countdown --- */
function initCountdown() {
  document.querySelectorAll('[data-countdown]').forEach(function (el) {
    const hh = el.querySelector('[data-cd-hh]');
    const mm = el.querySelector('[data-cd-mm]');
    const ss = el.querySelector('[data-cd-ss]');

    function tick() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(23, 59, 59, 999);
      let diff = Math.max(0, midnight - now);

      const h = Math.floor(diff / 3600000);
      diff -= h * 3600000;
      const m = Math.floor(diff / 60000);
      diff -= m * 60000;
      const s = Math.floor(diff / 1000);

      if (hh) hh.textContent = String(h).padStart(2, '0');
      if (mm) mm.textContent = String(m).padStart(2, '0');
      if (ss) ss.textContent = String(s).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
  });
}

/* ------------------------------------------------------- Testimonials  --- */
function initTestimonialScroller() {
  const track = document.querySelector('.testimonial-track');
  const prev = document.querySelector('[data-testimonial-prev]');
  const next = document.querySelector('[data-testimonial-next]');
  if (!track) return;

  function scrollByCard(dir) {
    const card = track.querySelector('.testimonial-card');
    const amount = card ? card.getBoundingClientRect().width + 24 : 320;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  if (prev) prev.addEventListener('click', function () { scrollByCard(-1); });
  if (next) next.addEventListener('click', function () { scrollByCard(1); });
}

/* ---------------------------------------------------------------- Init --- */
export function initUI() {
  initHeaderScroll();
  initMobileMenu();
  initDrawers();
  initAddToCartDelegation();
  initQuickView();
  initSearch();
  initAccordions();
  initCountdown();
  initTestimonialScroller();
}

export { openDrawer, closeAllDrawers, renderCartDrawer, renderWishlistDrawer, updateBadgeCounts };
