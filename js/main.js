fetch("data/events.json")
  .then(response => response.json())
  .then(events => {
    const grid = document.getElementById("eventsGrid");
    if (!grid) return;

    events.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <h3>${event.title}</h3>
        <p>${event.date} · ${event.location}</p>
        ${event.membersOnly ? `<span class="members-only">Members Only</span>` : ""}
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Failed to load events:", err);
  });

