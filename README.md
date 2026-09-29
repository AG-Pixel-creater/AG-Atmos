# AG Atmos

AG Atmos is a static, installable weather dashboard focused on practical forecast decisions: current comfort, rain windows, commute conditions, outdoor scores, gear hints, air quality, UV, sun timing, comparisons, alerts, and a supported radar map.

## Features

- Current conditions, feels-like temperature, humidity, wind, visibility, and rain probability.
- Rule-based comfort, outdoor score, clothing/gear hints, weather alerts, and Smart Day Brief.
- Hourly timeline and commute view generated from one normalized weather dataset.
- Today vs yesterday and today vs tomorrow comparisons where supported by Open-Meteo data.
- English and Urdu localization with LTR/RTL switching.
- Dark, light, and system themes using CSS variables.
- Browser geolocation, manual city search, and saved location.
- PWA manifest and service worker for offline app shell caching.
- Interactive map with OpenStreetMap base tiles and RainViewer precipitation radar when available.

## Project Structure

```text
AG Atmos/
├── index.html
├── map.html
├── css/
│   ├── index.css
│   ├── map.css
│   └── styles.css
├── js/
│   ├── index.js
│   ├── main.js
│   └── map.js
├── assets/
│   ├── icons/
│   └── images/
├── manifest.json
├── service-worker.js
└── README.md
```

## Weather APIs

AG Atmos uses public APIs that do not require private keys:

- Open-Meteo Forecast API for current, hourly, daily, UV, sunrise, sunset, and forecast comparison data.
- Open-Meteo Geocoding API for manual location search.
- Open-Meteo Air Quality API for AQI and pollutants.
- Open-Meteo Archive API for yesterday comparison where available.
- RainViewer public weather map metadata and tiles for precipitation radar.

Cloud, wind, and temperature map overlays are not shown because the selected public tile provider in this app only supports precipitation radar.

## Local Development

Run a local static server from the project root:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

The app has no build step and no package installation requirement. A local server is recommended because service workers and geolocation behave more reliably from `localhost` than from a direct file URL.

## PWA

The service worker caches the app shell and static assets. Live weather still requires an internet connection. If cached weather exists while offline, AG Atmos clearly labels it as the latest available data.

## Localization

Translations live centrally in `js/main.js`. English uses `lang="en"` and `dir="ltr"`. Urdu uses `lang="ur"` and `dir="rtl"`.

## Theme System

Theme choices are `dark`, `light`, and `system`, stored in `localStorage`. All shared colors are controlled by CSS variables in `css/styles.css`.

## Deployment

Deploy the project as static files on any static host. Keep all files in the same relative structure so script, stylesheet, manifest, icon, and service worker paths resolve correctly.
