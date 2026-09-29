(function () {
  "use strict";

  let currentWeather = null;
  let compareMode = "yesterday";

  const $ = (selector) => document.querySelector(selector);

  function htmlEscape(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function setLoading(isLoading) {
    document.body.classList.toggle("skeleton", isLoading);
  }

  function locationName(location) {
    return [location.name, location.admin1, location.country].filter(Boolean).join(", ");
  }

  function renderWeather(weather) {
    currentWeather = weather;
    renderCurrent(weather);
    renderComfort(weather);
    renderRainWindow(weather);
    renderSmartBrief(weather);
    renderAlerts(weather);
    renderCommute(weather);
    renderOutdoor(weather);
    renderGear(weather);
    renderEnvironment(weather);
    renderCompare(weather);
    renderHourly(weather);
    renderRainEffect(weather);
    $("#location-title").textContent = locationName(weather.location);
    $("#location-subtitle").textContent = `${AGAtmos.t("updated")}: ${AGAtmos.formatTime(weather.fetchedAt, weather.location.timezone)}`;
  }

  function renderCurrent(weather) {
    const { current } = weather;
    $("#current-title").textContent = locationName(weather.location);
    $("#current-condition").textContent = current.condition.label;
    $("#current-icon").textContent = current.condition.icon;
    $("#current-temp").textContent = AGAtmos.formatTemp(current.temp);
    $("#current-feels").textContent = `${AGAtmos.t("feelsLike")} ${AGAtmos.formatTemp(current.feelsLike)}`;
    $("#current-humidity").textContent = AGAtmos.formatPercent(current.humidity);
    $("#current-wind").textContent = AGAtmos.formatSpeed(current.wind);
    $("#current-visibility").textContent = current.visibility == null ? AGAtmos.t("dataUnavailable") : AGAtmos.formatKm(current.visibility);
    $("#current-rain").textContent = current.rainProbability == null ? AGAtmos.t("dataUnavailable") : AGAtmos.formatPercent(current.rainProbability);
  }

  function renderComfort(weather) {
    const comfort = AGAtmos.classifyComfort(weather.current.feelsLike, weather.current.humidity);
    $("#comfort-title").textContent = comfort.label || AGAtmos.t(comfort.key);
    $("#comfort-detail").textContent = `${AGAtmos.t("actual")} ${AGAtmos.formatTemp(weather.current.temp)} · ${AGAtmos.t("feelsLike")} ${AGAtmos.formatTemp(weather.current.feelsLike)} · ${AGAtmos.t("humidity")} ${AGAtmos.formatPercent(weather.current.humidity)}`;
    document.querySelectorAll(".comfort-scale span").forEach((bar, index) => {
      bar.classList.toggle("lit", index < comfort.severity);
    });
  }

  function renderRainWindow(weather) {
    const container = $("#rain-window-detail");
    const windowData = weather.analysis.rainWindow;
    if (!windowData?.peak) {
      $("#rain-title").textContent = AGAtmos.t("noSignificantRain");
      const probabilities = AGAtmos.upcomingHours(weather, 12).map((hour) => hour.rainProbability).filter((value) => value != null);
      $("#rain-confidence").textContent = probabilities.length ? AGAtmos.formatPercent(Math.max(...probabilities)) : "—";
      container.innerHTML = "";
      return;
    }
    const first = windowData.hours[0];
    const last = windowData.hours[windowData.hours.length - 1];
    $("#rain-title").textContent = `${AGAtmos.formatHour(first.time, weather.location.timezone)}–${AGAtmos.formatHour(last.time, weather.location.timezone)}`;
    $("#rain-confidence").textContent = AGAtmos.formatPercent(windowData.peak.rainProbability || 0);
    container.innerHTML = [
      `<p class="muted">${AGAtmos.t("strongestChance")}: <strong>${AGAtmos.formatHour(windowData.peak.time, weather.location.timezone)}</strong></p>`,
      ...windowData.hours.map((hour) => `
        <article class="rain-hour">
          <strong>${AGAtmos.formatHour(hour.time, weather.location.timezone)}</strong>
          <span>${AGAtmos.formatPercent(hour.rainProbability || 0)} · ${AGAtmos.formatMm(hour.precipitation || 0)}</span>
        </article>
      `)
    ].join("");
  }

  function renderSmartBrief(weather) {
    const hours = AGAtmos.upcomingHours(weather, 8);
    const statements = [];
    const rainWindow = weather.analysis.rainWindow;
    statements.push(AGAtmos.t("briefNow", {
      time: AGAtmos.formatTime(weather.current.time || weather.fetchedAt, weather.location.timezone),
      temp: AGAtmos.formatTemp(weather.current.temp),
      feels: AGAtmos.formatTemp(weather.current.feelsLike)
    }));
    if (rainWindow?.peak && (rainWindow.peak.rainProbability || 0) >= 45) {
      statements.push(AGAtmos.t("briefRainRise", { time: AGAtmos.formatHour(rainWindow.peak.time, weather.location.timezone) }));
    } else {
      statements.push(AGAtmos.t("briefRainLow"));
    }
    if ((hours[0]?.temp ?? 0) - (hours[hours.length - 1]?.temp ?? 0) >= 3) statements.push(AGAtmos.t("briefCooling"));
    if (weather.analysis.comfort.severity >= 3) statements.push(AGAtmos.t("briefHeat"));
    if ((hours[hours.length - 1]?.wind || 0) - (hours[0]?.wind || 0) >= 8) statements.push(AGAtmos.t("briefWind"));
    $("#smart-brief").innerHTML = statements.map((item) => `<p class="brief-item">${htmlEscape(item)}</p>`).join("");
  }

  function renderAlerts(weather) {
    const alerts = weather.alerts || [];
    $("#alerts-list").innerHTML = alerts.length
      ? alerts.map((alert) => `<article class="alert-item">${htmlEscape(alert)}</article>`).join("")
      : `<p class="muted">${AGAtmos.t("noMajorLimitations")}</p>`;
  }

  function renderCommute(weather) {
    $("#commute-timeline").innerHTML = AGAtmos.upcomingHours(weather, 6).map((hour) => `
      <article class="commute-item" role="listitem">
        <strong>${AGAtmos.formatHour(hour.time, weather.location.timezone)}</strong>
        <span>${hour.condition.icon} ${htmlEscape(hour.condition.label)}</span>
        <span>${AGAtmos.formatTemp(hour.temp)} · ${AGAtmos.t("feelsLike")} ${AGAtmos.formatTemp(hour.feelsLike)}</span>
        <span>${AGAtmos.formatPercent(hour.rainProbability || 0)} ${AGAtmos.t("rain")} · ${AGAtmos.formatMm(hour.precipitation || 0)}</span>
        <span>${AGAtmos.formatSpeed(hour.wind || 0)} ${AGAtmos.t("wind")}</span>
        <span>${hour.visibility == null ? AGAtmos.t("dataUnavailable") : AGAtmos.formatKm(hour.visibility)} ${AGAtmos.t("visibility")}</span>
      </article>
    `).join("");
  }

  function renderOutdoor(weather) {
    const outdoor = weather.analysis.outdoor;
    $("#outdoor-score").innerHTML = [
      ["walking", outdoor.walking],
      ["cycling", outdoor.cycling],
      ["general", outdoor.general]
    ].map(([key, value]) => `
      <div class="score-row">
        <span>${AGAtmos.t(key)}</span>
        <strong>${value}</strong>
      </div>
    `).join("");
    $("#outdoor-limitation").textContent = outdoor.limitation;
  }

  function renderGear(weather) {
    const gear = weather.analysis.gear;
    const groups = [
      ["carry", gear.carry],
      ["wear", gear.wear],
      ["optional", gear.optional],
      ["hydration", gear.hydration]
    ].filter(([, items]) => items.length);
    $("#gear-list").innerHTML = groups.length
      ? groups.map(([title, items]) => `
        <article class="gear-group">
          <strong>${AGAtmos.t(title)}</strong>
          <ul>${items.map((item) => `<li>${htmlEscape(item)}</li>`).join("")}</ul>
        </article>
      `).join("")
      : `<p class="muted">${AGAtmos.t("noMajorLimitations")}</p>`;
  }

  function renderEnvironment(weather) {
    const aq = weather.airQuality;
    $("#aqi-value").textContent = aq?.aqi == null ? AGAtmos.t("dataUnavailable") : AGAtmos.formatNumber(Math.round(aq.aqi));
    $("#aqi-detail").textContent = aq?.aqi == null
      ? AGAtmos.t("dataUnavailable")
      : `${AGAtmos.aqiCategory(aq.aqi)}${aq.relevantPollutant ? ` · ${aq.relevantPollutant.name} ${AGAtmos.formatNumber(aq.relevantPollutant.value, { maximumFractionDigits: 1 })}` : ""}`;
    const uv = weather.todayDaily?.uvMax ?? null;
    $("#uv-value").textContent = uv == null ? AGAtmos.t("dataUnavailable") : AGAtmos.formatNumber(uv, { maximumFractionDigits: 1 });
    $("#uv-detail").textContent = uv == null ? AGAtmos.t("dataUnavailable") : AGAtmos.uvCategory(uv);
    $("#sun-value").textContent = `${AGAtmos.t("sunrise")} ${AGAtmos.formatTime(weather.sun.sunrise, weather.location.timezone)}`;
    $("#sun-detail").textContent = `${AGAtmos.t("sunset")} ${AGAtmos.formatTime(weather.sun.sunset, weather.location.timezone)}${daylightRemaining(weather)}`;
  }

  function daylightRemaining(weather) {
    const sunset = weather.sun.sunset ? new Date(weather.sun.sunset) : null;
    if (!sunset || sunset <= new Date()) return "";
    const mins = Math.round((sunset - new Date()) / 60000);
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return ` · ${hours}h ${minutes}m ${AGAtmos.t("daylightRemaining")}`;
  }

  function renderCompare(weather) {
    const target = compareMode === "tomorrow" ? weather.comparison.tomorrow : weather.comparison.yesterday;
    const today = weather.comparison.today;
    $("#compare-title").textContent = compareMode === "tomorrow" ? AGAtmos.t("todayVsTomorrow") : AGAtmos.t("todayVsYesterday");
    if (!target || !today) {
      $("#compare-list").innerHTML = `<p class="muted">${AGAtmos.t("unavailableHistorical")}</p>`;
      return;
    }
    const rows = [
      ["temperature", today.temp, target.temp, "°C"],
      ["feelsLike", today.feelsLike, target.feelsLike, "°C"],
      ["rain", today.rain, target.rain, " mm"],
      ["wind", today.wind, target.wind, " km/h"],
      ["uv", today.uv, target.uv, ""]
    ];
    $("#compare-list").innerHTML = rows.map(([label, current, other, suffix]) => `
      <div class="compare-row">
        <span>${AGAtmos.t(label)}</span>
        <strong>${compareValue(current, other, suffix)}</strong>
      </div>
    `).join("");
  }

  function compareValue(current, other, suffix) {
    if (current == null || other == null) return AGAtmos.t("dataUnavailable");
    const diff = current - other;
    if (Math.abs(diff) < 1) return AGAtmos.t("similar");
    const formatted = `${diff > 0 ? "+" : ""}${AGAtmos.formatNumber(diff, { maximumFractionDigits: 1 })}${suffix}`;
    return `${formatted} · ${diff > 0 ? AGAtmos.t("higher") : AGAtmos.t("lower")}`;
  }

  function renderHourly(weather) {
    $("#hourly-timeline").innerHTML = AGAtmos.upcomingHours(weather, 16).map((hour) => `
      <article class="hour-item" role="listitem">
        <strong>${AGAtmos.formatHour(hour.time, weather.location.timezone)} ${hour.condition.icon}</strong>
        <span>${AGAtmos.formatTemp(hour.temp)}</span>
        <span>${AGAtmos.formatPercent(hour.rainProbability || 0)} ${AGAtmos.t("rain")}</span>
        <span>${AGAtmos.formatPercent(hour.humidity || 0)} ${AGAtmos.t("humidity")}</span>
        <span>${AGAtmos.formatSpeed(hour.wind || 0)}</span>
      </article>
    `).join("");
  }

  function renderRainEffect(weather) {
    const layer = $("#weather-rain-layer");
    const hours = AGAtmos.upcomingHours(weather, 4);
    const shouldRain = hours.some((hour) => (hour.rainProbability || 0) >= 55 || (hour.precipitation || 0) >= 0.4);
    layer.classList.toggle("active", shouldRain);
    if (!shouldRain) {
      layer.innerHTML = "";
      return;
    }
    if (!layer.children.length) {
      layer.innerHTML = Array.from({ length: 54 }, (_, index) => {
        const left = (index * 37) % 100;
        const delay = -((index * 137) % 2400) / 1000;
        const duration = 1.1 + ((index % 7) * 0.13);
        const opacity = .2 + ((index % 5) * .08);
        return `<span class="rain-drop" style="left:${left}%;animation-delay:${delay}s;animation-duration:${duration}s;opacity:${opacity}"></span>`;
      }).join("");
    }
  }

  async function loadWeather(location, options = {}) {
    const status = $("#status-panel");
    setLoading(true);
    AGAtmos.setStatus(status, "");
    try {
      const weather = await AGAtmos.fetchWeather(location);
      AGAtmos.saveLocation(location);
      renderWeather(weather);
      if (!navigator.onLine) AGAtmos.setStatus(status, AGAtmos.t("offlineCached"), "warning");
    } catch (error) {
      const cached = AGAtmos.getCachedWeather();
      if (cached) {
        renderWeather(cached);
        AGAtmos.setStatus(status, navigator.onLine ? AGAtmos.t("loadFailed") : AGAtmos.t("offlineCached"), "warning");
      } else {
        AGAtmos.setStatus(status, navigator.onLine ? AGAtmos.t("loadFailed") : AGAtmos.t("offlineNoData"), "error");
      }
      if (options.fromGeo && error.code === 1) AGAtmos.setStatus(status, AGAtmos.t("permissionDenied"), "warning");
    } finally {
      setLoading(false);
    }
  }

  function bindLocationForm() {
    const form = $("#location-form");
    const input = $("#location-search");
    const results = $("#location-results");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = input.value.trim();
      if (!query) return;
      results.innerHTML = `<p class="muted">${AGAtmos.t("loading")}</p>`;
      try {
        const locations = await AGAtmos.searchLocations(query);
        if (!locations.length) {
          results.innerHTML = `<p class="muted">${AGAtmos.t("noResults")}</p>`;
          return;
        }
        results.innerHTML = locations.map((location, index) => `
          <button type="button" class="location-result" data-location-index="${index}" aria-label="${AGAtmos.t("selectLocation")} ${htmlEscape(locationName(location))}">
            ${htmlEscape(locationName(location))}
          </button>
        `).join("");
        results.querySelectorAll("[data-location-index]").forEach((button) => {
          button.addEventListener("click", () => {
            const location = locations[Number(button.dataset.locationIndex)];
            results.innerHTML = "";
            input.value = "";
            loadWeather(location);
          });
        });
      } catch {
        results.innerHTML = `<p class="muted">${AGAtmos.t("loadFailed")}</p>`;
      }
    });
    $("#current-location-button").addEventListener("click", async () => {
      try {
        const location = await AGAtmos.getBrowserLocation();
        loadWeather(location, { fromGeo: true });
      } catch (error) {
        AGAtmos.setStatus($("#status-panel"), error.code === 1 ? AGAtmos.t("permissionDenied") : AGAtmos.t("missingLocation"), "warning");
      }
    });
  }

  function bindCompare() {
    document.querySelectorAll("[data-compare]").forEach((button) => {
      button.addEventListener("click", () => {
        compareMode = button.dataset.compare;
        document.querySelectorAll("[data-compare]").forEach((item) => item.classList.toggle("active", item === button));
        if (currentWeather) renderCompare(currentWeather);
      });
    });
  }

  async function init() {
    bindLocationForm();
    bindCompare();
    document.addEventListener("agatmos:languagechange", () => {
      if (currentWeather) {
        currentWeather.hourly = currentWeather.hourly.map((hour) => ({ ...hour, condition: AGAtmos.conditionFor(hour.code) }));
        currentWeather.current.condition = AGAtmos.conditionFor(currentWeather.current.code);
        currentWeather.analysis = AGAtmos.analyzeWeather(currentWeather);
        currentWeather.alerts = AGAtmos.buildAlerts(currentWeather);
        renderWeather(currentWeather);
      }
    });
    if (!navigator.onLine) {
      const cached = AGAtmos.getCachedWeather();
      if (cached) renderWeather(cached);
      AGAtmos.setStatus($("#status-panel"), cached ? AGAtmos.t("offlineCached") : AGAtmos.t("offlineNoData"), cached ? "warning" : "error");
      return;
    }
    const saved = AGAtmos.getSavedLocation();
    loadWeather(saved);
  }

  document.addEventListener("DOMContentLoaded", init);
}());
