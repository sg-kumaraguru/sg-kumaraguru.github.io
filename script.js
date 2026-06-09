const lenis = new Lenis({
  duration: 1.1,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener(
  'scroll',
  () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  },
  { passive: true }
);

// Hero animation
const heroLines = document.querySelectorAll('.hero-line');

heroLines.forEach(el => {
  el.style.transform = 'translateY(28px)';
});

heroLines.forEach((el, i) => {
  setTimeout(() => {
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.style.transform = 'translateY(0)';
    el.style.opacity = '1';
  }, 180 + i * 120);
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

reveals.forEach(el => revealObserver.observe(el));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');

    if (!id || id === '#') return;

    const target = document.querySelector(id);

    if (target) {
      event.preventDefault();
      lenis.scrollTo(target, { offset: -70 });
    }
  });
});

// Contact button
document
  .getElementById('contactHeroBtn')
  ?.addEventListener('click', () => {
    lenis.scrollTo('#contact', { offset: -70 });
  });

// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const mobilePanel = document.getElementById('mobile-panel');

let isMenuOpen = false;

menuBtn?.addEventListener('click', event => {
  event.stopPropagation();

  isMenuOpen = !isMenuOpen;

  mobilePanel.style.maxHeight = isMenuOpen
    ? `${mobilePanel.scrollHeight}px`
    : '0';

  menuBtn.innerHTML = isMenuOpen
    ? '<i class="ri-close-line"></i>'
    : '<i class="ri-menu-line"></i>';
});

mobilePanel?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobilePanel.style.maxHeight = '0';
    menuBtn.innerHTML = '<i class="ri-menu-line"></i>';
    isMenuOpen = false;
  });
});

document.addEventListener('click', event => {
  if (
    isMenuOpen &&
    !mobilePanel.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {
    mobilePanel.style.maxHeight = '0';
    menuBtn.innerHTML = '<i class="ri-menu-line"></i>';
    isMenuOpen = false;
  }
});
