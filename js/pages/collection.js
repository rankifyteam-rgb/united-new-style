/* ==========================================================================
   United New Style — Collection / category page controller
   Handles sorting, filtering (category, price, size, badge, search query)
   and rendering for shop.html and the category-specific shop-*.html pages.
   ========================================================================== */
import { PRODUCTS } from '../data/products.js';
import { renderProductGrid } from '../render.js';

function effectivePrice(p) {
  return p.salePrice != null ? p.salePrice : p.price;
}

export function initCollection(options) {
  options = options || {};
  const fixedCategory = options.category || null;

  const grid = document.getElementById('collection-grid');
  const countEl = document.getElementById('toolbar-count');
  const sortSelect = document.getElementById('sort-select');
  const params = new URLSearchParams(window.location.search);

  const totalInScope = fixedCategory
    ? PRODUCTS.filter(function (p) { return p.category === fixedCategory; }).length
    : PRODUCTS.length;

  const state = {
    categories: fixedCategory ? [fixedCategory] : [],
    priceRanges: [],
    sizes: [],
    badge: params.get('filter') || null,
    query: (params.get('q') || '').toLowerCase(),
    sort: 'featured'
  };

  function matches(p) {
    if (state.categories.length && state.categories.indexOf(p.category) === -1) return false;
    if (state.query) {
      const hay = (p.name + ' ' + p.categoryLabel + ' ' + p.description).toLowerCase();
      if (hay.indexOf(state.query) === -1) return false;
    }
    if (state.badge === 'new' && p.badge !== 'New') return false;
    if (state.badge === 'bestseller' && p.badge !== 'Bestseller') return false;
    if (state.badge === 'sale' && p.salePrice == null) return false;
    if (state.sizes.length && !state.sizes.some(function (s) { return p.sizes.indexOf(s) !== -1; })) return false;
    if (state.priceRanges.length) {
      const price = effectivePrice(p);
      const inRange = state.priceRanges.some(function (range) { return price >= range[0] && price <= range[1]; });
      if (!inRange) return false;
    }
    return true;
  }

  function sortList(list) {
    const sorted = list.slice();
    if (state.sort === 'price-asc') sorted.sort(function (a, b) { return effectivePrice(a) - effectivePrice(b); });
    else if (state.sort === 'price-desc') sorted.sort(function (a, b) { return effectivePrice(b) - effectivePrice(a); });
    else if (state.sort === 'newest') sorted.sort(function (a, b) { return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0); });
    else if (state.sort === 'rating') sorted.sort(function (a, b) { return b.rating - a.rating; });
    return sorted;
  }

  function render() {
    const filtered = sortList(PRODUCTS.filter(matches));
    renderProductGrid(grid, filtered);
    if (countEl) countEl.textContent = 'Showing ' + filtered.length + ' of ' + totalInScope + ' products';
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      state.sort = sortSelect.value;
      render();
    });
  }

  document.querySelectorAll('[data-filter-category]').forEach(function (input) {
    input.addEventListener('change', function () {
      state.categories = Array.from(document.querySelectorAll('[data-filter-category]:checked')).map(function (el) { return el.value; });
      render();
    });
  });

  document.querySelectorAll('[data-filter-price]').forEach(function (input) {
    input.addEventListener('change', function () {
      state.priceRanges = Array.from(document.querySelectorAll('[data-filter-price]:checked')).map(function (el) {
        return el.getAttribute('data-filter-price').split('-').map(Number);
      });
      render();
    });
  });

  document.querySelectorAll('[data-filter-size]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      chip.classList.toggle('is-selected');
      state.sizes = Array.from(document.querySelectorAll('[data-filter-size].is-selected')).map(function (el) {
        return el.getAttribute('data-filter-size');
      });
      render();
    });
  });

  const clearBtn = document.getElementById('filter-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      document.querySelectorAll('[data-filter-category], [data-filter-price]').forEach(function (el) { el.checked = false; });
      document.querySelectorAll('[data-filter-size]').forEach(function (el) { el.classList.remove('is-selected'); });
      state.categories = fixedCategory ? [fixedCategory] : [];
      state.priceRanges = [];
      state.sizes = [];
      state.badge = null;
      state.query = '';
      render();
    });
  }

  /* ---- Mobile filter drawer ---- */
  const filterSidebar = document.getElementById('filter-sidebar');
  const filterToggle = document.getElementById('filter-toggle-mobile');
  const backdrop = document.getElementById('drawer-backdrop');

  function openFilterDrawer() {
    if (filterSidebar) filterSidebar.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-visible');
    document.body.classList.add('no-scroll');
  }
  function closeFilterDrawer() {
    if (filterSidebar) filterSidebar.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
  }

  if (filterToggle) filterToggle.addEventListener('click', openFilterDrawer);
  document.querySelectorAll('[data-close-filter]').forEach(function (btn) {
    btn.addEventListener('click', closeFilterDrawer);
  });
  if (backdrop) backdrop.addEventListener('click', closeFilterDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeFilterDrawer();
  });

  render();
}
