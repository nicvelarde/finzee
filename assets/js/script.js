document.addEventListener('DOMContentLoaded', () => {
  // Fade-in animations
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2
  };

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
});

document.getElementById("downloadBtn").addEventListener("click", () => {
    const resume = document.getElementById("resume-content");

    // Remove any animations or transitions that could interfere
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = 1;
        el.style.animation = 'none';
    });

    // Ensure everything is visible
    resume.style.overflow = "visible";
    resume.style.maxHeight = "none";
    resume.style.display = "block";
    resume.style.position = "relative";

    // Set up options
    const options = {
        margin: 0.3,
        filename: 'Nicholas_Velarde_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollX: 0,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.scrollWidth,
            windowHeight: document.documentElement.scrollHeight,
            backgroundColor: "#ffffff"
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        }
    };

    // Generate the PDF
    html2pdf()
        .set(options)
        .from(resume)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
            pdf.save('Nicholas_Velarde_Resume.pdf');
        })
        .catch((err) => console.error("PDF generation error:", err));
});

