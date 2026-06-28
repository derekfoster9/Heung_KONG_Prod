// 香江文藝慶典製作公司 - Main JavaScript
// Language toggle & interactive features

(function() {
  'use strict';

  // --- 1. LANGUAGE TOGGLE ---
  function initLanguageToggle() {
    const savedLang = localStorage.getItem('preferredLang') || 'zh-hk';
    let currentLang = savedLang;

    function switchLang(lang) {
      document.querySelectorAll('[data-lang]').forEach(function(el) {
        const key = el.getAttribute('data-lang');
        if (langData[lang] && langData[lang][key]) {
          el.innerHTML = langData[lang][key];
        }
      });

      document.querySelectorAll('.lang-toggle').forEach(function(btn) {
        const target = btn.getAttribute('data-lang-target');
        if (target === lang) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      currentLang = lang;
      localStorage.setItem('preferredLang', lang);
    }

    document.querySelectorAll('.lang-toggle').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        const target = this.getAttribute('data-lang-target');
        if (target) switchLang(target);
      });
    });

    switchLang(savedLang);
  }

  // --- 2. NAVIGATION ACTIVE STATE ---
  function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  }

  // --- 3. MOBILE HAMBURGER MENU ---
  function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close menu when clicking a nav link
      document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }
  }

  // --- 4. GALLERY LIGHTBOX ---
  function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item img').forEach(function(img) {
      img.addEventListener('click', function() {
        if (lightboxImg) {
          lightboxImg.src = this.src;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    lightbox.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- 5. FAQ ACCORDION ---
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function(question) {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isOpen = this.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-question').forEach(function(q) {
          q.classList.remove('active');
          q.nextElementSibling.style.maxHeight = null;
        });

        if (!isOpen) {
          this.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // --- 6. GALLERY FILTER ---
  function initGalleryFilter() {
    document.querySelectorAll('.gallery-filter').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        document.querySelectorAll('.gallery-filter').forEach(function(b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        document.querySelectorAll('.gallery-item').forEach(function(item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 7. SMOOTH SCROLL ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- Initialize Everything ---
  document.addEventListener('DOMContentLoaded', function() {
    initLanguageToggle();
    initActiveNav();
    initHamburger();
    initLightbox();
    initFAQ();
    initGalleryFilter();
    initSmoothScroll();
  });

})();
