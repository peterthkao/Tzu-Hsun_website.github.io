// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll-to-bottom → black nav
function updateNavOnScroll() {
  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
  document.querySelector('nav').classList.toggle('nav-dark', scrolledToBottom);
}

window.addEventListener('scroll', updateNavOnScroll, { passive: true });
updateNavOnScroll();
