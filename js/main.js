/* ==========================================================================
   United New Style — Front-end interactions
   No backend required. Wire these up to real services when ready:
   - Newsletter form  -> connect to an email provider (Mailchimp, Klaviyo, etc.)
   - Contact form     -> connect to a form handler or backend endpoint
   - Add to bag        -> connect to your cart / e-commerce backend
   ========================================================================== */
(function () {
  'use strict';

  var toast = document.getElementById('toast');
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2600);
  }

  /* Sticky header shadow on scroll */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile navigation toggle */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  var navOverlay = document.querySelector('.nav-overlay');

  function closeNav() {
    if (!mainNav) return;
    mainNav.classList.remove('is-open');
    if (navOverlay) navOverlay.classList.remove('is-visible');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    if (!mainNav) return;
    var isOpen = mainNav.classList.toggle('is-open');
    if (navOverlay) navOverlay.classList.toggle('is-visible', isOpen);
    if (navToggle) navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (navToggle) navToggle.addEventListener('click', toggleNav);
  if (navOverlay) navOverlay.addEventListener('click', closeNav);
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  /* Cart counter (front-end demo only) */
  var cartCount = document.querySelector('.cart-count');
  var count = 0;

  document.querySelectorAll('.add-to-cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      count += 1;
      if (cartCount) cartCount.textContent = String(count);
      var name = btn.getAttribute('data-product') || 'Item';
      showToast(name + ' added to your bag');
    });
  });

  /* Newsletter form (front-end demo only, no backend wired yet) */
  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var successEl = document.getElementById('newsletter-success');
      var input = newsletterForm.querySelector('input[type="email"]');
      if (successEl) successEl.classList.add('is-visible');
      showToast('Thank you for subscribing');
      if (input) input.value = '';
    });
  }

  /* Contact form (front-end demo only, no backend wired yet) */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Message sent. We will be in touch shortly.');
      contactForm.reset();
    });
  }

  /* FAQ accordion (used on faq.html) */
  document.querySelectorAll('.faq-item h3').forEach(function (heading) {
    heading.addEventListener('click', function () {
      var item = heading.closest('.faq-item');
      if (!item) return;
      var wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('is-open');
      });
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* Set current year in footer */
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ===================== Product detail page (product-*.html) ===================== */

  /* Gallery thumbnail switching */
  var mainImage = document.getElementById('mainProductImage');
  document.querySelectorAll('.gallery-thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      if (!mainImage) return;
      document.querySelectorAll('.gallery-thumb').forEach(function (el) {
        el.classList.remove('is-active');
      });
      thumb.classList.add('is-active');
      mainImage.setAttribute('src', thumb.getAttribute('data-image'));
      mainImage.setAttribute('alt', thumb.getAttribute('data-alt') || mainImage.getAttribute('alt'));
    });
  });

  /* Size selector */
  var sizeSelector = document.getElementById('sizeSelector');
  var sizeError = document.getElementById('sizeError');
  var selectedSize = null;

  if (sizeSelector) {
    sizeSelector.querySelectorAll('.size-swatch').forEach(function (btn) {
      btn.addEventListener('click', function () {
        sizeSelector.querySelectorAll('.size-swatch').forEach(function (el) {
          el.classList.remove('is-selected');
        });
        btn.classList.add('is-selected');
        selectedSize = btn.getAttribute('data-size');
        sizeSelector.classList.remove('has-error');
        if (sizeError) sizeError.hidden = true;
      });
    });
  }

  /* Quantity stepper */
  var qtyInput = document.getElementById('productQty');
  document.querySelectorAll('.qty-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!qtyInput) return;
      var value = parseInt(qtyInput.value, 10) || 1;
      var min = parseInt(qtyInput.getAttribute('min'), 10) || 1;
      var max = parseInt(qtyInput.getAttribute('max'), 10) || 10;
      if (btn.getAttribute('data-action') === 'increase' && value < max) value += 1;
      if (btn.getAttribute('data-action') === 'decrease' && value > min) value -= 1;
      qtyInput.value = String(value);
    });
  });

  /* Add to Cart / Buy Now — require a size to be selected first.
     Front-end demo only: wire this up to your real cart / checkout backend. */
  function handleProductAction(button, isBuyNow) {
    if (!button) return;
    button.addEventListener('click', function () {
      if (sizeSelector && !selectedSize) {
        sizeSelector.classList.add('has-error');
        if (sizeError) sizeError.hidden = false;
        sizeSelector.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      var qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;
      var name = button.getAttribute('data-product') || 'Item';
      var count = parseInt((cartCount && cartCount.textContent) || '0', 10);
      count += qty;
      if (cartCount) cartCount.textContent = String(count);
      var sizeLabel = selectedSize ? ' (Size ' + selectedSize + ')' : '';
      if (isBuyNow) {
        showToast(name + sizeLabel + ' added — proceeding to checkout');
      } else {
        showToast(name + sizeLabel + ' added to your bag');
      }
    });
  }

  handleProductAction(document.getElementById('addToCartBtn'), false);
  handleProductAction(document.getElementById('buyNowBtn'), true);
})();
