/* Site behaviors: mobile menu toggle and scroll reveal. */
(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");
  function setOpen(open) {
    if (!header || !toggle) return;
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "\u2715" : "\u2630";
    toggle.setAttribute("aria-label", open ? "Close menu" : "Menu");
  }
  if (toggle && header) toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("is-open"));
  });
  if (nav) nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("click", function (e) {
    if (header && header.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header && header.classList.contains("is-open")) setOpen(false);
  });

  var els = document.querySelectorAll(".x-reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach(function (e) { io.observe(e); });
})();
