/* ===== CONTACT CONFIG ===== */
(function applyContactConfig() {
  const cfg = window.PORTFOLIO_CONFIG || {};
  const emailLink = document.getElementById('link-email');
  const linkedinLink = document.getElementById('link-linkedin');
  const githubLink = document.getElementById('link-github');
  const locationEl = document.getElementById('contact-location');
  const jsonEl = document.getElementById('contact-json');

  if (cfg.email && emailLink) {
    emailLink.href = `mailto:${cfg.email}`;
    emailLink.querySelector('.contact-link-text').textContent = cfg.email;
  }

  if (cfg.linkedin && linkedinLink) {
    linkedinLink.href = cfg.linkedin;
  }

  if (cfg.github && githubLink) {
    githubLink.href = cfg.github;
  }

  const profilePhoto = document.getElementById('profile-photo');
  const profileFallback = document.getElementById('profile-fallback');
  const profileLinkedin = document.getElementById('profile-linkedin');

  if (cfg.profileImage && profilePhoto) {
    profilePhoto.src = cfg.profileImage;
  }

  if (cfg.linkedin && profileLinkedin) {
    profileLinkedin.href = cfg.linkedin;
  }

  if (profilePhoto && profileFallback) {
    profilePhoto.addEventListener('load', () => {
      profilePhoto.style.opacity = '1';
      profileFallback.style.display = 'none';
    });

    profilePhoto.addEventListener('error', () => {
      profilePhoto.style.display = 'none';
      profileFallback.style.display = 'flex';
    });

    if (!profilePhoto.complete || profilePhoto.naturalWidth === 0) {
      profilePhoto.style.opacity = '0';
      profileFallback.style.display = 'flex';
    } else {
      profilePhoto.style.opacity = '1';
      profileFallback.style.display = 'none';
    }
  }

  const certs = cfg.certifications || {};
  const associateEl = document.getElementById('cert-associate');
  const professionalEl = document.getElementById('cert-professional');

  if (certs.associate?.verifyUrl && associateEl) {
    associateEl.href = certs.associate.verifyUrl;
  }

  if (certs.professional?.verifyUrl && professionalEl) {
    professionalEl.href = certs.professional.verifyUrl;
  }

  if (cfg.location && locationEl) {
    locationEl.textContent = cfg.location;
  }

  if (jsonEl && cfg.email) {
    const lines = [
      '  <span class="t-key">"name"</span>: <span class="t-str">"Rajveer Singh Chouhan"</span>,',
      '  <span class="t-key">"role"</span>: <span class="t-str">"Senior Software Engineer"</span>,',
      '  <span class="t-key">"company"</span>: <span class="t-str">"Kadel Labs"</span>,',
      `  <span class="t-key">"email"</span>: <span class="t-str">"${cfg.email}"</span>,`,
      `  <span class="t-key">"linkedin"</span>: <span class="t-str">"${cfg.linkedin || ''}"</span>,`,
      '  <span class="t-key">"focus"</span>: [<span class="t-str">"Databricks"</span>, <span class="t-str">"ETL"</span>, <span class="t-str">"Azure"</span>],',
      '  <span class="t-key">"status"</span>: <span class="t-str">"ready_to_connect"</span>',
    ];
    jsonEl.innerHTML = '{\n' + lines.join('\n') + '\n}';
  }
})();

/* ===== GITHUB REPOS ===== */
(async function loadGitHubRepos() {
  const cfg = window.PORTFOLIO_CONFIG || {};
  const username = cfg.githubUsername || 'rajveersinghchouhan';
  const reposEl = document.getElementById('github-repos');
  const avatarEl = document.getElementById('github-avatar');
  const usernameEl = document.getElementById('github-username');
  const profileLink = document.getElementById('github-profile-link');

  if (usernameEl) usernameEl.textContent = `@${username}`;
  if (profileLink && cfg.github) profileLink.href = cfg.github;

  if (!reposEl) return;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
    ]);

    if (userRes.ok) {
      const user = await userRes.json();
      if (avatarEl && user.avatar_url) {
        avatarEl.innerHTML = `<img src="${user.avatar_url}" alt="${username} on GitHub" />`;
      }
    }

    if (!reposRes.ok) throw new Error('Failed to load repos');

    const repos = await reposRes.json();
    const publicRepos = repos.filter((repo) => !repo.fork);

    if (publicRepos.length === 0) {
      reposEl.innerHTML = `
        <div class="github-empty">
          No public repositories yet.
          <br /><br />
          <a href="${cfg.github || `https://github.com/${username}`}" target="_blank" rel="noopener noreferrer">
            View @${username} on GitHub ↗
          </a>
        </div>`;
      return;
    }

    reposEl.innerHTML = publicRepos
      .map(
        (repo) => `
        <a href="${repo.html_url}" class="repo-card tilt-card" target="_blank" rel="noopener noreferrer">
          <h4>📁 ${repo.name}</h4>
          <p>${repo.description || 'No description provided.'}</p>
          <div class="repo-meta">
            ${repo.language ? `<span class="repo-lang">● ${repo.language}</span>` : ''}
            <span>★ ${repo.stargazers_count}</span>
            <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </a>`
      )
      .join('');

    document.querySelectorAll('#github-repos .tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  } catch {
    reposEl.innerHTML = `
      <div class="github-empty">
        Could not load repositories right now.
        <br /><br />
        <a href="${cfg.github || `https://github.com/${username}`}" target="_blank" rel="noopener noreferrer">
          Open GitHub profile ↗
        </a>
      </div>`;
  }
})();

/* ===== CURSOR GLOW ===== */
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  if (cursorGlow) {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
  }
  requestAnimationFrame(animateGlow);
}
animateGlow();

/* ===== PARTICLE NETWORK ===== */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor(window.innerWidth / 12), 100);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 212, 170, 0.5)';
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(0, 212, 170, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  animFrame = requestAnimationFrame(drawParticles);
}

resizeCanvas();
initParticles();
drawParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

/* ===== TYPED ROLE ===== */
const roles = [
  'Data Engineer',
  'Backend Engineer',
  'Databricks Specialist',
  'ETL Pipeline Architect',
  'Cloud Analytics Engineer',
];
const typedEl = document.getElementById('typed-role');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 500;
  }

  setTimeout(typeRole, delay);
}
typeRole();

/* ===== TERMINAL TYPING ===== */
const terminalCommands = [
  'spark.sql("SELECT * FROM silver.hr_attrition")',
  'git push origin main -- deploy triggered',
  'databricks jobs run-now --job-id prod_etl',
  'bundle validate && bundle deploy -t prod',
];
let cmdIndex = 0;
const terminalLine = document.getElementById('terminal-cursor-line');

function typeTerminal() {
  const cmd = terminalCommands[cmdIndex];
  let i = 0;
  terminalLine.textContent = '';

  const interval = setInterval(() => {
    if (i < cmd.length) {
      terminalLine.textContent += cmd[i];
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        cmdIndex = (cmdIndex + 1) % terminalCommands.length;
        typeTerminal();
      }, 3000);
    }
  }, 60);
}
setTimeout(typeTerminal, 3000);

/* ===== SCROLL REVEAL ===== */
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

/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== MOBILE NAV ===== */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== COUNTER ANIMATION ===== */
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const isDecimal = target % 1 !== 0;
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);
statNums.forEach((el) => counterObserver.observe(el));

/* ===== SKILL TAG LEVELS ===== */
document.querySelectorAll('.skill-tag').forEach((tag) => {
  const level = tag.dataset.level || 80;
  tag.style.setProperty('--level', level);

  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'translateY(-4px) scale(1.05)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = '';
  });
});

/* ===== 3D TILT CARDS ===== */
document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.magnetic').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ===== SMOOTH ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach((a) => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

/* ===== PARALLAX ON PIPELINE NODES ===== */
document.querySelectorAll('.pipeline-node').forEach((node, i) => {
  node.style.animationDelay = `${i * 0.2}s`;
});

/* ===== REDUCE MOTION ===== */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  cancelAnimationFrame(animFrame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
}
