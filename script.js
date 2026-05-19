// script.js

// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initial Hero Animation Timeline
const tl = gsap.timeline();

tl.to('.hero-overlay', {
  opacity: 1,
  duration: 1
})
.from('.hero-tag', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
}, "-=0.5")
.from('.hero-title .line span', {
  y: 120,
  opacity: 0,
  duration: 1.2,
  stagger: 0.15,
  ease: "power4.out"
}, "-=0.6")
.from('.hero-desc', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
}, "-=0.8")
.from('.btn-group', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
}, "-=0.6")
.from('.hero-bg img', {
  scale: 1.15,
  duration: 2,
  ease: "power2.out"
}, "-=2.5");

// Parallax for Hero Image
gsap.to('.hero-bg img', {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// Stats Counters
const stats = document.querySelectorAll('.counter');
stats.forEach(stat => {
  const target = parseInt(stat.getAttribute('data-target'));
  
  ScrollTrigger.create({
    trigger: stat,
    start: "top 80%",
    onEnter: () => {
      gsap.to(stat, {
        innerHTML: target,
        duration: 2.5,
        snap: { innerHTML: 1 },
        ease: "power2.out"
      });
    },
    once: true
  });
});

// Fade Up Elements
gsap.utils.toArray('.fade-up').forEach(element => {
  gsap.to(element, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    }
  });
});

// Staggered Services
gsap.from('.service-card', {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 80%",
  }
});

// Process Timeline
gsap.from('.process-item', {
  x: -60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".process-list",
    start: "top 75%",
  }
});

// Gallery Parallax Effect
gsap.utils.toArray('.gallery-item img').forEach(img => {
  gsap.to(img, {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
      trigger: img.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// Horizontal Scroll Testimonials
const track = document.querySelector('.testimonials-track');
if (track) {
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 80) + "px",
    ease: "none",
    scrollTrigger: {
      trigger: ".testimonials-wrap",
      start: "top center",
      end: "bottom center",
      scrub: 1,
      pin: false
    }
  });
}

// Mouse glow effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// CTA Parallax Background
gsap.to('.cta-bg', {
  yPercent: 20,
  ease: "none",
  scrollTrigger: {
    trigger: ".cta-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
