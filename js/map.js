(function () {
  "use strict";

  let map;
  let marker;
  let radarLayer;
  let activeLocation;
  let radarTime;

  function locationName(location) {
    return [location.name, location.admin1, location.country].filter(Boolean).join(", ");
  }

  function setMapStatus(message, type = "") {
    AGAtmos.setStatus(document.getElementById("map-status"), message, type);
  }

  function initMap(location) {
    activeLocation = location;
    document.getElementById("map-location").textContent = locationName(location);
    if (!window.L) {
      setMapStatus(AGAtmos.t("mapUnavailable"), "error");
      return;
    }
    if (!map) {
      map = L.map("weather-map", {
        zoomControl: true,
        attributionControl: true
      }).setView([location.latitude, location.longitude], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
    } else {
      map.setView([location.latitude, location.longitude], map.getZoom());
    }
    if (marker) marker.remove();
    marker = L.marker([location.latitude, location.longitude]).addTo(map).bindPopup(locationName(location));
    if (!radarLayer) loadRainViewer();
  }

  async function loadRainViewer() {
    const checkbox = document.getElementById("layer-precipitation");
    try {
      checkbox.disabled = true;
      const data = await AGAtmos.fetchJson("https://api.rainviewer.com/public/weather-maps.json");
      const frame = data.radar?.past?.at(-1);
      if (!frame) throw new Error("No radar frame");
      const url = `${data.host}${frame.path}/256/{z}/{x}/{y}/2/1_1.png`;
      if (radarLayer) radarLayer.remove();
      radarLayer = L.tileLayer(url, {
        // Public radar tiles stop at zoom 7; Leaflet scales them for street-level views.
        maxNativeZoom: 7,
        maxZoom: 19,
        updateWhenIdle: true,
        keepBuffer: 1,
        opacity: .62,
        attribution: '<a href="https://www.rainviewer.com/">RainViewer</a>'
      });
      radarLayer.on("tileerror", () => {
        if (map.hasLayer(radarLayer)) map.removeLayer(radarLayer);
        checkbox.checked = false;
        setMapStatus(AGAtmos.t("radarUnavailable"), "warning");
      });
      radarTime = new Date(frame.time * 1000).toISOString();
      renderRadarInfo();
      checkbox.disabled = false;
      if (checkbox.checked) radarLayer.addTo(map);
      setMapStatus("");
    } catch {
      checkbox.checked = false;
      checkbox.disabled = true;
      setMapStatus(AGAtmos.t("radarUnavailable"), "warning");
    }
  }

  function renderRadarInfo() {
    document.getElementById("radar-time").textContent = radarTime
      ? `${AGAtmos.t("updated")}: ${AGAtmos.formatTime(radarTime, activeLocation.timezone)}`
      : AGAtmos.t("loading");
  }

  function bindControls() {
    document.getElementById("layer-precipitation").addEventListener("change", (event) => {
      if (!radarLayer || !map) return;
      if (event.target.checked) radarLayer.addTo(map);
      else radarLayer.remove();
    });
    document.getElementById("map-current-location").addEventListener("click", async () => {
      try {
        const location = await AGAtmos.getBrowserLocation();
        AGAtmos.saveLocation(location);
        initMap(location);
      } catch (error) {
        setMapStatus(error.code === 1 ? AGAtmos.t("permissionDenied") : AGAtmos.t("missingLocation"), "warning");
      }
    });
    document.addEventListener("agatmos:languagechange", () => {
      renderRadarInfo();
      if (activeLocation) {
        document.getElementById("map-location").textContent = locationName(activeLocation);
      }
    });
  }

  function init() {
    bindControls();
    initMap(AGAtmos.getSavedLocation());
  }

  document.addEventListener("DOMContentLoaded", init);
}());
