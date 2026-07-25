/* =========================================================
   Nyra Invites — Interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Sticky navigation shadow on scroll ---- */
  const nav = document.getElementById("nav");
  const toTop = document.getElementById("toTop");

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 30);
    toTop.classList.toggle("show", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu toggle ---- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  const closeMenu = () => {
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu when a link is tapped
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      links.classList.contains("open") &&
      !links.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ---- Scroll reveal animations ---- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // subtle stagger for grouped items
            const delay = Math.min(i * 60, 180);
            setTimeout(() => entry.target.classList.add("in"), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---- Auto-update footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Live countdown in the hero mockup (demo) ---- */
  const cd = document.querySelector(".mock__countdown");
  if (cd) {
    // Target: ~140 days from today, purely illustrative
    const target = new Date();
    target.setDate(target.getDate() + 140);

    const cells = cd.querySelectorAll("b");
    const pad = (n) => String(n).padStart(2, "0");

    const tick = () => {
      const diff = Math.max(0, target - new Date());
      const days = Math.floor(diff / 86400000);
      const hrs = Math.floor((diff / 3600000) % 24);
      const mins = Math.floor((diff / 60000) % 60);
      if (cells[0]) cells[0].textContent = days;
      if (cells[1]) cells[1].textContent = pad(hrs);
      if (cells[2]) cells[2].textContent = pad(mins);
    };
    tick();
    setInterval(tick, 60000);
  }
})();
