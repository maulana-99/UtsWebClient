/* Interactive cursor trail.
   Adapted from Ksenia Kondrashova's "satisfying cursor" tutorial:
   https://dev.to/uuuuuulala/coding-an-interactive-and-damn-satisfying-cursor-7-simple-steps-2kb-of-code-1c8b
   Branded to the site accent + guarded for touch / reduced-motion. */
(function () {
  'use strict';

  var canvas = document.querySelector('canvas.cursor-trail');
  if (!canvas) return;

  // Desktop pointers only, and respect reduced-motion.
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) { canvas.style.display = 'none'; return; }

  var ctx = canvas.getContext('2d');
  var trailColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--aw-red').trim() || '#FF3C00';
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var mouseMoved = false;
  var pointer = { x: 0.5 * window.innerWidth, y: 0.5 * window.innerHeight };

  var params = {
    pointsNumber: 40,
    widthFactor: 0.3,
    mouseThreshold: 0.6,
    spring: 0.4,
    friction: 0.5
  };

  var trail = new Array(params.pointsNumber);
  for (var i = 0; i < params.pointsNumber; i++) {
    trail[i] = { x: pointer.x, y: pointer.y, dx: 0, dy: 0 };
  }

  window.addEventListener('click', function (e) { setPointer(e.clientX, e.clientY); });
  window.addEventListener('mousemove', function (e) {
    mouseMoved = true;
    setPointer(e.clientX, e.clientY);
  });

  function setPointer(x, y) { pointer.x = x; pointer.y = y; }

  function setupCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', setupCanvas);
  setupCanvas();
  window.requestAnimationFrame(update);

  function update(t) {
    // gentle idle motion before the first mouse move
    if (!mouseMoved) {
      pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
      pointer.y = (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = trailColor;
    ctx.lineCap = 'round';

    trail.forEach(function (p, pIdx) {
      var prev = pIdx === 0 ? pointer : trail[pIdx - 1];
      var spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
      p.dx += (prev.x - p.x) * spring;
      p.dy += (prev.y - p.y) * spring;
      p.dx *= params.friction;
      p.dy *= params.friction;
      p.x += p.dx;
      p.y += p.dy;
    });

    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    for (var j = 1; j < trail.length - 1; j++) {
      var xc = 0.5 * (trail[j].x + trail[j + 1].x);
      var yc = 0.5 * (trail[j].y + trail[j + 1].y);
      ctx.quadraticCurveTo(trail[j].x, trail[j].y, xc, yc);
      ctx.lineWidth = params.widthFactor * (params.pointsNumber - j);
      ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();

    window.requestAnimationFrame(update);
  }
})();
