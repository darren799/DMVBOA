const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

// Mobile menu toggle
toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after clicking a nav link
document.querySelectorAll("#site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// Hero image carousel
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

// Show a fallback message if all events are hidden
const eventGrid = document.querySelector(".event-grid");

if (eventGrid && eventGrid.children.length === 0) {
  eventGrid.innerHTML = `
    <article class="event-card">
      <h3>More Events Coming Soon</h3>
      <p>
        Check back soon for new DMVBOA cruises, raft-ups,
        community events, and boating experiences.
      </p>
    </article>
  `;
}
