/* ==========================================================================
   United New Style — Homepage rendering
   ========================================================================== */
import { getBestSellers, getNewArrivals } from '../data/products.js';
import { renderProductGrid } from '../render.js';

export function initHome() {
  renderProductGrid(document.getElementById('best-sellers-grid'), getBestSellers(4));
  renderProductGrid(document.getElementById('new-arrivals-grid'), getNewArrivals(4));
}
