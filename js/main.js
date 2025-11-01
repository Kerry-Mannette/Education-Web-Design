/* Toggle mobile menu (hamburger) */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const btn = navbar && navbar.querySelector('.nav-toggle');
  const panel = navbar && navbar.querySelector('.menu-panel');
  if (!navbar || !btn) return;

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    navbar.classList.toggle('menu-open', open);
    const icon = btn.querySelector('i');
    if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('menu-open')) setOpen(false);
  });

  // Close when clicking outside the menu-panel
  document.addEventListener('click', (e) => {
    if (!navbar.classList.contains('menu-open')) return;
    if (panel && !panel.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });
});

// Footer reveal on scroll-to-bottom
document.addEventListener('DOMContentLoaded', function () {
  const footer = document.querySelector('.site-footer');

  if (!footer) return;

  const showFooter = () => {
    // check if user at bottom - 60px 
    const threshold = 60;
    const scrolledToBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - threshold);

    if (scrolledToBottom) {
      footer.classList.add('visible');
    } else {
      footer.classList.remove('visible');
    }
  };

  showFooter();

  // Use passive event listener
  window.addEventListener('scroll', showFooter, { passive: true });

  // Also show/hide on resize / height changes
  window.addEventListener('resize', showFooter);
});

// Stats number animate
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.stats-section');
  const statsNumbers = document.querySelectorAll('.statistic h3');

  if (!statsSection || statsNumbers.length === 0) return;

  const animateStats = () => {
    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0 && !statsSection.classList.contains('animated')) {
      statsSection.classList.add('animated');

      const duration = 1800; // 1.8 secs
      const startTime = performance.now();
      const targets = Array.from(statsNumbers).map(el => parseInt(el.textContent.replace(/,/g, '')));
      
      const step = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        statsNumbers.forEach((el, i) => {
          const value = Math.floor(progress * targets[i]);
          el.textContent = value.toLocaleString();
        });
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Ensure final numbers are exact
          statsNumbers.forEach((el, i) => el.textContent = targets[i].toLocaleString());
        }
      };

      requestAnimationFrame(step);
    }
  };

  window.addEventListener('scroll', animateStats, { passive: true });
  window.addEventListener('resize', animateStats);
  animateStats(); // Run on load in case section is already in view
});

