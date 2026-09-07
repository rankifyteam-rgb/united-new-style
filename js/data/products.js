/* ==========================================================================
   United New Style — Product Catalog (sample data)

   This is placeholder catalog data for the initial site build. Replace with
   a real product feed later (e.g. fetch() from your commerce backend) —
   every place that reads this file only needs an array of objects shaped
   like the ones below, so swapping the source is a one-file change.

   Images are intentionally left as null. Each product renders a premium
   gradient placeholder until real photography is added to /assets/products/.
   ========================================================================== */

export const PRODUCTS = [
  // ---------------------------------------------------------------- T-Shirts
  {
    id: 'tee-heritage-crew',
    name: 'Heritage Crew Tee',
    category: 'tshirts',
    categoryLabel: 'T-Shirts',
    price: 48,
    salePrice: null,
    badge: 'New',
    rating: 4.8,
    reviews: 214,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-TEE-001',
    description: 'Our signature crew neck tee, cut from heavyweight 240gsm combed cotton for a fuller, more premium drape than a standard tee.',
    image: null,
    page: 'product-crew-tee.html'
  },
  {
    id: 'tee-signature-pocket',
    name: 'Signature Pocket Tee',
    category: 'tshirts',
    categoryLabel: 'T-Shirts',
    price: 42,
    salePrice: null,
    badge: null,
    rating: 4.6,
    reviews: 132,
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'UNS-TEE-002',
    description: 'A clean pocket tee built on the same heavyweight cotton base as our Heritage Crew, finished with a reinforced chest pocket.',
    image: null,
    page: null
  },
  {
    id: 'tee-essential-longsleeve',
    name: 'Essential Long Sleeve Tee',
    category: 'tshirts',
    categoryLabel: 'T-Shirts',
    price: 56,
    salePrice: null,
    badge: null,
    rating: 4.7,
    reviews: 98,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-TEE-003',
    description: 'A year-round layering essential in brushed cotton jersey, with a clean ribbed collar that holds its shape wash after wash.',
    image: null,
    page: null
  },
  {
    id: 'tee-classic-ringer',
    name: 'Classic Ringer Tee',
    category: 'tshirts',
    categoryLabel: 'T-Shirts',
    price: 46,
    salePrice: 36,
    badge: 'Sale',
    rating: 4.5,
    reviews: 76,
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'UNS-TEE-004',
    description: 'A modern take on the varsity ringer tee with contrast trims, cut for a relaxed, easy fit.',
    image: null,
    page: null
  },
  {
    id: 'tee-premium-henley',
    name: 'Premium Henley Tee',
    category: 'tshirts',
    categoryLabel: 'T-Shirts',
    price: 58,
    salePrice: null,
    badge: null,
    rating: 4.9,
    reviews: 61,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-TEE-005',
    description: 'A three-button henley in soft-touch waffle cotton — an elevated staple that layers cleanly under jackets and overshirts.',
    image: null,
    page: null
  },
  {
    id: 'tee-vintage-wash',
    name: 'Vintage Wash Tee',
    category: 'tshirts',
    categoryLabel: 'T-Shirts',
    price: 44,
    salePrice: null,
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 301,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-TEE-006',
    description: 'Garment-dyed and stone washed for a broken-in feel from the very first wear. Our most-loved tee, season after season.',
    image: null,
    page: null
  },
  {
    id: 'tee-didar-mubarak',
    name: 'Didar Mubarak T-Shirt',
    category: 'tshirts',
    categoryLabel: 'T-Shirts',
    price: 750,
    salePrice: null,
    badge: 'New',
    rating: 5,
    reviews: 0,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '9-10Y', 'S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-OCC-001',
    description: 'Celebrate your special Didar function with elegance and style. This premium white Didar Mubarak T-Shirt features an elegant gold "Didar Mubarak" printed design, specially created for Didar functions, family gatherings, and memorable occasions.',
    image: null,
    page: 'product-didar-mubarak.html',
    currency: '₹',
    freeShipping: true
  },

  // ---------------------------------------------------------------- Clothing
  {
    id: 'shirt-heritage-oxford',
    name: 'Heritage Oxford Shirt',
    category: 'clothing',
    categoryLabel: 'Clothing',
    price: 98,
    salePrice: null,
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 187,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-CLO-001',
    description: 'A tailored Oxford shirt in brushed cotton twill, designed to move seamlessly from the office to evenings out.',
    image: null,
    page: 'product-oxford-shirt.html'
  },
  {
    id: 'trouser-tailored-chino',
    name: 'Tailored Chino Trouser',
    category: 'clothing',
    categoryLabel: 'Clothing',
    price: 88,
    salePrice: null,
    badge: null,
    rating: 4.6,
    reviews: 54,
    sizes: ['28', '30', '32', '34', '36', '38'],
    sku: 'UNS-CLO-002',
    description: 'A precisely tailored chino with a tapered leg and a stretch cotton blend for all-day comfort.',
    image: null,
    page: null
  },
  {
    id: 'sweater-merino-wool',
    name: 'Merino Wool Sweater',
    category: 'clothing',
    categoryLabel: 'Clothing',
    price: 128,
    salePrice: null,
    badge: 'New',
    rating: 4.8,
    reviews: 43,
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'UNS-CLO-003',
    description: 'Fine-gauge 100% merino wool, naturally temperature-regulating and soft against the skin — a cold-weather essential.',
    image: null,
    page: null
  },
  {
    id: 'shirt-classic-flannel',
    name: 'Classic Flannel Shirt',
    category: 'clothing',
    categoryLabel: 'Clothing',
    price: 92,
    salePrice: 74,
    badge: 'Sale',
    rating: 4.7,
    reviews: 88,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-CLO-004',
    description: 'Brushed flannel in a timeless check, finished with mother-of-pearl buttons for a subtle premium detail.',
    image: null,
    page: null
  },
  {
    id: 'hoodie-relaxed-fit',
    name: 'Relaxed Fit Hoodie',
    category: 'clothing',
    categoryLabel: 'Clothing',
    price: 86,
    salePrice: null,
    badge: null,
    rating: 4.7,
    reviews: 119,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-CLO-005',
    description: 'Heavyweight fleece with a relaxed, dropped-shoulder fit and a double-lined hood that holds structure.',
    image: null,
    page: null
  },
  {
    id: 'overshirt-structured',
    name: 'Structured Overshirt',
    category: 'clothing',
    categoryLabel: 'Clothing',
    price: 110,
    salePrice: null,
    badge: null,
    rating: 4.6,
    reviews: 37,
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'UNS-CLO-006',
    description: 'A structured mid-layer between a shirt and a jacket, cut from a durable brushed twill.',
    image: null,
    page: null
  },

  // ----------------------------------------------------------------- Fashion
  {
    id: 'jacket-premium-denim',
    name: 'Premium Denim Jacket',
    category: 'fashion',
    categoryLabel: 'Fashion',
    price: 189,
    salePrice: 149,
    badge: 'Sale',
    rating: 4.9,
    reviews: 156,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-FAS-001',
    description: 'A premium selvedge denim jacket with a tailored silhouette, built to soften and fade beautifully with wear.',
    image: null,
    page: 'product-denim-jacket.html'
  },
  {
    id: 'coat-tailored-wool',
    name: 'Tailored Wool Overcoat',
    category: 'fashion',
    categoryLabel: 'Fashion',
    price: 349,
    salePrice: null,
    badge: null,
    rating: 4.9,
    reviews: 29,
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'UNS-FAS-002',
    description: 'A statement wool-blend overcoat with a clean silhouette and satin lining — the finishing piece for any outfit.',
    image: null,
    page: null
  },
  {
    id: 'bomber-signature',
    name: 'Signature Bomber Jacket',
    category: 'fashion',
    categoryLabel: 'Fashion',
    price: 210,
    salePrice: null,
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 142,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-FAS-003',
    description: 'A modern bomber in a durable technical shell with a soft brushed lining and ribbed cuffs.',
    image: null,
    page: null
  },
  {
    id: 'moto-leather-trim',
    name: 'Leather Trim Moto Jacket',
    category: 'fashion',
    categoryLabel: 'Fashion',
    price: 265,
    salePrice: null,
    badge: null,
    rating: 4.7,
    reviews: 48,
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'UNS-FAS-004',
    description: 'An asymmetric moto jacket with genuine leather trim detailing and a fitted, tailored cut.',
    image: null,
    page: null
  },
  {
    id: 'field-jacket-quilted',
    name: 'Quilted Field Jacket',
    category: 'fashion',
    categoryLabel: 'Fashion',
    price: 175,
    salePrice: null,
    badge: null,
    rating: 4.6,
    reviews: 33,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'UNS-FAS-005',
    description: 'A quilted field jacket with a water-resistant shell, built for transitional weather without sacrificing style.',
    image: null,
    page: null
  },
  {
    id: 'trench-statement',
    name: 'Statement Trench Coat',
    category: 'fashion',
    categoryLabel: 'Fashion',
    price: 298,
    salePrice: null,
    badge: 'New',
    rating: 4.8,
    reviews: 21,
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'UNS-FAS-006',
    description: 'A double-breasted trench in water-resistant cotton gabardine, belted at the waist for a tailored finish.',
    image: null,
    page: null
  }
];

export function getProductById(id) {
  return PRODUCTS.find(function (p) { return p.id === id; });
}

export function getProductsByCategory(category) {
  return PRODUCTS.filter(function (p) { return p.category === category; });
}

export function getRelatedProducts(product, limit) {
  limit = limit || 4;
  return PRODUCTS.filter(function (p) {
    return p.category === product.category && p.id !== product.id;
  }).slice(0, limit);
}

export function getBestSellers(limit) {
  limit = limit || 4;
  return PRODUCTS.filter(function (p) { return p.badge === 'Bestseller'; })
    .concat(PRODUCTS.filter(function (p) { return p.badge !== 'Bestseller'; }))
    .slice(0, limit);
}

export function getNewArrivals(limit) {
  limit = limit || 4;
  return PRODUCTS.filter(function (p) { return p.badge === 'New'; })
    .concat(PRODUCTS.filter(function (p) { return p.badge !== 'New'; }))
    .slice(0, limit);
}
