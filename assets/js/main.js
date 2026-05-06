const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

toggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});
