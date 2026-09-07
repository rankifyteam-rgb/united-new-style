/* ==========================================================================
   United New Style — Product detail page controller
   Wires size selection, quantity, add-to-cart / buy-now, gallery thumbs,
   the sticky mobile add-to-cart bar, and renders the related products grid.
   The product's id (name/price/sizes/rating) is pulled from js/data/products.js
   so pricing always matches what collection pages and the cart show — only
   the long-form marketing copy (description, fabric/fit/delivery) lives in
   the page's own HTML.
   ========================================================================== */
import { getProductById, getRelatedProducts } from '../data/products.js';
import { renderProductGrid, starsHTML } from '../render.js';
import { addItem, formatPrice } from '../cart.js';

export function initProduct(productId) {
  const product = getProductById(productId);
  if (!product) return;

  let selectedSize = product.sizes[0];
  let qty = 1;

  /* ---- Fill in data-driven fields (name/price/rating stay in sync with the catalog) ---- */
  document.querySelectorAll('[data-pdp-name]').forEach(function (el) { el.textContent = product.name; });
  document.querySelectorAll('[data-pdp-rating]').forEach(function (el) {
    el.innerHTML = product.reviews > 0
      ? starsHTML(product.rating) + '<span class="rating-count">(' + product.reviews + ' reviews)</span>'
      : '<span class="rating-count">No reviews yet</span>';
  });
  document.querySelectorAll('[data-pdp-price]').forEach(function (el) {
    el.innerHTML = product.salePrice != null
      ? '<span class="price-current sale">' + formatPrice(product.salePrice, product.currency) + '</span><span class="price-old">' + formatPrice(product.price, product.currency) + '</span><span class="pdp-save-badge">Save ' + Math.round((1 - product.salePrice / product.price) * 100) + '%</span>'
      : '<span class="price-current">' + formatPrice(product.price, product.currency) + '</span>';
  });
  document.querySelectorAll('[data-pdp-shipping]').forEach(function (el) {
    el.hidden = !product.freeShipping;
  });

  /* ---- Size selection ---- */
  const sizeChips = document.querySelectorAll('[data-size-select]');
  sizeChips.forEach(function (chip, i) {
    if (i === 0) chip.classList.add('is-selected');
    chip.addEventListener('click', function () {
      sizeChips.forEach(function (c) { c.classList.remove('is-selected'); });
      chip.classList.add('is-selected');
      selectedSize = chip.getAttribute('data-size-select');
    });
  });

  /* ---- Quantity ---- */
  const qtyInput = document.querySelector('#pdp-qty input');
  document.querySelectorAll('[data-qty-decrease]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      qty = Math.max(1, qty - 1);
      if (qtyInput) qtyInput.value = String(qty);
    });
  });
  document.querySelectorAll('[data-qty-increase]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      qty += 1;
      if (qtyInput) qtyInput.value = String(qty);
    });
  });

  /* ---- Add to cart / Buy now ---- */
  function addToBag() {
    addItem(product, selectedSize, qty);
  }

  document.querySelectorAll('[data-pdp-add-to-cart]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      addToBag();
      import('../ui.js').then(function (mod) {
        mod.showToast(product.name + ' added to your bag');
        mod.renderCartDrawer();
        mod.openDrawer('cart-drawer');
      });
    });
  });

  document.querySelectorAll('[data-pdp-buy-now]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      addToBag();
      window.location.href = 'cart.html';
    });
  });

  /* ---- Gallery thumbnails ---- */
  const thumbs = document.querySelectorAll('.pdp-thumb');
  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
    });
    if (i === 0) thumb.classList.add('is-active');
  });

  /* ---- Sticky add-to-cart bar (mobile) ---- */
  const stickyBar = document.getElementById('sticky-add-bar');
  const actionsSentinel = document.querySelector('.pdp-actions');
  if (stickyBar && actionsSentinel && 'IntersectionObserver' in window) {
    const stickyName = stickyBar.querySelector('[data-sticky-name]');
    const stickyPrice = stickyBar.querySelector('[data-sticky-price]');
    if (stickyName) stickyName.textContent = product.name;
    if (stickyPrice) {
      stickyPrice.innerHTML = product.salePrice != null
        ? '<span class="price-current sale">' + formatPrice(product.salePrice, product.currency) + '</span>'
        : '<span class="price-current">' + formatPrice(product.price, product.currency) + '</span>';
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        stickyBar.classList.toggle('is-visible', !entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
    }, { threshold: 0 });
    observer.observe(actionsSentinel);

    const stickyAddBtn = stickyBar.querySelector('[data-pdp-add-to-cart]');
    if (stickyAddBtn) {
      stickyAddBtn.addEventListener('click', function () {
        addToBag();
        import('../ui.js').then(function (mod) {
          mod.showToast(product.name + ' added to your bag');
          mod.renderCartDrawer();
          mod.openDrawer('cart-drawer');
        });
      });
    }
  }

  /* ---- Related products ---- */
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) renderProductGrid(relatedGrid, getRelatedProducts(product, 4));
}
