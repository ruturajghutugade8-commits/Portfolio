// Page interactions, animations, and small parallax
document.addEventListener("DOMContentLoaded", () => {
  // Set year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // IntersectionObserver reveal
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".anim").forEach((el) => obs.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      const offset = 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // Simple parallax for background (subtle)
  const bg = document.querySelector(".bg-image");
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    if (bg) bg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  });

  // External links handlers
  window.openDemo = function (e) {
    e.preventDefault();
    const url = e.target.getAttribute("href");
    if (url && url !== "#") {
      window.open(url, "_blank"); // Opens new screen
    }
  };

  window.openCode = function (e) {
    e.preventDefault();
    const url = e.target.getAttribute("href");
    if (url && url !== "#") {
      window.open(url, "_blank");
    }
  };

  // Mobile nav toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const nav = document.querySelector(".nav");
  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", () => {
      if (nav.style.display === "flex") {
        nav.style.display = "";
      } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.background =
          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))";
        nav.style.padding = "12px";
        nav.style.position = "absolute";
        nav.style.right = "16px";
        nav.style.top = "66px";
        nav.style.borderRadius = "10px";
        nav.style.boxShadow = "0 12px 40px rgba(0,0,0,0.6)";
      }
    });
  }

  // Animate skill meters once in view
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".meter-fill").forEach((fill) => {
            const w = fill.style.width;
            fill.style.width = "0";
            // animate to target
            setTimeout(() => (fill.style.width = w), 120);
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(".skills-grid")
    .forEach((el) => skillsObserver.observe(el));

  // ================== IMAGE FULLSCREEN OVERLAY ==================
  const overlay = document.getElementById("imgOverlay");
  const overlayImg = document.getElementById("overlayImg");
  const closeBtn = overlay ? overlay.querySelector(".close-btn") : null;

  if (overlay && overlayImg && closeBtn) {
    // Open fullscreen image on project image click
    document.querySelectorAll(".project-img").forEach((img) => {
      img.style.cursor = "zoom-in"; // UX hint
      img.addEventListener("click", () => {
        overlayImg.src = img.src;
        overlay.classList.add("show");
      });
    });

    // Close on button click
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("show");
      overlayImg.src = "";
    });

    // Close on background click
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("show");
        overlayImg.src = "";
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("show")) {
        overlay.classList.remove("show");
        overlayImg.src = "";
      }
    });
  } else {
    console.warn("Image overlay elements not found in DOM.");
  }
});
