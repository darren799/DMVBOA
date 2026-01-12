fetch("data/events.json")
  .then(response => response.json())
  .then(events => {
    const grid = document.getElementById("eventsGrid");
    if (!grid) return;

    events.forEach(evt => {
      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img 
          src="${evt.image}" 
          alt="${evt.title}" 
          onerror="this.src='img/banner.jpg'"
        >
        <h3>${evt.title}</h3>
        <p>${evt.date} · ${evt.location}</p>
        ${evt.membersOnly ? `<span class="members-only">Members Only</span>` : ""}
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Failed to load events:", err);
  });
