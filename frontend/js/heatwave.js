/**
 * heatwave.js
 * Renders the detailed Heatwave Prediction + SHAP explanation page.
 *
 * Maps directly onto POST /api/predict from handoff_to_saanvi.md:
 * response.top_factors -> shap-factors, response.risk/probability -> banner.
 * Swap MOCK_PREDICTION for the real response once the backend is connected.
 */

(function () {
  "use strict";

  const MOCK_PREDICTION = {
    risk: "Severe Heatwave",
    probability: 0.91,
    temperature: 42.0,
    humidity: 68.0,
    windSpeed: 9.0,
    tempDeviation: 5.0,

    topFactors: [
      { name: "Maximum Temperature", impact: 0.42, direction: "increases" },
      { name: "Humidity", impact: 0.27, direction: "increases" },
      { name: "Temperature Deviation", impact: 0.16, direction: "increases" },
      { name: "Wind Speed", impact: 0.05, direction: "decreases" },
    ],

    note:
      "The model predicts a high likelihood of severe heatwave conditions because of the persistent " +
      "temperature anomaly, elevated humidity, and limited wind dispersion.",

    riskAssessment: [
      { label: "High temperature anomaly", severity: "red" },
      { label: "Elevated humidity", severity: "orange" },
      { label: "Low wind dispersion", severity: "orange" },
      { label: "Severe heatwave risk", severity: "red" },
    ],
  };

  function renderBanner(data) {
    document.getElementById("risk-probability").textContent =
      Math.round(data.probability * 100) + "% RISK";
  }

  function renderMetrics(data) {
    document.getElementById("metric-max-temp").textContent = data.temperature.toFixed(0) + "°C";
    document.getElementById("metric-humidity").textContent = data.humidity.toFixed(0) + "%";
    document.getElementById("metric-wind").textContent = data.windSpeed.toFixed(0) + " km/h";
    document.getElementById("metric-deviation").textContent = "+" + data.tempDeviation.toFixed(0) + "°C";
  }

  function renderShapFactors(factors) {
    const container = document.getElementById("shap-factors");
    if (!container) return;
    const pct = window.HW.util.clampPct;

    container.innerHTML = factors
      .map((f) => {
        const pctVal = Math.round(f.impact * 100);
        const isDecrease = f.direction === "decreases";
        const sign = isDecrease ? "−" : "+";
        const fillClass = isDecrease ? "fill-green" : "fill-orange";
        return (
          '<div class="factor-row">' +
          '<div class="factor-top"><span>' + f.name + '</span><span class="factor-value">' + sign + pctVal + '%</span></div>' +
          '<div class="factor-track"><div class="factor-fill ' + fillClass + '" style="width: ' + pct(pctVal) + '%;"></div></div>' +
          "</div>"
        );
      })
      .join("");
  }

  function renderNote(note) {
    const el = document.getElementById("shap-note");
    if (el) el.textContent = note;
  }

  function renderRiskAssessment(items) {
    const container = document.getElementById("risk-assessment-list");
    if (!container) return;
    const colorVar = { red: "var(--red-text)", orange: "var(--orange-text)" };
    container.innerHTML = items
      .map(
        (item) =>
          '<li class="col-6"><i class="bi bi-dot" style="color: ' + colorVar[item.severity] + ';"></i> ' + item.label + "</li>"
      )
      .join("");
  }

  function renderPrediction(data) {
    renderBanner(data);
    renderMetrics(data);
    renderShapFactors(data.topFactors);
    renderNote(data.note);
    renderRiskAssessment(data.riskAssessment);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderPrediction(MOCK_PREDICTION);
  });
})();
