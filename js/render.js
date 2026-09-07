/* ==========================================================================
   United New Style — Shared render helpers
   Pure functions that turn product data into HTML strings. Used by the
   homepage, collection pages and product pages so the product card markup
   only lives in one place.
   ========================================================================== */

export function starsHTML(rating) {
  const full = Math.round(rating * 2) / 2;
  let html = '<span class="stars" aria-hidden="true">';
  for (let i = 1; i <= 5; i++) {
    if (full >= i) {
      html += STAR_FULL;
    } else if (full >= i - 0.5) {
      html += STAR_HALF;
    } else {
      html += STAR_EMPTY;
    }
  }
  html += '</span>';
  return html;
}

const STAR_FULL = '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.4 5.9.7-4.4 4.1 1.2 5.9L10 14.8l-5.3 2.8 1.2-5.9-4.4-4.1 5.9-.7z"/></svg>';
const STAR_HALF = '<svg viewBox="0 0 20 20" fill="currentColor"><defs><linearGradient id="halfGrad"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#halfGrad)" stroke="currentColor" stroke-width="0.5" d="M10 1.5l2.6 5.4 5.9.7-4.4 4.1 1.2 5.9L10 14.8l-5.3 2.8 1.2-5.9-4.4-4.1 5.9-.7z"/></svg>';
const STAR_EMPTY = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1"><path d="M10 1.5l2.6 5.4 5.9.7-4.4 4.1 1.2 5.9L10 14.8l-5.3 2.8 1.2-5.9-4.4-4.1 5.9-.7z"/></svg>';

export const CATEGORY_ICONS = {
  tshirts: '<path d="M7 4 3 8l3 3 2-2v11h8V9l2 2 3-3-4-4h-3a2 2 0 0 1-4 0H7z"/>',
  clothing: '<path d="M4 7h16M6 7l1 13h10l1-13M9 3h6v4H9z"/>',
  fashion: '<path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"/>'
};

function badgeClass(badge) {
  if (!badge) return '';
  return 'badge-' + badge.toLowerCase();
}

export function productCardHTML(product) {
  const onSale = product.salePrice != null;
  const effectivePrice = onSale ? product.salePrice : product.price;
  const currency = product.currency || '$';
  const icon = CATEGORY_ICONS[product.category] || CATEGORY_ICONS.tshirts;
  const badge = product.badge
    ? '<span class="badge ' + badgeClass(product.badge) + '">' + product.badge + '</span>'
    : '';

  return (
    '<article class="product-card" data-id="' + product.id + '" data-category="' + product.category + '" ' +
    'data-price="' + effectivePrice + '" data-badge="' + (product.badge || '') + '" data-rating="' + product.rating + '">' +
      '<div class="product-media">' +
        badge +
        '<button type="button" class="product-wishlist" data-wishlist="' + product.id + '" aria-label="Add ' + product.name + ' to wishlist">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5c2-.3 3.5.8 4.5 2.2C11.5 5.8 13 4.7 15 5c3.5.5 5 4 3.5 7.5C19 16.65 12 21 12 21z"/></svg>' +
        '</button>' +
        (product.image
          ? '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" />'
          : '<div class="product-thumb"><svg class="product-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1">' + icon + '</svg></div>') +
        '<button type="button" class="btn-quickview" data-quickview="' + product.id + '">Quick View</button>' +
      '</div>' +
      '<div class="product-info">' +
        '<span class="product-category">' + product.categoryLabel + '</span>' +
        '<h3>' + (product.page
          ? '<a href="' + product.page + '" class="product-title-link">' + product.name + '</a>'
          : '<button type="button" class="product-title-link" data-quickview="' + product.id + '">' + product.name + '</button>') + '</h3>' +
        '<div class="product-rating">' + (product.reviews > 0
          ? starsHTML(product.rating) + '<span class="rating-count">(' + product.reviews + ')</span>'
          : '<span class="rating-count">No reviews yet</span>') + '</div>' +
        '<div class="product-price">' +
          (onSale
            ? '<span class="price-current sale">' + currency + product.salePrice.toFixed(2) + '</span><span class="price-old">' + currency + product.price.toFixed(2) + '</span>'
            : '<span class="price-current">' + currency + product.price.toFixed(2) + '</span>') +
        '</div>' +
        (product.freeShipping ? '<span class="free-shipping-tag">Free Shipping</span>' : '') +
        '<button type="button" class="btn btn-navy btn-block add-to-cart" data-add-to-cart="' + product.id + '">Add to Bag</button>' +
      '</div>' +
    '</article>'
  );
}

export function renderProductGrid(container, products) {
  if (!container) return;
  if (!products.length) {
    container.innerHTML = '<p class="empty-state">No products match your filters right now. Try clearing a filter.</p>';
    return;
  }
  container.innerHTML = products.map(productCardHTML).join('');
}
