const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

const carouselImages = document.querySelectorAll(".carousel-image");
let currentImage = 0;

setInterval(() => {
  if (!carouselImages.length) return;

  carouselImages[currentImage].classList.remove("active");
  currentImage = (currentImage + 1) % carouselImages.length;
  carouselImages[currentImage].classList.add("active");
}, 3500);
