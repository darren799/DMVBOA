let allEvents = [];

fetch("data/events.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to load events.json");
    return response.json();
  })
  .then(events => {
    allEvents = events;
    renderEvents("all");
    setupFilters();
  })
  .catch(err => console.error("Error loading events:", err));

function renderEvents(filter) {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;

  grid.classList.add("loading");
  grid.innerHTML = "";

  const filtered = allEvents.filter(evt => {
    if (filter === "all") return true;
    if (filter === "members") return evt.membersOnly;
    return evt.type === filter;
  });

  filtered.forEach(evt => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
      <img
        src="${evt.image}"
        alt="${evt.title}"
        loading="lazy"
        onerror="this.onerror=null;this.src='img/banner.jpg';"
      >
      <h3>${evt.title}</h3>
      <p>${evt.date} · ${evt.location}</p>
      ${evt.membersOnly ? `<span class="members-only">Members Only</span>` : ""}
    `;

    // ✅ CLICK HANDLER
    card.addEventListener("click", () => {
      window.open(CREATE_COMMUNITY_URL, "_blank");
    });

    // ✅ KEYBOARD ACCESSIBILITY
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.open(CREATE_COMMUNITY_URL, "_blank");
      }
    });

    grid.appendChild(card);
  });

  requestAnimationFrame(() => {
    grid.classList.remove("loading");
    grid.classList.add("loaded");
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filters button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      renderEvents(filter);
    });
  });
}
/* =========================
   EVENT MAP (LEAFLET)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map");

  // Only initialize map if container exists AND Leaflet is loaded
  if (!mapContainer || typeof L === "undefined") return;

  const map = L.map("map").setView([38.85, -77.1], 9);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  fetch("data/events.json")
    .then(res => {
      if (!res.ok) throw new Error("events.json not found");
      return res.json();
    })
    .then(events => {
      events.forEach(evt => {
        if (!evt.coords || evt.coords.length !== 2) return;

        const marker = L.marker(evt.coords).addTo(map);

        marker.bindPopup(`
          <strong>${evt.title}</strong><br>
          ${evt.location}<br><br>
          <button class="map-cta">View Event</button>
        `);

        marker.on("popupopen", () => {
          const btn = document.querySelector(".map-cta");
          if (btn) {
            btn.addEventListener("click", () => {
              window.open(CREATE_COMMUNITY_URL, "_blank");
            });
          }
        });
      });
    })
    .catch(err => console.error("Map error:", err));
});
