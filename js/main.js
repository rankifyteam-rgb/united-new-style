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
})();
