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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('is-open')) setOpen(false);
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav') && links.classList.contains('is-open')) setOpen(false);
  });
})();

// Testimonial slider — auto-advance every 8s, pause on hover, dots for manual,
// respects prefers-reduced-motion.
(function () {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.testimonial-slider__slides .testimonial');
  const dots = slider.querySelectorAll('.testimonial-slider__dot');
  if (slides.length < 2) return;

  const DELAY = 8000;
  let idx = 0;
  let intervalId;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(i) {
    slides[idx].classList.remove('is-active');
    if (dots[idx]) dots[idx].classList.remove('is-active');
    idx = i;
    slides[idx].classList.add('is-active');
    if (dots[idx]) dots[idx].classList.add('is-active');
  }

  function advance() { show((idx + 1) % slides.length); }
  function start() { if (!reduced) intervalId = setInterval(advance, DELAY); }
  function stop() { clearInterval(intervalId); }

  start();
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      show(i);
      stop();
      start();
    });
  });
})();
