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

  // Projects table: image preview that trails the cursor (desktop only)
  var preview = document.getElementById('preview');
  var ptable = document.getElementById('ptable');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (preview && ptable && fine) {
    var img = preview.querySelector('img');
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var cx = tx, cy = ty, scale = 0.9, active = false;

    ptable.addEventListener('pointermove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
    });

    ptable.querySelectorAll('.prow').forEach(function (row) {
      row.addEventListener('pointerenter', function () {
        var src = row.getAttribute('data-img');
        if (src && img.getAttribute('src') !== src) img.setAttribute('src', src);
        active = true;
        preview.classList.add('is-on');
      });
      row.addEventListener('pointerleave', function () {
        active = false;
        preview.classList.remove('is-on');
      });
    });

    (function loop() {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      var target = active ? 1 : 0.9;
      scale += (target - scale) * 0.15;
      preview.style.transform =
        'translate(' + cx + 'px,' + cy + 'px) translate(-50%, -50%) scale(' + scale + ') rotate(-3deg)';
      window.requestAnimationFrame(loop);
    })();
  }
})();
