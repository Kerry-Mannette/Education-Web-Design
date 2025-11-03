/* Toggle mobile menu (hamburger) */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const btn = navbar && navbar.querySelector('.nav-toggle');
  const panel = navbar && navbar.querySelector('.menu-panel');
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (navbar && btn) {
    const setOpen = (open) => {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      navbar.classList.toggle('menu-open', open);
      const icon = btn.querySelector('i');
      if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    btn.addEventListener('click', () =>
      setOpen(btn.getAttribute('aria-expanded') !== 'true')
    );

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbar.classList.contains('menu-open')) setOpen(false);
    });

    // Close when clicking outside the menu-panel
    document.addEventListener('click', (e) => {
      if (!navbar.classList.contains('menu-open')) return;
      if (panel && !panel.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });
  }

// Slideshow
   let slideIndex = 1;
  let autoAdvance = true; // Track if auto-advance is enabled
  let slideInterval = null; // Store the interval reference
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    const status = document.getElementById('carousel-status');

    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].setAttribute('aria-hidden', 'true');
      slides[i].setAttribute('tabindex', '-1');
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
      dots[i].removeAttribute('aria-current');
    }

    slides[slideIndex - 1].style.display = "flex";
    slides[slideIndex - 1].setAttribute('aria-hidden', 'false');
    slides[slideIndex - 1].setAttribute('tabindex', '0');
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += " active";
      dots[slideIndex - 1].setAttribute('aria-current', 'true');
    }

    if (status) status.textContent = `Slide ${slideIndex} of ${slides.length}`;
  }

  // Function to stop auto-advance
  function stopAutoAdvance() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
      autoAdvance = false;
    }
  }

  // Respect reduced motion: don't auto-advance slides
  if (!prefersReducedMotion) {
    slideInterval = setInterval(() => {
      if (autoAdvance) {
        plusSlides(1);
      }
    }, 4000);
  }

 //dot click functionality
  const dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => {
      stopAutoAdvance(); // Stop auto-advance when user clicks a dot
      currentSlide(i + 1);
    });
  }

  // arrow click functionality
const prevArrow = document.querySelector('.arrow-controls .prev');
const nextArrow = document.querySelector('.arrow-controls .next');

if (prevArrow) {
  prevArrow.addEventListener('click', () => {
    stopAutoAdvance(); // Stop auto-advance when user clicks prev arrow
    plusSlides(-1); 
  });
}

if (nextArrow) {
  nextArrow.addEventListener('click', () => {
    stopAutoAdvance(); // Stop auto-advance when user clicks next arrow
    plusSlides(1); 
  });
}

  // Stop auto-advance when user clicks on a slide
  const slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].addEventListener('click', () => {
      stopAutoAdvance();
    });
  }

  // Keyboard navigation within carousel (Left/Right/Home/End)
  const carousel = document.querySelector('.alumni-carousel');
  if (carousel) {
    carousel.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === 'ArrowLeft') { e.preventDefault(); stopAutoAdvance(); plusSlides(-1); }
      if (key === 'ArrowRight') { e.preventDefault(); stopAutoAdvance(); plusSlides(1); }
      if (key === 'Home') { e.preventDefault(); stopAutoAdvance(); currentSlide(1); }
      if (key === 'End') { e.preventDefault(); stopAutoAdvance(); currentSlide(document.getElementsByClassName('mySlides').length); }
    });
  }

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
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = prefersReducedMotion ? 0 : 1800; // no animation if reduced motion
      const startTime = performance.now();
      const targets = Array.from(statsNumbers).map(el => parseInt(el.textContent.replace(/,/g, '')));
      
      const step = (currentTime) => {
        const progress = duration === 0 ? 1 : Math.min((currentTime - startTime) / duration, 1);
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

// Accessible dropdowns to toggle with click and keyboard
document.addEventListener('DOMContentLoaded', () => {
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  function closeAll(except) {
    dropdownItems.forEach(item => {
      if (item !== except) {
        const toggle = item.querySelector('.dropdown-toggle');
        item.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  dropdownItems.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    const menu = item.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;

    // Click to toggle
    toggle.addEventListener('click', (e) => {
      const isOpen = item.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        closeAll(item);
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
      e.stopPropagation();
    });

    // Keyboard support
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
      if (e.key === 'Escape') {
        item.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    menu.addEventListener('keydown', (e) => {
      const links = Array.from(menu.querySelectorAll('a'));
      const idx = links.indexOf(document.activeElement);
      if (e.key === 'Escape') {
        e.preventDefault();
        item.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = links[(idx + 1) % links.length];
        if (next) next.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = links[(idx - 1 + links.length) % links.length];
        if (prev) prev.focus();
      }
    });
  });

  // Click-away to close
  document.addEventListener('click', (e) => {
    const anyOpen = document.querySelector('.has-dropdown.open');
    if (anyOpen && !anyOpen.contains(e.target)) {
      closeAll();
    }
  });
});
