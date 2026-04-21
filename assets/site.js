// Mobile nav toggle.
// Toggles the .nav__links dropdown below the sticky header on small screens.
(function () {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (!toggle || !links) return;

  function setOpen(open) {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    setOpen(!links.classList.contains('is-open'));
  });

  // Close on Escape.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('is-open')) setOpen(false);
  });

  // Close on click outside the header.
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav') && links.classList.contains('is-open')) setOpen(false);
  });
})();
