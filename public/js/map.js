// public/js/map.js

document.addEventListener("DOMContentLoaded", function () {

  // 🔥 Check if map container exists
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  // 🔥 Get data from EJS (passed via window)
  const coordinates = window.coordinates || [];
  const title = window.title || "Location";
  const locationText = window.locationText || "";

  // ❌ If no coordinates
  if (!coordinates.length) {
    mapElement.innerHTML = "No location available";
    return;
  }

  // ✅ Initialize map
  const map = new maplibregl.Map({
    container: 'map',
    style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
    center: coordinates,
    zoom: 13
  });

  // ✅ Controls (zoom buttons)
  map.addControl(new maplibregl.NavigationControl());

  // ✅ Marker
  const marker = new maplibregl.Marker({ draggable: true })
    .setLngLat(coordinates)
    .addTo(map);

  // 🔥 Drag event (optional use)
  marker.on('dragend', () => {
    const lngLat = marker.getLngLat();
    console.log("New Location:", lngLat);
  });

  // ✅ Popup
  const popup = new maplibregl.Popup({ offset: 25 })
    .setHTML(`<h5>${title}</h5><p>${locationText}</p>`);

  marker.setPopup(popup).togglePopup();

});