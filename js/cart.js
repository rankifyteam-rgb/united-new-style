/* ==========================================================================
   United New Style — Cart module (localStorage-backed)

   Front-end cart for the initial site build. State lives in localStorage
   under STORAGE_KEY. When a real backend/checkout is integrated, keep this
   module's public API (getCart, addItem, updateQty, removeItem, clearCart,
   getSubtotal, getCount) and swap the storage calls for API requests —
   nothing that imports this module needs to change.

   Every mutation dispatches a "cart:updated" event on window with
   { detail: { cart, count, subtotal } } so header badges, the cart drawer
   and cart.html can all stay in sync without polling.
   ========================================================================== */

const STORAGE_KEY = 'uns_cart_v1';

function readCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function writeCart(cart) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    /* localStorage unavailable (private mode, disabled storage) — cart will
       simply not persist across reloads for this viewer. */
  }
  emitUpdate(cart);
}

function emitUpdate(cart) {
  window.dispatchEvent(new CustomEvent('cart:updated', {
    detail: {
      cart: cart,
      count: getCount(cart),
      subtotal: getSubtotal(cart)
    }
  }));
}

export function getCart() {
  return readCart();
}

export function addItem(product, size, qty) {
  qty = qty || 1;
  size = size || (product.sizes && product.sizes[0]) || 'One Size';
  const cart = readCart();
  const price = product.salePrice != null ? product.salePrice : product.price;
  const existing = cart.find(function (line) {
    return line.id === product.id && line.size === size;
  });

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: price,
      size: size,
      qty: qty,
      category: product.category
    });
  }

  writeCart(cart);
  return cart;
}

export function updateQty(id, size, qty) {
  let cart = readCart();
  if (qty <= 0) {
    cart = cart.filter(function (line) { return !(line.id === id && line.size === size); });
  } else {
    const line = cart.find(function (l) { return l.id === id && l.size === size; });
    if (line) line.qty = qty;
  }
  writeCart(cart);
  return cart;
}

export function removeItem(id, size) {
  const cart = readCart().filter(function (line) {
    return !(line.id === id && line.size === size);
  });
  writeCart(cart);
  return cart;
}

export function clearCart() {
  writeCart([]);
}

export function getCount(cart) {
  cart = cart || readCart();
  return cart.reduce(function (sum, line) { return sum + line.qty; }, 0);
}

export function getSubtotal(cart) {
  cart = cart || readCart();
  return cart.reduce(function (sum, line) { return sum + line.qty * line.price; }, 0);
}

export function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

/* Broadcast current state once on load so freshly-mounted UI (header badge)
   reflects any cart that already existed in storage. */
window.addEventListener('DOMContentLoaded', function () {
  emitUpdate(readCart());
});
