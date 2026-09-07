/* ==========================================================================
   United New Style — Cart page controller
   Renders cart.html from localStorage cart state and handles qty/remove,
   a client-side demo promo code, and an honest "checkout not yet connected"
   notice (no payment gateway is integrated in this initial build).
   ========================================================================== */
import { getCart, updateQty, removeItem, getSubtotal, formatPrice } from '../cart.js';
import { CATEGORY_ICONS } from '../render.js';

const PROMO_CODES = { WELCOME10: 0.10 };
let appliedPromo = null;

function cartRowHTML(line) {
  const icon = CATEGORY_ICONS[line.category] || CATEGORY_ICONS.tshirts;
  return (
    '<tr data-row-id="' + line.id + '" data-row-size="' + line.size + '">' +
      '<td>' +
        '<div class="cart-product-cell">' +
          '<div class="cart-product-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">' + icon + '</svg></div>' +
          '<div class="cart-product-info">' +
            '<h4>' + line.name + '</h4>' +
            '<span>Size: ' + line.size + '</span><br/>' +
            '<span>' + formatPrice(line.price) + ' each</span>' +
            '<button type="button" class="cart-remove-btn" data-row-remove>Remove</button>' +
          '</div>' +
        '</div>' +
      '</td>' +
      '<td>' +
        '<div class="qty-stepper">' +
          '<button type="button" data-row-decrease aria-label="Decrease quantity">&minus;</button>' +
          '<input type="text" value="' + line.qty + '" readonly aria-label="Quantity" />' +
          '<button type="button" data-row-increase aria-label="Increase quantity">+</button>' +
        '</div>' +
      '</td>' +
      '<td class="cart-price-cell">' + formatPrice(line.price * line.qty) + '</td>' +
    '</tr>'
  );
}

function renderSummary(cart) {
  const subtotal = getSubtotal(cart);
  const discount = appliedPromo ? subtotal * appliedPromo : 0;
  const total = subtotal - discount;

  const subtotalEl = document.getElementById('summary-subtotal');
  const discountRow = document.getElementById('summary-discount-row');
  const discountEl = document.getElementById('summary-discount');
  const totalEl = document.getElementById('summary-total');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (discountRow) discountRow.style.display = appliedPromo ? '' : 'none';
  if (discountEl) discountEl.textContent = '-' + formatPrice(discount);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function render() {
  const cart = getCart();
  const tableWrap = document.getElementById('cart-table-wrap');
  const emptyState = document.getElementById('cart-empty-state');
  const summary = document.getElementById('cart-summary');

  if (!cart.length) {
    if (tableWrap) tableWrap.style.display = 'none';
    if (summary) summary.style.display = 'none';
    if (emptyState) emptyState.style.display = '';
    return;
  }

  if (tableWrap) tableWrap.style.display = '';
  if (summary) summary.style.display = '';
  if (emptyState) emptyState.style.display = 'none';

  const tbody = document.getElementById('cart-table-body');
  if (tbody) tbody.innerHTML = cart.map(cartRowHTML).join('');
  renderSummary(cart);
}

export function initCartPage() {
  render();

  const tbody = document.getElementById('cart-table-body');
  if (tbody) {
    tbody.addEventListener('click', function (e) {
      const row = e.target.closest('tr[data-row-id]');
      if (!row) return;
      const id = row.getAttribute('data-row-id');
      const size = row.getAttribute('data-row-size');
      const cart = getCart();
      const line = cart.find(function (l) { return l.id === id && l.size === size; });
      if (!line) return;

      if (e.target.closest('[data-row-decrease]')) updateQty(id, size, line.qty - 1);
      if (e.target.closest('[data-row-increase]')) updateQty(id, size, line.qty + 1);
      if (e.target.closest('[data-row-remove]')) removeItem(id, size);
    });
  }

  const promoForm = document.getElementById('promo-form');
  if (promoForm) {
    promoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = document.getElementById('promo-input');
      const code = (input.value || '').trim().toUpperCase();
      const feedback = document.getElementById('promo-feedback');
      import('../ui.js').then(function (mod) {
        if (PROMO_CODES[code]) {
          appliedPromo = PROMO_CODES[code];
          if (feedback) { feedback.textContent = 'Promo code applied — ' + (PROMO_CODES[code] * 100) + '% off.'; feedback.style.color = 'var(--success)'; }
          mod.showToast('Promo code applied');
        } else {
          appliedPromo = null;
          if (feedback) { feedback.textContent = 'Invalid or expired promo code.'; feedback.style.color = 'var(--sale)'; }
          mod.showToast('That promo code is not valid');
        }
        renderSummary(getCart());
      });
    });
  }

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      import('../ui.js').then(function (mod) {
        mod.showToast('Checkout isn’t connected to payments yet — email info@unitednewstyle.com to complete your order.');
      });
    });
  }

  window.addEventListener('cart:updated', render);
}
