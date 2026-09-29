(function () {
  "use strict";

  const STORAGE = {
    theme: "agAtmos.theme",
    language: "agAtmos.language",
    location: "agAtmos.location",
    weather: "agAtmos.latestWeather"
  };

  const DEFAULT_LOCATION = {
    name: "Karachi",
    admin1: "Sindh",
    country: "Pakistan",
    latitude: 24.8607,
    longitude: 67.0011,
    timezone: "Asia/Karachi"
  };

  const translations = {
    en: {
      radarCoverage: "Radar coverage varies by region. An empty overlay does not confirm dry weather.",
      brandTagline: "Practical weather intelligence",
      navWeather: "Weather",
      navMap: "Map",
      themeSystem: "System",
      themeDark: "Dark",
      themeLight: "Light",
      installApp: "Install app",
      locationLabel: "Location",
      loading: "Loading...",
      searchLocation: "Search location",
      searchPlaceholder: "Search city or place",
      search: "Search",
      useCurrentLocation: "Use current",
      currentWeather: "Current weather",
      humidity: "Humidity",
      wind: "Wind",
      visibility: "Visibility",
      rain: "Rain",
      comfortLevel: "Comfort level",
      rainWindow: "Rain window",
      smartBrief: "Smart Day Brief",
      briefTitle: "What changes today",
      weatherAlerts: "Weather alerts",
      alertsTitle: "Active signals",
      commuteView: "Commute view",
      nextHours: "Next several hours",
      outdoorConditions: "Outdoor conditions",
      activityScore: "Activity score",
      gearHints: "Clothing and gear",
      practicalCarry: "Practical carry",
      environment: "Environment",
      airUvSun: "Air, UV, sun",
      airQuality: "Air quality",
      uv: "UV",
      sun: "Sun",
      compare: "Compare",
      todayCompared: "Today compared",
      yesterday: "Yesterday",
      tomorrow: "Tomorrow",
      weatherTimeline: "Weather timeline",
      hourlyForecast: "Hourly forecast",
      weatherMap: "Weather map",
      radarPreview: "Radar preview",
      mapPreviewCopy: "Open the interactive map for supported weather layers.",
      openMap: "Open map",
      mapLabel: "Weather map",
      layers: "Layers",
      weatherLayers: "Weather layers",
      precipitation: "Precipitation",
      cloudsUnavailable: "Clouds unavailable",
      windUnavailable: "Wind unavailable",
      temperatureUnavailable: "Temperature unavailable",
      backToDashboard: "Back to dashboard",
      dataUnavailable: "Data unavailable",
      noSignificantRain: "No significant rain window expected today.",
      strongestChance: "Strongest rain chance",
      offlineCached: "You're offline. Showing the latest available weather data.",
      offlineNoData: "Weather data requires an internet connection.",
      loadFailed: "Weather data couldn't be loaded. Check your connection and try again.",
      permissionDenied: "Location permission was not granted. Search for a city instead.",
      missingLocation: "Location was unavailable. Search for a city instead.",
      noResults: "No matching locations found.",
      selectLocation: "Select location",
      feelsLike: "Feels like",
      actual: "Actual",
      heatStress: "Heat stress",
      comfortable: "Comfortable",
      warm: "Warm",
      hot: "Hot",
      veryHot: "Very Hot",
      extremeHeat: "Extreme Heat",
      humid: "Humid",
      uncomfortable: "Uncomfortable",
      good: "Good",
      fair: "Fair",
      limited: "Limited",
      poor: "Poor",
      walking: "Walking",
      cycling: "Cycling",
      general: "General",
      mainLimitation: "Main limitation",
      noMajorLimitations: "No major weather limitation detected.",
      carry: "Carry",
      wear: "Wear",
      optional: "Optional",
      hydration: "Hydration",
      umbrella: "Umbrella",
      raincoat: "Raincoat useful",
      lightClothing: "Light breathable clothing",
      waterBottle: "Water bottle",
      sunProtection: "Sun protection",
      sunglasses: "Sunglasses",
      lightJacket: "Light jacket",
      warmLayer: "Warm layer",
      categoryLow: "Low",
      categoryModerate: "Moderate",
      categoryHigh: "High",
      categoryVeryHigh: "Very high",
      categoryExtreme: "Extreme",
      sunrise: "Sunrise",
      sunset: "Sunset",
      daylightRemaining: "daylight remaining",
      todayVsYesterday: "Today vs Yesterday",
      todayVsTomorrow: "Today vs Tomorrow",
      temperature: "Temperature",
      similar: "Similar",
      higher: "Higher",
      lower: "Lower",
      unavailableHistorical: "Historical comparison is unavailable for this location right now.",
      mapUnavailable: "Map library could not be loaded. Check your connection and try again.",
      radarUnavailable: "Precipitation radar is unavailable right now.",
      currentLocation: "Current location",
      heavyRainAlert: "Heavy rain risk around {time}.",
      rainIncreaseAlert: "Rain probability increases significantly between {start} and {end}.",
      heatAlert: "High heat stress is expected today.",
      windAlert: "Strong wind is expected in the next few hours.",
      visibilityAlert: "Reduced visibility is expected.",
      briefNow: "{time}: {temp}, feels like {feels}.",
      briefRainLow: "Rain risk is low in the next few hours.",
      briefRainRise: "Rain risk increases around {time}.",
      briefCooling: "Conditions are expected to cool later today.",
      briefHeat: "Heat stress remains elevated through the next few hours.",
      briefWind: "Wind is expected to strengthen during the next few hours.",
      updated: "Updated"
    },
    ur: {
      radarCoverage: "ریڈار کی کوریج علاقے کے لحاظ سے مختلف ہوتی ہے۔ خالی نقشے کا مطلب بارش نہ ہونا نہیں ہے۔",
      brandTagline: "عملی موسمی معلومات",
      navWeather: "موسم",
      navMap: "نقشہ",
      themeSystem: "سسٹم",
      themeDark: "ڈارک",
      themeLight: "لائٹ",
      installApp: "ایپ انسٹال کریں",
      locationLabel: "مقام",
      loading: "لوڈ ہو رہا ہے...",
      searchLocation: "مقام تلاش کریں",
      searchPlaceholder: "شہر یا جگہ تلاش کریں",
      search: "تلاش",
      useCurrentLocation: "موجودہ مقام",
      currentWeather: "موجودہ موسم",
      humidity: "نمی",
      wind: "ہوا",
      visibility: "حد نگاہ",
      rain: "بارش",
      comfortLevel: "آرام کی سطح",
      rainWindow: "بارش کا وقت",
      smartBrief: "سمارٹ دن بریف",
      briefTitle: "آج کیا بدلے گا",
      weatherAlerts: "موسمی الرٹس",
      alertsTitle: "فعال اشارے",
      commuteView: "سفر کا منظر",
      nextHours: "اگلے چند گھنٹے",
      outdoorConditions: "باہر کے حالات",
      activityScore: "سرگرمی اسکور",
      gearHints: "لباس اور سامان",
      practicalCarry: "عملی سامان",
      environment: "ماحول",
      airUvSun: "ہوا، یو وی، سورج",
      airQuality: "ہوا کا معیار",
      uv: "یو وی",
      sun: "سورج",
      compare: "موازنہ",
      todayCompared: "آج کا موازنہ",
      yesterday: "گزشتہ کل",
      tomorrow: "کل",
      weatherTimeline: "موسمی ٹائم لائن",
      hourlyForecast: "گھنٹہ وار پیشگوئی",
      weatherMap: "موسمی نقشہ",
      radarPreview: "ریڈار پیش منظر",
      mapPreviewCopy: "دستیاب موسمی تہوں کے لیے انٹرایکٹو نقشہ کھولیں۔",
      openMap: "نقشہ کھولیں",
      mapLabel: "موسمی نقشہ",
      layers: "تہیں",
      weatherLayers: "موسمی تہیں",
      precipitation: "بارش",
      cloudsUnavailable: "بادل دستیاب نہیں",
      windUnavailable: "ہوا دستیاب نہیں",
      temperatureUnavailable: "درجہ حرارت دستیاب نہیں",
      backToDashboard: "ڈیش بورڈ پر واپس",
      dataUnavailable: "ڈیٹا دستیاب نہیں",
      noSignificantRain: "آج نمایاں بارش کا امکان نہیں۔",
      strongestChance: "سب سے زیادہ بارش کا امکان",
      offlineCached: "آپ آف لائن ہیں۔ آخری دستیاب موسمی ڈیٹا دکھایا جا رہا ہے۔",
      offlineNoData: "موسمی ڈیٹا کے لیے انٹرنیٹ کنکشن ضروری ہے۔",
      loadFailed: "موسمی ڈیٹا لوڈ نہیں ہو سکا۔ کنکشن چیک کریں اور دوبارہ کوشش کریں۔",
      permissionDenied: "مقام کی اجازت نہیں ملی۔ شہر تلاش کریں۔",
      missingLocation: "مقام دستیاب نہیں۔ شہر تلاش کریں۔",
      noResults: "کوئی مقام نہیں ملا۔",
      selectLocation: "مقام منتخب کریں",
      feelsLike: "محسوس ہوتا ہے",
      actual: "اصل",
      heatStress: "گرمی کا دباؤ",
      comfortable: "آرام دہ",
      warm: "گرم",
      hot: "زیادہ گرم",
      veryHot: "بہت گرم",
      extremeHeat: "شدید گرمی",
      humid: "مرطوب",
      uncomfortable: "غیر آرام دہ",
      good: "اچھا",
      fair: "مناسب",
      limited: "محدود",
      poor: "خراب",
      walking: "پیدل چلنا",
      cycling: "سائیکلنگ",
      general: "عمومی",
      mainLimitation: "اہم حد",
      noMajorLimitations: "کوئی بڑی موسمی حد نہیں ملی۔",
      carry: "ساتھ رکھیں",
      wear: "پہنیں",
      optional: "اختیاری",
      hydration: "پانی",
      umbrella: "چھتری",
      raincoat: "رین کوٹ مفید",
      lightClothing: "ہلکا سانس لینے والا لباس",
      waterBottle: "پانی کی بوتل",
      sunProtection: "دھوپ سے حفاظت",
      sunglasses: "دھوپ کا چشمہ",
      lightJacket: "ہلکی جیکٹ",
      warmLayer: "گرم تہہ",
      categoryLow: "کم",
      categoryModerate: "درمیانہ",
      categoryHigh: "زیادہ",
      categoryVeryHigh: "بہت زیادہ",
      categoryExtreme: "شدید",
      sunrise: "طلوع آفتاب",
      sunset: "غروب آفتاب",
      daylightRemaining: "دن کی روشنی باقی",
      todayVsYesterday: "آج بمقابلہ گزشتہ کل",
      todayVsTomorrow: "آج بمقابلہ کل",
      temperature: "درجہ حرارت",
      similar: "ملتا جلتا",
      higher: "زیادہ",
      lower: "کم",
      unavailableHistorical: "اس مقام کے لیے تاریخی موازنہ ابھی دستیاب نہیں۔",
      mapUnavailable: "نقشہ لائبریری لوڈ نہیں ہو سکی۔ کنکشن چیک کریں۔",
      radarUnavailable: "بارش ریڈار ابھی دستیاب نہیں۔",
      currentLocation: "موجودہ مقام",
      heavyRainAlert: "{time} کے قریب تیز بارش کا خطرہ۔",
      rainIncreaseAlert: "{start} سے {end} کے درمیان بارش کا امکان نمایاں بڑھتا ہے۔",
      heatAlert: "آج گرمی کا دباؤ زیادہ رہنے کا امکان ہے۔",
      windAlert: "اگلے چند گھنٹوں میں تیز ہوا کا امکان ہے۔",
      visibilityAlert: "حد نگاہ کم ہونے کا امکان ہے۔",
      briefNow: "{time}: {temp}، محسوس {feels}۔",
      briefRainLow: "اگلے چند گھنٹوں میں بارش کا خطرہ کم ہے۔",
      briefRainRise: "{time} کے قریب بارش کا خطرہ بڑھتا ہے۔",
      briefCooling: "آج بعد میں موسم ٹھنڈا ہونے کا امکان ہے۔",
      briefHeat: "اگلے چند گھنٹوں تک گرمی کا دباؤ برقرار ہے۔",
      briefWind: "اگلے چند گھنٹوں میں ہوا تیز ہونے کا امکان ہے۔",
      updated: "اپ ڈیٹ"
    }
  };

  const weatherCodes = {
    0: ["Clear", "صاف", "☀️"],
    1: ["Mainly clear", "زیادہ تر صاف", "🌤️"],
    2: ["Partly cloudy", "جزوی بادل", "⛅"],
    3: ["Overcast", "ابر آلود", "☁️"],
    45: ["Fog", "دھند", "🌫️"],
    48: ["Depositing rime fog", "دھند", "🌫️"],
    51: ["Light drizzle", "ہلکی پھوار", "🌦️"],
    53: ["Drizzle", "پھوار", "🌦️"],
    55: ["Dense drizzle", "تیز پھوار", "🌧️"],
    61: ["Light rain", "ہلکی بارش", "🌧️"],
    63: ["Rain", "بارش", "🌧️"],
    65: ["Heavy rain", "تیز بارش", "🌧️"],
    71: ["Light snow", "ہلکی برف", "🌨️"],
    73: ["Snow", "برف", "🌨️"],
    75: ["Heavy snow", "تیز برف", "🌨️"],
    80: ["Rain showers", "بارش کے جھونکے", "🌦️"],
    81: ["Rain showers", "بارش کے جھونکے", "🌦️"],
    82: ["Violent showers", "شدید بارش", "⛈️"],
    95: ["Thunderstorm", "گرج چمک", "⛈️"],
    96: ["Thunderstorm with hail", "ژالہ باری کے ساتھ طوفان", "⛈️"],
    99: ["Thunderstorm with hail", "ژالہ باری کے ساتھ طوفان", "⛈️"]
  };

  const state = {
    theme: localStorage.getItem(STORAGE.theme) || "system",
    language: localStorage.getItem(STORAGE.language) || "en",
    installPrompt: null
  };

  function t(key, vars = {}) {
    const value = (translations[state.language] && translations[state.language][key]) || translations.en[key] || key;
    return Object.keys(vars).reduce((text, name) => text.replaceAll(`{${name}}`, vars[name]), value);
  }

  function applyTranslations(root = document) {
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language === "ur" ? "rtl" : "ltr";
    root.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    root.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });
    document.dispatchEvent(new CustomEvent("agatmos:languagechange"));
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    localStorage.setItem(STORAGE.theme, state.theme);
  }

  function initControls() {
    const languageSelect = document.getElementById("language-select");
    const themeSelect = document.getElementById("theme-select");
    const installButton = document.getElementById("install-button");
    if (languageSelect) {
      languageSelect.value = state.language;
      languageSelect.addEventListener("change", () => {
        state.language = languageSelect.value;
        localStorage.setItem(STORAGE.language, state.language);
        applyTranslations();
      });
    }
    if (themeSelect) {
      themeSelect.value = state.theme;
      themeSelect.addEventListener("change", () => {
        state.theme = themeSelect.value;
        applyTheme();
      });
    }
    if (installButton) {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        state.installPrompt = event;
        installButton.hidden = false;
      });
      installButton.addEventListener("click", async () => {
        if (!state.installPrompt) return;
        state.installPrompt.prompt();
        await state.installPrompt.userChoice.catch(() => null);
        state.installPrompt = null;
        installButton.hidden = true;
      });
    }
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js").catch(() => null);
    }
  }

  function formatNumber(value, options = {}) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return t("dataUnavailable");
    return new Intl.NumberFormat(state.language === "ur" ? "ur-PK" : "en", options).format(value);
  }

  function formatTemp(value) {
    return `${formatNumber(Math.round(value))}°C`;
  }

  function formatSpeed(value) {
    return `${formatNumber(Math.round(value))} km/h`;
  }

  function formatMm(value) {
    return `${formatNumber(Number(value || 0), { maximumFractionDigits: 1 })} mm`;
  }

  function formatPercent(value) {
    return `${formatNumber(Math.round(value))}%`;
  }

  function formatKm(value) {
    return `${formatNumber(Number(value || 0), { maximumFractionDigits: 1 })} km`;
  }

  function formatTime(value, timezone) {
    if (!value) return t("dataUnavailable");
    return new Intl.DateTimeFormat(state.language === "ur" ? "ur-PK" : "en", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone
    }).format(new Date(value));
  }

  function formatHour(value, timezone) {
    if (!value) return t("dataUnavailable");
    return new Intl.DateTimeFormat(state.language === "ur" ? "ur-PK" : "en", {
      hour: "numeric",
      timeZone: timezone
    }).format(new Date(value));
  }

  function conditionFor(code) {
    const item = weatherCodes[code] || ["Weather unavailable", "موسم دستیاب نہیں", "—"];
    return {
      label: state.language === "ur" ? item[1] : item[0],
      icon: item[2]
    };
  }

  function getSavedLocation() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.location)) || DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  }

  function saveLocation(location) {
    localStorage.setItem(STORAGE.location, JSON.stringify(location));
  }

  function getBrowserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("unavailable"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({
          name: t("currentLocation"),
          country: "",
          admin1: "",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "auto"
        }),
        (error) => reject(error),
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 15 * 60 * 1000 }
      );
    });
  }

  async function fetchJson(url, timeout = 15000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function searchLocations(query) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=${state.language}&format=json`;
    const data = await fetchJson(url);
    return (data.results || []).map((item) => ({
      name: item.name,
      admin1: item.admin1 || "",
      country: item.country || "",
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone || "auto"
    }));
  }

  function dateString(date) {
    return date.toISOString().slice(0, 10);
  }

  function average(values) {
    const clean = values.filter((value) => value !== null && value !== undefined && !Number.isNaN(Number(value)));
    if (!clean.length) return null;
    return clean.reduce((sum, value) => sum + Number(value), 0) / clean.length;
  }

  function max(values) {
    const clean = values.filter((value) => value !== null && value !== undefined && !Number.isNaN(Number(value)));
    return clean.length ? Math.max(...clean) : null;
  }

  function normalizeHourly(forecast, location) {
    const h = forecast.hourly || {};
    return (h.time || []).map((time, index) => ({
      time,
      temp: h.temperature_2m?.[index] ?? null,
      feelsLike: h.apparent_temperature?.[index] ?? null,
      humidity: h.relative_humidity_2m?.[index] ?? null,
      rainProbability: h.precipitation_probability?.[index] ?? null,
      precipitation: h.precipitation?.[index] ?? null,
      wind: h.wind_speed_10m?.[index] ?? null,
      visibility: h.visibility?.[index] != null ? h.visibility[index] / 1000 : null,
      uv: h.uv_index?.[index] ?? null,
      code: h.weather_code?.[index] ?? null,
      condition: conditionFor(h.weather_code?.[index]),
      isFuture: new Date(time) >= new Date()
    })).filter((hour) => hour.time).map((hour) => ({ ...hour, timezone: location.timezone }));
  }

  function normalizeDaily(forecast) {
    const d = forecast.daily || {};
    return (d.time || []).map((time, index) => ({
      date: time,
      tempMax: d.temperature_2m_max?.[index] ?? null,
      tempMin: d.temperature_2m_min?.[index] ?? null,
      feelsMax: d.apparent_temperature_max?.[index] ?? null,
      rainProbabilityMax: d.precipitation_probability_max?.[index] ?? null,
      precipitationSum: d.precipitation_sum?.[index] ?? null,
      windMax: d.wind_speed_10m_max?.[index] ?? null,
      uvMax: d.uv_index_max?.[index] ?? null,
      sunrise: d.sunrise?.[index] ?? null,
      sunset: d.sunset?.[index] ?? null
    }));
  }

  function normalizeAirQuality(data) {
    const hourly = data.hourly || {};
    if (!hourly.time?.length) return null;
    const now = Date.now();
    let bestIndex = 0;
    hourly.time.forEach((time, index) => {
      if (Math.abs(new Date(time) - now) < Math.abs(new Date(hourly.time[bestIndex]) - now)) bestIndex = index;
    });
    const particles = [
      { name: "PM2.5", value: hourly.pm2_5?.[bestIndex] },
      { name: "PM10", value: hourly.pm10?.[bestIndex] },
      { name: "NO₂", value: hourly.nitrogen_dioxide?.[bestIndex] },
      { name: "O₃", value: hourly.ozone?.[bestIndex] }
    ].filter((item) => item.value !== null && item.value !== undefined);
    const relevant = particles.sort((a, b) => b.value - a.value)[0] || null;
    return {
      aqi: hourly.european_aqi?.[bestIndex] ?? null,
      pm25: hourly.pm2_5?.[bestIndex] ?? null,
      pm10: hourly.pm10?.[bestIndex] ?? null,
      relevantPollutant: relevant
    };
  }

  function compareFromArchive(archive, dailyToday) {
    const h = archive.hourly || {};
    const d = archive.daily || {};
    const yesterday = {
      temp: average(h.temperature_2m || []),
      feelsLike: average(h.apparent_temperature || []),
      humidity: average(h.relative_humidity_2m || []),
      rain: d.precipitation_sum?.[0] ?? null,
      wind: average(h.wind_speed_10m || []),
      uv: null
    };
    return {
      yesterday,
      tomorrow: null,
      today: {
        temp: average([dailyToday?.tempMax, dailyToday?.tempMin]),
        feelsLike: dailyToday?.feelsMax ?? null,
        humidity: null,
        rain: dailyToday?.precipitationSum ?? null,
        wind: dailyToday?.windMax ?? null,
        uv: dailyToday?.uvMax ?? null
      }
    };
  }

  async function fetchWeather(location) {
    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);
    const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
    forecastUrl.search = new URLSearchParams({
      latitude,
      longitude,
      timezone: location.timezone || "auto",
      forecast_days: "3",
      past_days: "1",
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
      hourly: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weather_code,visibility,wind_speed_10m,uv_index",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset"
    }).toString();

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const archiveUrl = new URL("https://archive-api.open-meteo.com/v1/archive");
    archiveUrl.search = new URLSearchParams({
      latitude,
      longitude,
      timezone: location.timezone || "auto",
      start_date: dateString(yesterday),
      end_date: dateString(yesterday),
      hourly: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m",
      daily: "precipitation_sum"
    }).toString();

    const aqUrl = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
    aqUrl.search = new URLSearchParams({
      latitude,
      longitude,
      timezone: location.timezone || "auto",
      hourly: "european_aqi,pm10,pm2_5,nitrogen_dioxide,ozone"
    }).toString();

    const [forecast, airQualityResult, archiveResult] = await Promise.allSettled([
      fetchJson(forecastUrl),
      fetchJson(aqUrl),
      fetchJson(archiveUrl)
    ]);
    if (forecast.status !== "fulfilled") throw forecast.reason;

    const forecastData = forecast.value;
    const hourly = normalizeHourly(forecastData, location);
    const daily = normalizeDaily(forecastData);
    const currentRaw = forecastData.current || {};
    const currentDate = (currentRaw.time || new Date().toISOString()).slice(0, 10);
    const todayDaily = daily.find((item) => item.date === currentDate) || daily.find((item) => item.date > currentDate) || daily[0];
    const currentHour = nearestHour(hourly);
    const current = {
      time: currentRaw.time,
      temp: currentRaw.temperature_2m ?? currentHour?.temp ?? null,
      feelsLike: currentRaw.apparent_temperature ?? currentHour?.feelsLike ?? null,
      humidity: currentRaw.relative_humidity_2m ?? currentHour?.humidity ?? null,
      wind: currentRaw.wind_speed_10m ?? currentHour?.wind ?? null,
      windDirection: currentRaw.wind_direction_10m ?? null,
      visibility: currentHour?.visibility ?? null,
      rainProbability: currentHour?.rainProbability ?? null,
      precipitation: currentRaw.precipitation ?? currentHour?.precipitation ?? null,
      code: currentRaw.weather_code ?? currentHour?.code ?? null,
      condition: conditionFor(currentRaw.weather_code ?? currentHour?.code)
    };
    const comparison = archiveResult.status === "fulfilled"
      ? compareFromArchive(archiveResult.value, todayDaily)
      : { today: null, yesterday: null, tomorrow: null, unavailable: true };
    const tomorrowDaily = daily.find((item) => item.date > currentDate);
    comparison.tomorrow = tomorrowDaily ? {
      temp: average([tomorrowDaily.tempMax, tomorrowDaily.tempMin]),
      feelsLike: tomorrowDaily.feelsMax,
      humidity: null,
      rain: tomorrowDaily.precipitationSum,
      wind: tomorrowDaily.windMax,
      uv: tomorrowDaily.uvMax
    } : null;

    const weather = {
      fetchedAt: new Date().toISOString(),
      location,
      current,
      hourly,
      daily,
      todayDaily,
      airQuality: airQualityResult.status === "fulfilled" ? normalizeAirQuality(airQualityResult.value) : null,
      sun: {
        sunrise: todayDaily?.sunrise || null,
        sunset: todayDaily?.sunset || null
      },
      alerts: [],
      comparison
    };
    weather.analysis = analyzeWeather(weather);
    weather.alerts = buildAlerts(weather);
    localStorage.setItem(STORAGE.weather, JSON.stringify(weather));
    return weather;
  }

  function nearestHour(hourly) {
    const now = Date.now();
    return hourly.reduce((best, hour) => {
      if (!best) return hour;
      return Math.abs(new Date(hour.time) - now) < Math.abs(new Date(best.time) - now) ? hour : best;
    }, null);
  }

  function upcomingHours(weather, count = 12) {
    return weather.hourly.filter((hour) => new Date(hour.time) >= new Date()).slice(0, count);
  }

  function classifyComfort(feelsLike, humidity) {
    if (feelsLike === null || feelsLike === undefined) return { key: "dataUnavailable", severity: 0 };
    let key = "comfortable";
    let severity = 1;
    if (feelsLike >= 40) { key = "extremeHeat"; severity = 5; }
    else if (feelsLike >= 35) { key = "veryHot"; severity = 4; }
    else if (feelsLike >= 30) { key = "hot"; severity = 3; }
    else if (feelsLike >= 25) { key = "warm"; severity = 2; }
    if (humidity >= 70 && feelsLike >= 30 && severity < 4) {
      key = "humid";
      severity += 1;
    }
    if (humidity >= 80 && feelsLike >= 35) {
      key = "uncomfortable";
      severity = Math.max(severity, 4);
    }
    return { key, label: t(key), severity };
  }

  function findRainWindow(hours) {
    const meaningful = hours.filter((hour) => (hour.rainProbability || 0) >= 40 || (hour.precipitation || 0) >= 0.5);
    if (!meaningful.length) return null;
    let bestStart = 0;
    let bestScore = -1;
    for (let i = 0; i < hours.length; i += 1) {
      const block = hours.slice(i, i + 3);
      const score = block.reduce((sum, hour) => sum + (hour.rainProbability || 0) + (hour.precipitation || 0) * 18, 0);
      if (score > bestScore) {
        bestScore = score;
        bestStart = i;
      }
    }
    const windowHours = hours.slice(bestStart, bestStart + 3).filter((hour) => (hour.rainProbability || 0) >= 25 || (hour.precipitation || 0) > 0);
    const peak = windowHours.reduce((best, hour) => {
      if (!best) return hour;
      const score = (hour.rainProbability || 0) + (hour.precipitation || 0) * 18;
      const bestScoreLocal = (best.rainProbability || 0) + (best.precipitation || 0) * 18;
      return score > bestScoreLocal ? hour : best;
    }, null);
    return { hours: windowHours, peak };
  }

  function uvCategory(value) {
    if (value === null || value === undefined) return t("dataUnavailable");
    if (value < 3) return t("categoryLow");
    if (value < 6) return t("categoryModerate");
    if (value < 8) return t("categoryHigh");
    if (value < 11) return t("categoryVeryHigh");
    return t("categoryExtreme");
  }

  function aqiCategory(value) {
    if (value === null || value === undefined) return t("dataUnavailable");
    if (value < 20) return t("categoryLow");
    if (value < 40) return t("categoryModerate");
    if (value < 60) return t("categoryHigh");
    if (value < 80) return t("categoryVeryHigh");
    return t("categoryExtreme");
  }

  function scoreOutdoor(weather) {
    const hours = upcomingHours(weather, 6);
    const rainMax = max(hours.map((hour) => hour.rainProbability)) || 0;
    const windMax = max(hours.map((hour) => hour.wind)) || weather.current.wind || 0;
    const visibilityMin = Math.min(...hours.map((hour) => hour.visibility ?? 99));
    const uvMax = max(hours.map((hour) => hour.uv)) || 0;
    const comfort = classifyComfort(weather.current.feelsLike, weather.current.humidity);
    let penalty = 0;
    const limits = [];
    if (comfort.severity >= 4) { penalty += 35; limits.push(t("heatStress")); }
    else if (comfort.severity >= 3) { penalty += 20; limits.push(t("heatStress")); }
    if (rainMax >= 70) { penalty += 30; limits.push(t("rain")); }
    else if (rainMax >= 40) { penalty += 16; limits.push(t("rain")); }
    if (windMax >= 35) { penalty += 20; limits.push(t("wind")); }
    if (visibilityMin <= 3) { penalty += 18; limits.push(t("visibility")); }
    if (uvMax >= 8) { penalty += 18; limits.push(t("uv")); }
    if ((weather.airQuality?.aqi || 0) >= 60) { penalty += 18; limits.push(t("airQuality")); }
    const base = Math.max(0, 100 - penalty);
    const label = (value) => value >= 78 ? t("good") : value >= 58 ? t("fair") : value >= 38 ? t("limited") : t("poor");
    return {
      walking: label(base),
      cycling: label(base - (windMax >= 28 ? 12 : 0)),
      general: label(base),
      limitation: limits.length ? `${t("mainLimitation")}: ${Array.from(new Set(limits)).join(", ")}.` : t("noMajorLimitations")
    };
  }

  function gearHints(weather) {
    const hours = upcomingHours(weather, 8);
    const rainMax = max(hours.map((hour) => hour.rainProbability)) || 0;
    const precipMax = max(hours.map((hour) => hour.precipitation)) || 0;
    const uvMax = max(hours.map((hour) => hour.uv)) || 0;
    const comfort = classifyComfort(weather.current.feelsLike, weather.current.humidity);
    const carry = [];
    const wear = [];
    const optional = [];
    const hydration = [];
    if (rainMax >= 45 || precipMax >= 0.5) carry.push(t("umbrella"));
    if (rainMax >= 65 || precipMax >= 1) carry.push(t("raincoat"));
    if (comfort.severity >= 2) wear.push(t("lightClothing"));
    if (weather.current.temp <= 18) wear.push(t("lightJacket"));
    if (weather.current.temp <= 12) wear.push(t("warmLayer"));
    if (uvMax >= 5) optional.push(t("sunglasses"), t("sunProtection"));
    if (comfort.severity >= 3 || weather.current.humidity >= 70) hydration.push(t("waterBottle"));
    return { carry, wear, optional, hydration };
  }

  function buildAlerts(weather) {
    const hours = upcomingHours(weather, 12);
    const alerts = [];
    const rainWindow = findRainWindow(hours);
    if (rainWindow?.peak && ((rainWindow.peak.rainProbability || 0) >= 75 || (rainWindow.peak.precipitation || 0) >= 4)) {
      alerts.push(t("heavyRainAlert", { time: formatHour(rainWindow.peak.time, weather.location.timezone) }));
    }
    for (let i = 1; i < hours.length; i += 1) {
      if ((hours[i].rainProbability || 0) - (hours[i - 1].rainProbability || 0) >= 35) {
        alerts.push(t("rainIncreaseAlert", {
          start: formatHour(hours[i - 1].time, weather.location.timezone),
          end: formatHour(hours[i].time, weather.location.timezone)
        }));
        break;
      }
    }
    if (classifyComfort(weather.current.feelsLike, weather.current.humidity).severity >= 4) alerts.push(t("heatAlert"));
    if ((max(hours.map((hour) => hour.wind)) || 0) >= 38) alerts.push(t("windAlert"));
    if (Math.min(...hours.map((hour) => hour.visibility ?? 99)) <= 2) alerts.push(t("visibilityAlert"));
    return Array.from(new Set(alerts));
  }

  function analyzeWeather(weather) {
    const hours = upcomingHours(weather, 12);
    return {
      comfort: classifyComfort(weather.current.feelsLike, weather.current.humidity),
      rainWindow: findRainWindow(hours),
      outdoor: scoreOutdoor(weather),
      gear: gearHints(weather)
    };
  }

  function getCachedWeather() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.weather));
    } catch {
      return null;
    }
  }

  function setStatus(container, message, type = "") {
    if (!container) return;
    container.innerHTML = message ? `<div class="status-message ${type}">${message}</div>` : "";
  }

  function initBase() {
    applyTheme();
    initControls();
    applyTranslations();
    registerServiceWorker();
  }

  window.AGAtmos = {
    STORAGE,
    DEFAULT_LOCATION,
    state,
    t,
    applyTranslations,
    applyTheme,
    initBase,
    formatNumber,
    formatTemp,
    formatSpeed,
    formatMm,
    formatPercent,
    formatKm,
    formatTime,
    formatHour,
    conditionFor,
    getSavedLocation,
    saveLocation,
    getBrowserLocation,
    fetchJson,
    fetchWeather,
    searchLocations,
    upcomingHours,
    classifyComfort,
    findRainWindow,
    uvCategory,
    aqiCategory,
    scoreOutdoor,
    gearHints,
    buildAlerts,
    analyzeWeather,
    getCachedWeather,
    setStatus
  };

  document.addEventListener("DOMContentLoaded", initBase);
}());
