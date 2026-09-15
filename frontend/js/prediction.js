/**
 * prediction.js
 * Renders the Prediction Overview page — a lightweight summary distinct
 * from the detailed SHAP breakdown on heatwave.html.
 *
 * Quick metrics map onto GET /api/weather; the forecast strip is
 * illustrative demo data until a forecast endpoint exists.
 */

(function () {
  "use strict";

  const MOCK_OVERVIEW = {
    riskLabel: "Severe Heatwave Risk",
    summary:
      "91% predicted probability for Mumbai over the next 1–3 days. Conditions are trending " +
      "above seasonal norms across most wards.",
    temperature: 39.2,
    humidity: 65,
    windSpeed: 12,
    probability: 91,

    forecast: [
      { day: "Today", temp: 39.2, risk: "SEVERE" },
      { day: "Tomorrow", temp: 38.6, risk: "HIGH" },
      { day: "Day 3", temp: 36.9, risk: "NORMAL" },
    ],
  };

  const RISK_BADGE_CLASS = {
    SEVERE: "badge-red",
    HIGH: "badge-orange",
    HEATWAVE: "badge-orange",
    NORMAL: "badge-green",
  };

  function renderSnapshot(data) {
    document.getElementById("overview-risk-label").textContent = data.riskLabel;
    document.getElementById("overview-summary").textContent = data.summary;
    document.getElementById("overview-temp").textContent = data.temperature.toFixed(1) + "°C";
    document.getElementById("overview-humidity").textContent = data.humidity + "%";
    document.getElementById("overview-wind").textContent = data.windSpeed + " km/h";
    document.getElementById("overview-probability").textContent = data.probability + "%";
  }

  function renderForecastStrip(days) {
    const container = document.getElementById("forecast-strip");
    if (!container) return;

    container.innerHTML = days
      .map((d) => {
        const badgeClass = RISK_BADGE_CLASS[d.risk] || "badge-slate";
        return (
          '<div class="col-md-4">' +
          '<div class="metric-card">' +
          '<div class="metric-label">' + d.day + "</div>" +
          '<div class="metric-value">' + d.temp.toFixed(1) + "°C</div>" +
          '<div class="mt-2"><span class="badge-pill ' + badgeClass + '">' + d.risk + "</span></div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderOverview(data) {
    renderSnapshot(data);
    renderForecastStrip(data.forecast);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderOverview(MOCK_OVERVIEW);
  });
})();
