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

  // ===== Highlight Current Section =====
  const sections = document.querySelectorAll("section");
  const navLinksAll = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // adjust offset for navbar height
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinksAll.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

// ===== Load Projects from JSON =====
  fetch("assets/data/projects.json")
    .then(response => response.json())
    .then(projects => {
      const container = document.getElementById("project-list");
      if (!container) return;

      const projectCards = projects.map(p => `
        <div class="project-card fade-in">
          <h4>${p.title}</h4>
          <p>${p.description}</p>
          ${p.link ? `<a href="${p.link}" target="_blank" class="project-link">View Project</a>` : ""}
        </div>
      `).join("");

      container.innerHTML = projectCards;
    })
    .catch(err => console.error("Error loading projects:", err));


});

