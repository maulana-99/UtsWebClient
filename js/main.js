/* ilham — portfolio interactions */
(function () {
  'use strict';

  // Mark page ready -> triggers load-reveal animations
  function ready() {
    requestAnimationFrame(function () {
      document.body.classList.add('is-ready');
    });
  }
  if (document.readyState === 'complete') ready();
  else window.addEventListener('load', ready);

  // Navbar: add border/background once the user scrolls
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Highlight the current page in the navbar
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var target = (link.getAttribute('href') || '').toLowerCase();
    if (target === here || (here === '' && target === 'index.html')) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Welcome page: language switcher
  var greetingEl = document.querySelector('[data-id="greeting"]');
  var langToggle = document.querySelector('.lang-toggle');

  if (greetingEl && langToggle) {
    var greetings = {
      id: 'Selamat Datang',
      en: 'Welcome'
    };

    var currentLang = localStorage.getItem('lang') || 'id';
    var updateGreeting = function (lang) {
      currentLang = lang;
      localStorage.setItem('lang', lang);
      greetingEl.textContent = greetings[lang];

      document.querySelectorAll('.lang-indicator').forEach(function (indicator) {
        indicator.classList.toggle('active', indicator.getAttribute('data-lang') === lang);
      });
    };

    langToggle.addEventListener('click', function () {
      var nextLang = currentLang === 'id' ? 'en' : 'id';
      greetingEl.style.opacity = '0';
      setTimeout(function () {
        updateGreeting(nextLang);
        greetingEl.style.opacity = '1';
      }, 200);
    });

    updateGreeting(currentLang);
    greetingEl.style.transition = 'opacity 0.2s var(--ease)';
  }

  // Projects table: image preview sidebar with click-to-change
  var previewImg = document.getElementById('preview-img');
  var ptable = document.getElementById('ptable');

  if (previewImg && ptable) {
    ptable.querySelectorAll('.prow').forEach(function (row) {
      row.addEventListener('click', function (e) {
        e.preventDefault();
        var src = row.getAttribute('data-img');
        if (src) {
          previewImg.style.opacity = '0.7';
          setTimeout(function () {
            previewImg.setAttribute('src', src);
            previewImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }
})();
