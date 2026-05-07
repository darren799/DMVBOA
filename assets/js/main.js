const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const carouselImages = document.querySelectorAll(".carousel-image");
let currentImage = 0;

setInterval(() => {
  if (!carouselImages.length) return;

  carouselImages[currentImage].classList.remove("active");
  currentImage = (currentImage + 1) % carouselImages.length;
  carouselImages[currentImage].classList.add("active");
}, 3500);

// Auto-hide past event cards
const today = new Date();
today.setHours(0, 0, 0, 0);

document.querySelectorAll("[data-event-date]").forEach((eventCard) => {
  const eventDate = new Date(`${eventCard.dataset.eventDate}T23:59:59`);

  if (eventDate < today) {
    eventCard.remove();
  }
});
