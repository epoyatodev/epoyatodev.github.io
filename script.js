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

// ─── i18n ────────────────────────────────────────────────────────────────────

const translations = {
  en: {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.appstore': 'App Store',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',

    'hero.greeting': "Hello, I'm",
    'hero.sub': 'Building high-quality native iOS experiences 🇪🇸',
    'hero.btn.projects': 'View Projects',
    'hero.btn.cv': 'Download CV',
    'hero.btn.contact': 'Get in Touch',
    'badge.remote': 'Remote',

    'about.title': 'About <span class="gradient-text">Me</span>',
    'about.p1': "I'm an iOS developer with <strong>4+ years of experience</strong> building native, high-performance apps using Swift and SwiftUI. I care deeply about clean architecture, smooth performance, and user experiences that feel natural on Apple devices.",
    'about.p2': 'I work fully <strong>remote</strong>, collaborate with cross-functional teams, and have delivered end-to-end mobile solutions across sectors like banking, transportation, education, and automotive.',
    'about.p3': 'Outside of client work, I enjoy building personal projects that push the limits of SwiftUI — from 3D scanning apps to custom UI components.',
    'stat.years': 'Years Experience',
    'stat.industries': 'Industries',
    'stat.repos': 'Repositories',
    'stat.langs': 'Languages',

    'skills.title': 'Tech <span class="gradient-text">Stack</span>',
    'skills.core': 'Core',
    'skills.frameworks': 'Frameworks',
    'skills.architecture': 'Architecture',
    'skills.tools': 'Tools',

    'appstore.title': 'Published on <span class="gradient-text">App Store</span>',
    'appstore.sub': 'Native iOS apps available on the Apple App Store',
    'badge.appstore': 'App Store',
    'app.mitrimestre.title': 'MiTrimestre',
    'app.mitrimestre.desc': 'iOS app for Spanish freelancers to manage quarterly VAT (IVA) and income tax (IRPF) in real time. Features AI invoice scanning, iCloud sync, PDF export, and deadline reminders.',

    'projects.title': 'Personal <span class="gradient-text">Projects</span>',
    'projects.sub': 'Open-source iOS apps and UI components built with SwiftUI',
    'badge.component': 'Component',
    'proj.expense.title': 'Expense Tracker',
    'proj.expense.desc': 'Personal finance app to track income, expenses and savings with visual charts and category breakdowns.',
    'proj.rickmorty.title': 'Rick & Morty App',
    'proj.rickmorty.desc': 'Character browser consuming the Rick & Morty REST API, showcasing protocol-oriented MVVM and local persistence.',
    'proj.mapkit.title': 'MapKit Search & Route',
    'proj.mapkit.desc': 'Interactive map app with place search, route planning and the native LookAround street-level view.',
    'proj.weather.title': 'Weather App Design',
    'proj.weather.desc': 'Polished weather app UI focused on beautiful animations, glassmorphism cards and fluid transitions.',
    'proj.task.title': 'Task App',
    'proj.task.desc': 'Real-time task management app with user authentication and cloud sync powered by Firebase.',
    'proj.paging.title': 'Animated Paging Indicators',
    'proj.paging.desc': 'Drop-in SwiftUI component with smooth, customisable paging dot animations for onboarding flows.',
    'proj.sheet.title': 'Custom Blur Sheet',
    'proj.sheet.desc': 'Reusable SwiftUI bottom sheet with native blur effect, drag gesture and configurable snap points.',

    'exp.title': 'Work <span class="gradient-text">Experience</span>',
    'exp.alten.role': 'Senior iOS Developer',
    'exp.alten.date': 'Oct 2022 — Present',
    'exp.alten.desc': 'Responsible for the overall architecture and development of iOS applications. Led the design, implementation, and maintenance of robust, scalable, and high-performance mobile solutions. Collaborated with cross-functional teams to define technical strategy.',
    'exp.dinoroco.role': 'iOS App Developer',
    'exp.dinoroco.date': 'May 2024 — Nov 2025',
    'exp.dinoroco.desc': 'Delivered end-to-end mobile solutions using SwiftUI (iOS 16–17, Swift 6). Built apps from scratch with robust architecture, real-time data handling, and seamless user experiences.',
    'exp.wimedia.role': 'iOS Developer — 3D Scanning',
    'exp.wimedia.date': 'Mar 2024 — Jun 2024',
    'exp.wimedia.desc': 'Built an innovative iOS app leveraging the iPhone TrueDepth camera to scan physical objects and generate accurate 3D models. Implemented advanced depth-data processing pipelines.',

    'contact.title': "Let's <span class=\"gradient-text\">Work Together</span>",
    'contact.sub': 'Available for freelance projects · Remote',
    'contact.email': 'Email',

    'footer.text': 'Designed &amp; built by <span class="gradient-text">Enrique Poyato Ortiz</span> · 2026',
  },

  es: {
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.appstore': 'App Store',
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',

    'hero.greeting': 'Hola, soy',
    'hero.sub': 'Creando experiencias iOS nativas y de alta calidad 🇪🇸',
    'hero.btn.projects': 'Ver Proyectos',
    'hero.btn.cv': 'Descargar CV',
    'hero.btn.contact': 'Contactar',
    'badge.remote': 'Remoto',

    'about.title': 'Sobre <span class="gradient-text">Mí</span>',
    'about.p1': 'Soy desarrollador iOS con <strong>más de 4 años de experiencia</strong> creando apps nativas de alto rendimiento con Swift y SwiftUI. Me importa la arquitectura limpia, el rendimiento fluido y las experiencias de usuario que se sienten naturales en dispositivos Apple.',
    'about.p2': 'Trabajo completamente en <strong>remoto</strong>, colaboro con equipos multidisciplinares y he entregado soluciones móviles end-to-end en sectores como banca, transporte, educación y automoción.',
    'about.p3': 'Fuera del trabajo con clientes, disfruto construyendo proyectos personales que llevan SwiftUI al límite, desde apps de escaneo 3D hasta componentes UI personalizados.',
    'stat.years': 'Años de Experiencia',
    'stat.industries': 'Sectores',
    'stat.repos': 'Repositorios',
    'stat.langs': 'Idiomas',

    'skills.title': 'Stack <span class="gradient-text">Técnico</span>',
    'skills.core': 'Core',
    'skills.frameworks': 'Frameworks',
    'skills.architecture': 'Arquitectura',
    'skills.tools': 'Herramientas',

    'appstore.title': 'Publicado en <span class="gradient-text">App Store</span>',
    'appstore.sub': 'Apps iOS nativas disponibles en la Apple App Store',
    'badge.appstore': 'App Store',
    'app.mitrimestre.title': 'MiTrimestre',
    'app.mitrimestre.desc': 'App iOS para autónomos españoles para gestionar el IVA e IRPF trimestral en tiempo real. Incluye escaneo de facturas con IA, sincronización con iCloud, exportación PDF y recordatorios de plazos.',

    'projects.title': 'Proyectos <span class="gradient-text">Personales</span>',
    'projects.sub': 'Apps iOS open-source y componentes UI construidos con SwiftUI',
    'badge.component': 'Componente',
    'proj.expense.title': 'Expense Tracker',
    'proj.expense.desc': 'App de finanzas personales para registrar ingresos, gastos y ahorros con gráficos visuales y desglose por categorías.',
    'proj.rickmorty.title': 'Rick & Morty App',
    'proj.rickmorty.desc': 'Navegador de personajes que consume la API REST de Rick & Morty, con MVVM orientado a protocolos y persistencia local.',
    'proj.mapkit.title': 'MapKit Search & Route',
    'proj.mapkit.desc': 'App de mapas interactiva con búsqueda de lugares, planificación de rutas y la vista LookAround a nivel de calle.',
    'proj.weather.title': 'Weather App Design',
    'proj.weather.desc': 'UI de app del tiempo con animaciones cuidadas, tarjetas glassmorphism y transiciones fluidas.',
    'proj.task.title': 'Task App',
    'proj.task.desc': 'App de gestión de tareas en tiempo real con autenticación de usuario y sincronización en la nube con Firebase.',
    'proj.paging.title': 'Animated Paging Indicators',
    'proj.paging.desc': 'Componente SwiftUI con animaciones de puntos de paginación suaves y personalizables para flujos de onboarding.',
    'proj.sheet.title': 'Custom Blur Sheet',
    'proj.sheet.desc': 'Bottom sheet SwiftUI reutilizable con efecto blur nativo, gesto de arrastre y puntos de snap configurables.',

    'exp.title': 'Experiencia <span class="gradient-text">Laboral</span>',
    'exp.alten.role': 'Senior iOS Developer',
    'exp.alten.date': 'Oct 2022 — Actualidad',
    'exp.alten.desc': 'Responsable de la arquitectura general y el desarrollo de aplicaciones iOS. Lideré el diseño, implementación y mantenimiento de soluciones móviles robustas, escalables y de alto rendimiento. Colaboré con equipos multidisciplinares para definir la estrategia técnica.',
    'exp.dinoroco.role': 'iOS App Developer',
    'exp.dinoroco.date': 'May 2024 — Nov 2025',
    'exp.dinoroco.desc': 'Entregué soluciones móviles end-to-end usando SwiftUI (iOS 16–17, Swift 6). Construí apps desde cero con arquitectura robusta, manejo de datos en tiempo real y experiencias de usuario fluidas.',
    'exp.wimedia.role': 'iOS Developer — Escaneo 3D',
    'exp.wimedia.date': 'Mar 2024 — Jun 2024',
    'exp.wimedia.desc': 'Desarrollé una app iOS innovadora que aprovecha la cámara TrueDepth del iPhone para escanear objetos físicos y generar modelos 3D precisos. Implementé pipelines avanzados de procesamiento de datos de profundidad.',

    'contact.title': 'Trabajemos <span class="gradient-text">Juntos</span>',
    'contact.sub': 'Disponible para proyectos freelance · Remoto',
    'contact.email': 'Email',

    'footer.text': 'Diseñado y desarrollado por <span class="gradient-text">Enrique Poyato Ortiz</span> · 2026',
  }
};

function applyLanguage(lang) {
  document.getElementById('html-root').lang = lang;
  document.getElementById('langToggle').textContent = lang === 'en' ? 'ES' : 'EN';
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });
}

const savedLang = localStorage.getItem('lang') || 'en';
applyLanguage(savedLang);

document.getElementById('langToggle').addEventListener('click', () => {
  const current = localStorage.getItem('lang') || 'en';
  applyLanguage(current === 'en' ? 'es' : 'en');
});
