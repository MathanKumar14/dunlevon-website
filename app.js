/* =============================================================
   VIDEO CONFIGURATION
   ---------------------------------------------------------------
   When you have your .mp4 demo files ready, add the paths here.
   Set `src` to the relative path of your video file.
   Set `placeholder: true` to keep showing the animated box instead.

   Example:
     src: 'videos/lane-master-demo.mp4'
     placeholder: false
   ============================================================= */
const VIDEOS = {
  visionpilot: {
    id:          'visionpilot',
    src:         '',          // e.g. 'videos/visionpilot-demo.mp4'
    placeholder: true,
    label:       'VisionPilot™ Demo',
  },
  lanemaster: {
    id:          'lanemaster',
    src:         '',          // e.g. 'videos/lane-master-demo.mp4'
    placeholder: true,
    label:       'Lane-Master™ Demo',
  },
  dynamiccruise: {
    id:          'dynamiccruise',
    src:         '',          // e.g. 'videos/dynamic-cruise-demo.mp4'
    placeholder: true,
    label:       'Dynamic-Cruise™ Demo',
  },
  shieldaeb: {
    id:          'shieldaeb',
    src:         '',          // e.g. 'videos/shield-aeb-demo.mp4'
    placeholder: true,
    label:       'Shield-AEB™ Demo',
  },
};

/* =============================================================
   VIDEO LOADER
   Reads the VIDEOS config and, for any entry with placeholder:false
   and a valid src, swaps the placeholder <div> for a real <video>.
   ============================================================= */
function loadVideos() {
  Object.values(VIDEOS).forEach(({ id, src, placeholder, label }) => {
    if (placeholder || !src) return;

    const container = document.querySelector(`[data-video="${id}"]`);
    if (!container) return;

    const video = document.createElement('video');
    video.className    = 'product-video-player';
    video.src          = src;
    video.autoplay     = true;
    video.muted        = true;
    video.loop         = true;
    video.playsInline  = true;
    video.setAttribute('aria-label', label);

    container.replaceWith(video);
  });
}

/* =============================================================
   STICKY NAVBAR
   ============================================================= */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* =============================================================
   MOBILE NAV TOGGLE
   ============================================================= */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.dataset.open === 'true';
    navLinks.dataset.open = isOpen ? 'false' : 'true';
    navToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

    Object.assign(navLinks.style, isOpen
      ? { display: '' }
      : {
          display:        'flex',
          flexDirection:  'column',
          position:       'absolute',
          top:            '72px',
          left:           '0',
          right:          '0',
          background:     'rgba(26,28,30,0.97)',
          backdropFilter: 'blur(20px)',
          padding:        '16px 24px 24px',
          borderBottom:   '1px solid rgba(255,255,255,0.08)',
          gap:            '4px',
        }
    );
  });

  // Close on any nav link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.dataset.open = 'false';
      navLinks.style.display = '';
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =============================================================
   SCROLL FADE-IN ANIMATION
   ============================================================= */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* =============================================================
   CONTACT FORM
   ============================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Sent!';
    btn.style.background = '#0A8A7E';
    btn.disabled   = true;

    setTimeout(() => {
      btn.innerHTML        = originalHTML;
      btn.style.background = '';
      btn.disabled         = false;
      form.reset();
    }, 3500);
  });
}

/* =============================================================
   SMOOTH SCROLL (Safari polyfill)
   ============================================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* =============================================================
   BOOT
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  loadVideos();
  initNavbar();
  initMobileNav();
  initScrollAnimations();
  initContactForm();
  initSmoothScroll();
});
