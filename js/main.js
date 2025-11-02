/* Toggle mobile menu (hamburger) */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const btn = navbar && navbar.querySelector('.nav-toggle');
  const panel = navbar && navbar.querySelector('.menu-panel');
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

    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");

    slides[slideIndex - 1].style.display = "flex";
    if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
  }

  setInterval(() => {
    plusSlides(1);
  }, 2000);

 //dot click functionality
  const dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => {
      currentSlide(i + 1);
    });
  }

  // arrow click functionality
const prevArrow = document.querySelector('.arrow-controls .prev');
const nextArrow = document.querySelector('.arrow-controls .next');

if (prevArrow) {
  prevArrow.addEventListener('click', () => {
    plusSlides(-1); 
  });
}

if (nextArrow) {
  nextArrow.addEventListener('click', () => {
    plusSlides(1); 
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
