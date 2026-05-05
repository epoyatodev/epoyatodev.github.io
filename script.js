// NAV scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  if (el.closest('#hero')) {
    setTimeout(() => el.classList.add('visible'), i * 120);
  } else {
    revealObserver.observe(el);
  }
});

// Stagger project cards
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.project-card, .timeline-item').forEach(el => {
  cardObserver.observe(el);
});

// Particle canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

const PARTICLE_COUNT = 55;
const particles = [];

function randomBetween(a, b) { return a + Math.random() * (b - a); }

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: randomBetween(0, W),
    y: randomBetween(0, H),
    r: randomBetween(0.8, 2.2),
    vx: randomBetween(-0.15, 0.15),
    vy: randomBetween(-0.2, -0.05),
    alpha: randomBetween(0.1, 0.5),
    color: Math.random() > 0.5 ? '0,122,255' : '88,86,214',
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -10) { p.y = H + 10; p.x = randomBetween(0, W); }
    if (p.x < -10) p.x = W + 10;
    if (p.x > W + 10) p.x = -10;
  });

  // Draw subtle connections
  particles.forEach((a, i) => {
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0,122,255,${0.04 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener('resize', () => {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}, { passive: true });
