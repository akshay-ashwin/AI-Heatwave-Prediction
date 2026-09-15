/**
 * alerts.js
 * Behavior for the Heatwave Early Warning / Alert Management page.
 *
 * Content on this page is the finalized demo alert (matches the Canva
 * source of truth exactly), so this script only wires up the two action
 * buttons. Once the backend is connected, replace the console.log calls
 * with POST requests to /api/alerts (see handoff_to_saanvi.md).
 */

(function () {
  "use strict";

  function showActionFeedback(button, message) {
    const original = button.textContent;
    button.disabled = true;
    button.textContent = message;
    setTimeout(function () {
      button.disabled = false;
      button.textContent = original;
    }, 1500);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const issueBtn = document.getElementById("btn-issue-warning");
    const draftBtn = document.getElementById("btn-save-draft");

    if (issueBtn) {
      issueBtn.addEventListener("click", function () {
        // TODO: POST /api/alerts with the alert payload once connected.
        console.log("[alerts] Issue warning requested (demo data, no backend call yet).");
        showActionFeedback(issueBtn, "WARNING ISSUED");
      });
    }

    if (draftBtn) {
      draftBtn.addEventListener("click", function () {
        // TODO: POST /api/alerts (status: draft) once connected.
        console.log("[alerts] Save as draft requested (demo data, no backend call yet).");
        showActionFeedback(draftBtn, "SAVED");
      });
    }
  });
})();
