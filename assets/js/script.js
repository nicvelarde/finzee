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
    // Disable fade-in
    document.querySelectorAll('.fade-in').forEach(el => el.style.opacity = 1);

    const resume = document.getElementById("resume-content");

    // Temporarily ensure the section is fully visible before renderint
    resume.style.maxHeight = "none";
    resume.style.overflow = "visable";

    const options = {
        margin: [0.3, 0.3, 0.3, 0.3],
        filename: 'Nicholas_Velarde_Resume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2,
                       useCORS: true,
                       scrollY: 0,
                       windowWidth: document.body.scrollHeight,
                       windowHeight: document.body.scrollHeight 
         },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf()
      .set(options)
      .from(resume)
      .save()
      .then(() => {
        resume.style.overflow = "";
        resume.style.maxHeight = "";
      });
});
