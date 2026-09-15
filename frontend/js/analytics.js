/**
 * analytics.js
 * Renders the Climate Analytics charts (Chart.js) and the model
 * performance tiles, all from mock/demo data as required for this phase.
 */

(function () {
  "use strict";

  const COLORS = {
    teal: "#0d9488",
    red: "#dc2626",
    orange: "#ea580c",
    green: "#16a34a",
    slate: "#94a3b8",
    grid: "#eef1f5",
  };

  const MOCK_TEMPERATURE_TREND = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [34, 36, 38, 43, 44, 40, 37],
  };

  const MOCK_RISK_DISTRIBUTION = [
    { label: "Normal Conditions", pct: 62, color: COLORS.green },
    { label: "Heatwave", pct: 28, color: COLORS.orange },
    { label: "Severe Heatwave", pct: 10, color: COLORS.red },
  ];

  const MOCK_HEATWAVE_EVENTS = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    values: [1, 2, 4, 6, 3, 2],
  };

  const MOCK_MODEL_PERFORMANCE = [
    { label: "Precision", value: "DEMO" },
    { label: "Recall", value: "DEMO" },
    { label: "F1 Score", value: "DEMO" },
    { label: "Confidence", value: "DEMO" },
  ];

  function renderTemperatureTrend() {
    const ctx = document.getElementById("chart-temperature-trend");
    if (!ctx || typeof Chart === "undefined") return;

    new Chart(ctx, {
      type: "line",
      data: {
        labels: MOCK_TEMPERATURE_TREND.labels,
        datasets: [
          {
            label: "Max Temp (°C)",
            data: MOCK_TEMPERATURE_TREND.values,
            borderColor: COLORS.red,
            backgroundColor: COLORS.red,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: COLORS.red,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            grid: { color: COLORS.grid },
            ticks: { callback: (v) => v + "°C" },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  function renderRiskDistribution() {
    const ctx = document.getElementById("chart-risk-distribution");
    if (!ctx || typeof Chart === "undefined") return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: MOCK_RISK_DISTRIBUTION.map((r) => r.label),
        datasets: [
          {
            data: MOCK_RISK_DISTRIBUTION.map((r) => r.pct),
            backgroundColor: MOCK_RISK_DISTRIBUTION.map((r) => r.color),
            borderRadius: 6,
            barThickness: 22,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => ctx.parsed.x + "%" } },
        },
        scales: {
          x: {
            max: 100,
            grid: { color: COLORS.grid },
            ticks: { callback: (v) => v + "%" },
          },
          y: { grid: { display: false } },
        },
      },
    });
  }

  function renderHeatwaveEvents() {
    const ctx = document.getElementById("chart-heatwave-events");
    if (!ctx || typeof Chart === "undefined") return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: MOCK_HEATWAVE_EVENTS.labels,
        datasets: [
          {
            data: MOCK_HEATWAVE_EVENTS.values,
            backgroundColor: MOCK_HEATWAVE_EVENTS.values.map((v) =>
              v >= 5 ? COLORS.red : v >= 3 ? COLORS.orange : COLORS.teal
            ),
            borderRadius: 6,
            barThickness: 28,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: COLORS.grid }, ticks: { precision: 0 } },
          x: { grid: { display: false } },
        },
      },
    });
  }

  function renderModelPerformance(tiles) {
    const container = document.getElementById("model-performance");
    if (!container) return;

    container.innerHTML = tiles
      .map(
        (t) =>
          '<div class="col-6">' +
          '<div class="metric-card">' +
          '<div class="metric-label">' + t.label + "</div>" +
          '<div class="metric-value" style="font-size:20px; color: var(--muted-2);">' + t.value + "</div>" +
          "</div>" +
          "</div>"
      )
      .join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderTemperatureTrend();
    renderRiskDistribution();
    renderHeatwaveEvents();
    renderModelPerformance(MOCK_MODEL_PERFORMANCE);
  });
})();
