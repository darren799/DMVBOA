fetch("data/events.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load events.json");
    }
    return response.json();
  })
  .then(events => {
    const grid = document.getElementById("eventsGrid");
    if (!grid) return;

    // Ensure loading state (prevents flicker)
    grid.classList.add("loading");

    events.forEach(evt => {
      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img
          src="${evt.image}"
          alt="${evt.title}"
          loading="lazy"
          onerror="this.onerror=null;this.src='img/banner.jpg';"
        >
        <h3>${evt.title}</h3>
        <p>${evt.date} · ${evt.location}</p>
        ${
          evt.membersOnly
            ? `<span class="members-only">Members Only</span>`
            : ""
        }
      `;

      grid.appendChild(card);
    });

    // Reveal grid after all cards are injected
    requestAnimationFrame(() => {
      grid.classList.remove("loading");
      grid.classList.add("loaded");
    });
  })
  .catch(error => {
    console.error("Error loading events:", error);
  });
