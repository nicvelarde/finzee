document.addEventListener('DOMContentLoaded', () => {
  // Fade-in animations
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.2 };

  const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Mobile menu toggle
  const toggleButton = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Download Resume PDF
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", async () => {
      const resume = document.getElementById("resume-content");
      if (!resume) return;

      // Backup original styles
      const originalStyle = resume.getAttribute("style") || "";

      // Apply print layout temporarily
      resume.style.width = "7.5in";
      resume.style.margin = "0 auto";
      resume.style.padding = "0.5in 0.75in";
      resume.style.background = "#fff";
      resume.style.color = "#000";
      resume.style.fontFamily = "Helvetica, Arial, sans-serif";
      resume.style.fontSize = "11pt";
      resume.style.lineHeight = "1.4";
      resume.style.display = "block";
      resume.style.overflow = "visible";
      resume.style.position = "relative";

      // Make fade-ins visible
      document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = 1;
        el.style.animation = 'none';
        el.style.transform = 'none';
      });

      // Hide navigation and footer for PDF
      const navbar = document.querySelector(".navbar");
      const footer = document.querySelector("footer");
      if (navbar) navbar.style.display = "none";
      if (footer) footer.style.display = "none";

      // PDF Options
      const options = {
        margin: 0,
        filename: 'Nicholas_Velarde_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: -window.scrollY,
          backgroundColor: "#ffffff"
        },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait'
        }
      };

      try {
        // Generate and download PDF
        await html2pdf().set(options).from(resume).save();
      } catch (err) {
        console.error("PDF generation error:", err);
      } finally {
        // Restore layout
        if (navbar) navbar.style.display = "";
        if (footer) footer.style.display = "";
        resume.setAttribute("style", originalStyle);
      }
    });
  }
});
