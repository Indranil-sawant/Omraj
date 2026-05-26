/**
 * Omraj Cleaning - Mobile Navigation Module
 * Production-ready, accessible, performant mobile navigation
 * Supports: Android, iOS Safari, Chrome Mobile, Tablets
 */
(function () {
  'use strict';

  // ── DOM References ──────────────────────────────────────────────
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('mobile-menu-overlay');
  const menuClose = document.getElementById('mobile-menu-close');
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-nav-link') : [];

  if (!header || !menuToggle || !mobileMenu || !menuOverlay) return;

  // ── State ───────────────────────────────────────────────────────
  let isOpen = false;
  let scrollPosition = 0;

  // ── Utility: Lock / Unlock body scroll ──────────────────────────
  function lockScroll() {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
  }

  function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
  }

  // ── Open Menu ───────────────────────────────────────────────────
  function openMenu() {
    if (isOpen) return;
    isOpen = true;

    lockScroll();

    // Toggle ARIA
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');

    // Show overlay first, then slide panel
    menuOverlay.classList.add('active');

    // Force reflow before adding active class for animation
    void mobileMenu.offsetHeight;
    mobileMenu.classList.add('active');

    // Animate hamburger → X
    menuToggle.classList.add('is-active');

    // Stagger nav links for a premium feel
    menuLinks.forEach(function (link, i) {
      link.style.transitionDelay = (60 + i * 50) + 'ms';
      link.classList.add('visible');
    });

    // Trap focus inside menu
    mobileMenu.focus();
  }

  // ── Close Menu ──────────────────────────────────────────────────
  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;

    // Remove stagger delays and visibility
    menuLinks.forEach(function (link) {
      link.style.transitionDelay = '0ms';
      link.classList.remove('visible');
    });

    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuToggle.classList.remove('is-active');

    // Update ARIA
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');

    unlockScroll();

    // Return focus to toggle
    menuToggle.focus();
  }

  // ── Event Listeners ─────────────────────────────────────────────

  // Hamburger toggle
  menuToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close button
  if (menuClose) {
    menuClose.addEventListener('click', function (e) {
      e.preventDefault();
      closeMenu();
    });
  }

  // Overlay click closes menu
  menuOverlay.addEventListener('click', function () {
    closeMenu();
  });

  // Escape key closes menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  // Close on nav link click (smooth UX)
  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Small delay for visual feedback before closing
      setTimeout(closeMenu, 150);
    });
  });

  // Close on resize past breakpoint (lg = 1024px)
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth >= 1024 && isOpen) {
        closeMenu();
      }
    }, 100);
  });

  // ── Header shadow on scroll ─────────────────────────────────────
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 10) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Trigger on load in case page is already scrolled
  if (window.scrollY > 10) {
    header.classList.add('header-scrolled');
  }

  // ── Prevent 300ms tap delay on iOS ──────────────────────────────
  document.addEventListener('touchstart', function () { }, { passive: true });

})();
