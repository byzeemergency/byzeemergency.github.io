// Create the map (Australia centred)
const map = L.map("map").setView([-25.2744, 133.7751], 4);

// Map tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Load emergency data
fetch("emergencies.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("alerts");
    container.innerHTML = "";

    data.forEach(alert => {
      // Add marker
      const marker = L.marker([alert.lat, alert.lng]).addTo(map);

      marker.bindPopup(`
        <strong>${alert.title}</strong><br>
        ${alert.location}<br>
        <em>${alert.status}</em>
      `);

      // Add alert card
      const div = document.createElement("div");
      div.className = `alert ${alert.type}`;

      div.innerHTML = `
        <h2>${alert.title}</h2>
        <p><strong>Location:</strong> ${alert.location}</p>
        <p><strong>Status:</strong> ${alert.status}</p>
        <p>${alert.description}</p>
        <p><small>Updated: ${alert.updated}</small></p>
      `;

      container.appendChild(div);
    });
  });
