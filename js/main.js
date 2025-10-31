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

