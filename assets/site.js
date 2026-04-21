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

// Testimonial slider — auto-advance every 5s, pause on hover, prev/next arrows
// and dots for manual control, respects prefers-reduced-motion.
(function () {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.testimonial-slider__slides .testimonial');
  const dots = slider.querySelectorAll('.testimonial-slider__dot');
  const prev = slider.querySelector('.testimonial-slider__arrow--prev');
  const next = slider.querySelector('.testimonial-slider__arrow--next');
  if (slides.length < 2) return;

  const DELAY = 5000;
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

  function advance(direction) {
    const step = direction === 'prev' ? -1 : 1;
    show((idx + step + slides.length) % slides.length);
  }

  function start() { if (!reduced) intervalId = setInterval(function () { advance('next'); }, DELAY); }
  function stop() { clearInterval(intervalId); }
  function restart() { stop(); start(); }

  start();
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { show(i); restart(); });
  });

  if (prev) prev.addEventListener('click', function () { advance('prev'); restart(); });
  if (next) next.addEventListener('click', function () { advance('next'); restart(); });

  // Keyboard support when slider is focused
  slider.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { advance('prev'); restart(); }
    if (e.key === 'ArrowRight') { advance('next'); restart(); }
  });
})();
