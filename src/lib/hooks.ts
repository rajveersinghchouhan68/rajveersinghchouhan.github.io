import { useEffect, useRef, useState } from 'react';
import { TYPED_ROLES } from './config';

export function useTypedRole(): string {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPED_ROLES[roleIndex];
    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
    } else if (isDeleting && charIndex === 0) {
      delay = 500;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setText(current.substring(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setText(current.substring(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % TYPED_ROLES.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [roleIndex, charIndex, isDeleting]);

  return text;
}

export function useHeroPortrait() {
  const stageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const parallax = parallaxRef.current;
    const portal = portalRef.current;
    const canvas = canvasRef.current;
    if (!stage) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let parallaxFrame = 0;
    let particleFrame = 0;

    const badges = stage.querySelectorAll('.portrait-badge');

    const onPointerMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const resetParallax = () => {
      targetX = 0;
      targetY = 0;
    };

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      const moveX = currentX * 8;
      const moveY = currentY * 6;
      const tiltY = currentX * 3;
      const tiltX = -currentY * 2;

      if (parallax) {
        parallax.style.transform = `translate3d(${moveX}px, ${moveY}px, 12px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`;
      }
      if (portal) {
        portal.style.transform = `translateX(calc(-50% + ${currentX * -4}px)) translateY(${currentY * 3}px)`;
      }
      badges.forEach((badge, i) => {
        const depth = 1 + i * 0.1;
        (badge as HTMLElement).style.transform =
          `translate(-50%, -50%) translate3d(${moveX * depth * 0.25}px, ${moveY * depth * 0.2}px, 0)`;
      });

      parallaxFrame = requestAnimationFrame(animateParallax);
    };

    if (!isTouch && !reducedMotion && parallax) {
      stage.addEventListener('mousemove', onPointerMove);
      stage.addEventListener('mouseleave', resetParallax);
      animateParallax();
    }

    let w = 0;
    let h = 0;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      life: number;
      hue: number;
    }> = [];

    const spawnParticle = () => ({
      x: w * (0.32 + Math.random() * 0.36),
      y: h * (0.7 + Math.random() * 0.3),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.9 + 0.3),
      radius: Math.random() * 1.6 + 0.4,
      life: Math.random() * 0.5 + 0.5,
      hue: Math.random() > 0.25 ? 168 : 205,
    });

    const resizePortalCanvas = () => {
      if (!canvas) return;
      const rect = stage.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height * 0.32);
      canvas.width = w;
      canvas.height = h;
      canvas.style.height = `${h}px`;
    };

    const initPortalParticles = () => {
      particles = [];
      const count = Math.min(36, Math.floor(w / 10));
      for (let i = 0; i < count; i++) {
        const p = spawnParticle();
        p.y = h * (0.4 + Math.random() * 0.6);
        p.life = Math.random();
        particles.push(p);
      }
    };

    const drawPortalParticles = () => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

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
    };

    const onResize = () => {
      resizePortalCanvas();
      initPortalParticles();
    };

    if (canvas && !reducedMotion) {
      resizePortalCanvas();
      initPortalParticles();
      drawPortalParticles();
      window.addEventListener('resize', onResize);
    }

    return () => {
      cancelAnimationFrame(parallaxFrame);
      cancelAnimationFrame(particleFrame);
      stage.removeEventListener('mousemove', onPointerMove);
      stage.removeEventListener('mouseleave', resetParallax);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return { stageRef, parallaxRef, portalRef, canvasRef };
}

export function usePortfolioEffects(): void {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const nav = document.getElementById('nav');
    const onScroll = () => {
      nav?.classList.toggle('scrolled', window.scrollY > 50);

      let current = '';
      document.querySelectorAll('section[id]').forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 100;
        if (window.scrollY >= top) {
          current = section.getAttribute('id') ?? '';
        }
      });

      document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
        const link = a as HTMLAnchorElement;
        link.style.color =
          link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
      });
    };
    window.addEventListener('scroll', onScroll);

    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navBackdrop = document.getElementById('nav-backdrop');
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    const setNavOpen = (isOpen: boolean) => {
      navLinks?.classList.toggle('open', isOpen);
      navToggle?.classList.toggle('active', isOpen);
      navToggle?.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
      if (navBackdrop) {
        navBackdrop.classList.toggle('visible', isOpen);
        navBackdrop.setAttribute('aria-hidden', String(!isOpen));
      }
    };

    const onToggle = () => setNavOpen(!navLinks?.classList.contains('open'));
    navToggle?.addEventListener('click', onToggle);
    navBackdrop?.addEventListener('click', () => setNavOpen(false));

    navLinks?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNavOpen(false));
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    const onResize = () => {
      if (window.innerWidth > 768) setNavOpen(false);
    };
    window.addEventListener('resize', onResize);

    const statNums = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseFloat(el.dataset.target ?? '0');
            const isDecimal = target % 1 !== 0;
            let current = 0;
            const step = target / 60;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = isDecimal ? current.toFixed(1) : String(Math.floor(current));
            }, 25);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNums.forEach((el) => counterObserver.observe(el));

    document.querySelectorAll('.skill-tag').forEach((tag) => {
      const el = tag as HTMLElement;
      const level = el.dataset.level ?? '80';
      el.style.setProperty('--level', level);

      if (!isTouchDevice) {
        const onEnter = () => {
          el.style.transform = 'translateY(-4px) scale(1.05)';
        };
        const onLeave = () => {
          el.style.transform = '';
        };
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      }
    });

    if (!isTouchDevice) {
      document.querySelectorAll('.tilt-card').forEach((card) => {
        const el = card as HTMLElement;
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
          const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
          el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        };
        const onLeave = () => {
          el.style.transform = '';
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
      });

      document.querySelectorAll('.magnetic').forEach((btn) => {
        const el = btn as HTMLElement;
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        };
        const onLeave = () => {
          el.style.transform = '';
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
      });
    }

    document.querySelectorAll('.pipeline-node').forEach((node, i) => {
      (node as HTMLElement).style.animationDelay = `${i * 0.2}s`;
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    }

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      navToggle?.removeEventListener('click', onToggle);
      navBackdrop?.removeEventListener('click', () => setNavOpen(false));
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
