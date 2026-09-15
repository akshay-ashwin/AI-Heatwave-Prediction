/**
 * dashboard.js
 * Renders the Heatwave Command Center (index.html) from mock data.
 *
 * When the backend is wired up, replace MOCK_DASHBOARD_DATA with a call to
 * GET /api/weather (and /api/alerts for the risk/factor breakdown) as
 * documented in handoff_to_saanvi.md, then call renderDashboard(data).
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------
  // MOCK DATA — replace with a fetch("/api/weather") response later.
  // ---------------------------------------------------------------------
  const MOCK_DASHBOARD_DATA = {
    temperature: 39.2,
    temperatureDelta: "+3.8° above seasonal normal",
    risk: "HIGH",
    riskProbability: 91,
    confidence: 91,
    forecastWindow: "Next 1–3 Days",

    regionalRisk: [
      { area: "Kurla", temp: 40.1, risk: "SEVERE" },
      { area: "Andheri East", temp: 39.6, risk: "HIGH" },
      { area: "Dharavi", temp: 39.0, risk: "HEATWAVE" },
      { area: "Colaba", temp: 36.8, risk: "NORMAL" },
    ],

    whyFactors: [
      { label: "Persistent temperature anomaly", pct: 42 },
      { label: "High overnight humidity", pct: 31 },
      { label: "Low wind dispersion", pct: 18 },
    ],

    recommendedActions: [
      "Issue ward-level heat advisory",
      "Activate cooling centres",
      "Mobilise field response teams",
      "Monitor vulnerable populations",
    ],
  };

  const RISK_BADGE_CLASS = {
    SEVERE: "badge-red",
    HIGH: "badge-orange",
    HEATWAVE: "badge-orange",
    NORMAL: "badge-green",
  };

  function renderMetrics(data) {
    document.getElementById("metric-temperature").textContent = data.temperature.toFixed(1) + "°C";
    document.getElementById("metric-temperature-sub").textContent = data.temperatureDelta;
    document.getElementById("metric-risk").textContent = data.risk;
    document.getElementById("metric-risk-sub").textContent = data.riskProbability + "% prediction probability";
    document.getElementById("metric-confidence").textContent = data.confidence + "%";
    document.getElementById("metric-forecast").textContent = data.forecastWindow;
  }

  function renderRiskTable(rows) {
    const tbody = document.querySelector("#risk-table tbody");
    if (!tbody) return;
    tbody.innerHTML = rows
      .map((row) => {
        const badgeClass = RISK_BADGE_CLASS[row.risk] || "badge-slate";
        return (
          "<tr>" +
          "<td>" + row.area + "</td>" +
          "<td>" + row.temp.toFixed(1) + "°C</td>" +
          '<td><span class="badge-pill ' + badgeClass + '">' + row.risk + "</span></td>" +
          "</tr>"
        );
      })
      .join("");
  }

  function renderWhyFactors(factors) {
    const container = document.getElementById("why-factors");
    if (!container) return;
    const pct = window.HW.util.clampPct;
    container.innerHTML = factors
      .map(
        (f) =>
          '<div class="factor-row">' +
          '<div class="factor-top"><span>' + f.label + '</span><span class="factor-value">' + f.pct + '%</span></div>' +
          '<div class="factor-track"><div class="factor-fill fill-orange" style="width: ' + pct(f.pct) + '%;"></div></div>' +
          "</div>"
      )
      .join("");
  }

  function renderActions(actions) {
    const container = document.getElementById("authority-actions");
    if (!container) return;
    container.innerHTML = actions
      .map(
        (label, i) =>
          '<div class="action-item">' +
          '<span class="action-number">' + (i + 1) + "</span>" +
          '<span class="action-label">' + label + "</span>" +
          "</div>"
      )
      .join("");
  }

  function renderDashboard(data) {
    renderMetrics(data);
    renderRiskTable(data.regionalRisk);
    renderWhyFactors(data.whyFactors);
    renderActions(data.recommendedActions);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderDashboard(MOCK_DASHBOARD_DATA);
  });
})();
