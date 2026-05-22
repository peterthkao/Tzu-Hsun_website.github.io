// Scroll-reveal: fade-up animation for content blocks
// Targets: .card, .pub-item, .pub-dropdown, .home-pubs, .home-chips,
//          .home-intro, .section-label, h2, .about-block, .project-item,
//          and anything with class .reveal

(function () {
  // Elements to animate — adjust selector to add/remove targets
  const SELECTOR = [
    '.card',
    '.pub-dropdown',
    '.pub-item',
    '.home-pubs',
    '.home-chips',
    '.home-intro',
    '.home-layout',
    '.section-label',
    '.about-block',
    '.about-grid',
    '.about-details',
    '.about-detail',
    '.timeline-item',
    '.award-item',
    '.project-item',
    '.section-intro',
    '.reveal',
  ].join(', ');

  // Stagger delay between siblings (ms)
  const STAGGER = 150;

  function initReveal() {
    const elements = document.querySelectorAll(SELECTOR);
    if (!elements.length) return;

    // Mark each element; compute stagger within sibling groups
    const parentSeen = new Map();
    elements.forEach((el) => {
      el.classList.add('sr-hidden');
      const parent = el.parentElement;
      const idx = parentSeen.has(parent) ? parentSeen.get(parent) + 1 : 0;
      parentSeen.set(parent, idx);
      el.dataset.srDelay = idx * STAGGER;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.srDelay || 0, 10);
            setTimeout(() => {
              el.classList.remove('sr-hidden');
              el.classList.add('sr-visible');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // Expose so dynamic pages (research.html) can re-run after async content loads
  window.__scrollRevealInit = initReveal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
