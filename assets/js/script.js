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

  // ===== Dark Mode Toggle =====
  const themeToggle = document.getElementById('dark-mode-toggle');

  // Load saved theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

});

