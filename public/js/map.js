// public/js/map.js

document.addEventListener("DOMContentLoaded", function () {

  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  const coordinates = window.coordinates || [];
  const title = window.title || "Location";
  const locationText = window.locationText || "";

  if (!coordinates.length) {
    mapElement.innerHTML = "No location available";
    return;
  }

  const map = new maplibregl.Map({
    container: 'map',
    style: "https://demotiles.maplibre.org/style.json", // ✅ FIXED
    center: coordinates,
    zoom: 13
  });

  map.addControl(new maplibregl.NavigationControl());

  // 🔴 Marker
  const marker = new maplibregl.Marker({ color: "#ff5a5f" })
    .setLngLat(coordinates)
    .addTo(map);

  // 🔥 Popup
  const popup = new maplibregl.Popup({ offset: 25 })
    .setHTML(`
      <div style="font-size:13px;">
        <b>${title}</b><br>
        ${locationText}
      </div>
    `);

  marker.setPopup(popup).togglePopup();

});