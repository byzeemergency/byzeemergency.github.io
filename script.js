fetch("emergencies.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("alerts");
    container.innerHTML = "";

    data.forEach(alert => {
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
  })
  .catch(() => {
    document.getElementById("alerts").innerText =
      "Unable to load emergency information.";
  });
