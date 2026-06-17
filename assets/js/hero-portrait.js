/* ===== HERO PORTRAIT — portal particles & parallax ===== */
(function initHeroPortrait() {
  const stage = document.getElementById('portrait-stage');
  const parallax = document.getElementById('portrait-parallax');
  const portal = document.getElementById('portal-ellipse');
  const badges = document.querySelectorAll('.portrait-badge');
  const canvas = document.getElementById('portal-particles');

  if (!stage) return;

  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function onPointerMove(e) {
    const rect = stage.getBoundingClientRect();
    targetX = (e.clientX - rect.left) / rect.width - 0.5;
    targetY = (e.clientY - rect.top) / rect.height - 0.5;
  }

  function resetParallax() {
    targetX = 0;
    targetY = 0;
  }

  if (!isTouch && !reducedMotion && parallax) {
    stage.addEventListener('mousemove', onPointerMove);
    stage.addEventListener('mouseleave', resetParallax);

    function animateParallax() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      const moveX = currentX * 8;
      const moveY = currentY * 6;
      const tiltY = currentX * 3;
      const tiltX = -currentY * 2;

      parallax.style.transform =
        `translate3d(${moveX}px, ${moveY}px, 12px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`;

      if (portal) {
        portal.style.transform =
          `translateX(calc(-50% + ${currentX * -4}px)) translateY(${currentY * 3}px)`;
      }

      badges.forEach((badge, i) => {
        const depth = 1 + i * 0.1;
        badge.style.transform =
          `translate(-50%, -50%) translate3d(${moveX * depth * 0.25}px, ${moveY * depth * 0.2}px, 0)`;
      });

      requestAnimationFrame(animateParallax);
    }

    animateParallax();
  }

  if (!canvas || reducedMotion) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let particleFrame;
  let w = 0;
  let h = 0;

  function resizePortalCanvas() {
    const rect = stage.getBoundingClientRect();
    w = Math.floor(rect.width);
    h = Math.floor(rect.height * 0.32);
    canvas.width = w;
    canvas.height = h;
    canvas.style.height = `${h}px`;
  }

  function spawnParticle() {
    return {
      x: w * (0.32 + Math.random() * 0.36),
      y: h * (0.7 + Math.random() * 0.3),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.9 + 0.3),
      radius: Math.random() * 1.6 + 0.4,
      life: Math.random() * 0.5 + 0.5,
      hue: Math.random() > 0.25 ? 168 : 205,
    };
  }

  function initPortalParticles() {
    particles = [];
    const count = Math.min(36, Math.floor(w / 10));
    for (let i = 0; i < count; i++) {
      const p = spawnParticle();
      p.y = h * (0.4 + Math.random() * 0.6);
      p.life = Math.random();
      particles.push(p);
    }
  }

  function drawPortalParticles() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.008;

      if (p.life <= 0 || p.y < 0) {
        Object.assign(p, spawnParticle());
        return;
      }

      const alpha = p.life * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 58%, ${alpha})`;
      ctx.fill();
    });

    particleFrame = requestAnimationFrame(drawPortalParticles);
  }

  resizePortalCanvas();
  initPortalParticles();
  drawPortalParticles();

  window.addEventListener('resize', () => {
    resizePortalCanvas();
    initPortalParticles();
  });
})();
