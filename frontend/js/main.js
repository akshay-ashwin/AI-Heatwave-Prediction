/**
 * main.js
 * Shared behavior across all pages: active nav highlighting + small helpers.
 * Loaded on every page BEFORE the page-specific script.
 */

(function () {
  "use strict";

  /**
   * Highlights the nav link whose data-page attribute matches the current
   * page (set via <body data-page="...">).
   */
  function highlightActiveNav() {
    const currentPage = document.body.getAttribute("data-page");
    if (!currentPage) return;

    document.querySelectorAll(".app-nav a[data-page]").forEach((link) => {
      if (link.getAttribute("data-page") === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  /**
   * Stamps the "last updated" style timestamps found on a page with the
   * current time, formatted like "Today, 10:32 AM".
   */
  function stampTimestamps() {
    const now = new Date();
    const formatted = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    document.querySelectorAll("[data-timestamp]").forEach((el) => {
      el.textContent = "Today, " + formatted;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    highlightActiveNav();
    stampTimestamps();
  });

  // Expose small shared helpers for page-specific scripts.
  window.HW = window.HW || {};
  window.HW.util = {
    /**
     * Clamp a 0-100 number for use as a percentage width/bar fill.
     */
    clampPct: function (n) {
      return Math.max(0, Math.min(100, n));
    },
  };
})();
