document.addEventListener('DOMContentLoaded', () => {
  // Fade-in animation
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.2 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // Mobile menu toggle
  const toggleButton = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => navLinks.classList.toggle('show'));
  }
});

