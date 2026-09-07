/* ==========================================================================
   United New Style — Wishlist module (localStorage-backed)
   Same pattern as cart.js: an array of product ids in localStorage,
   broadcasting a "wishlist:updated" event on every change.
   ========================================================================== */

const STORAGE_KEY = 'uns_wishlist_v1';

function readWishlist() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function writeWishlist(list) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    /* storage unavailable — non-fatal */
  }
  window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { list: list } }));
}

export function getWishlist() {
  return readWishlist();
}

export function isWishlisted(id) {
  return readWishlist().indexOf(id) !== -1;
}

export function toggleWishlist(id) {
  const list = readWishlist();
  const idx = list.indexOf(id);
  let added;
  if (idx === -1) {
    list.push(id);
    added = true;
  } else {
    list.splice(idx, 1);
    added = false;
  }
  writeWishlist(list);
  return added;
}

export function removeFromWishlist(id) {
  const list = readWishlist().filter(function (item) { return item !== id; });
  writeWishlist(list);
  return list;
}

window.addEventListener('DOMContentLoaded', function () {
  window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { list: readWishlist() } }));
});
