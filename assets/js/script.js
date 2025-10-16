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

  // Download PDF
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", async () => {
      const resume = document.getElementById("resume-content");
      if (!resume) return;

      // Backup original styles
      const originalStyle = resume.getAttribute("style") || "";

      // Make fade-ins visible
      document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = 1;
        el.style.animation = 'none';
        el.style.transform = 'none';
      });

      // Hide navbar/footer temporarily
      const navbar = document.querySelector(".navbar");
      const footer = document.querySelector("footer");
      if (navbar) navbar.style.display = "none";
      if (footer) footer.style.display = "none";

      // Generate PDF
      const options = {
        margin: [0.25,0.25,0.25,0.25],
        filename: 'Nicholas_Velarde_Resume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 850,
          windowHeight: document.body.scrollHeight,
          backgroundColor: "#ffffff"
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(options).from(resume).save().finally(() => {
        // Restore styles
        resume.setAttribute("style", originalStyle);
        if (navbar) navbar.style.display = "";
        if (footer) footer.style.display = "";
      });
    });
  }
});

