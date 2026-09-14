# Use-Case Specification

## Climate Intelligence Decision Support System for Heatwave Monitoring, Prediction and Early Warning using Explainable AI

**System ID:** KJS-CES-01

---

## 1. Primary Actor

**Local Authority / Disaster Management Official**

## 2. External Actors

- **Weather Data Source** — provides meteorological and forecast weather data.
- **ML Prediction Engine** — generates heatwave predictions and associated risk/probability information.
- **Notification Service** — supports delivery of early warnings and public advisories.

---

## 3. Use-Case Summary

| ID | Use Case | Actor | Purpose |
|---|---|---|---|
| UC-01 | Login | Local Authority / Disaster Management Official | Authenticate and access the system. |
| UC-02 | Monitor Weather | Local Authority / Disaster Management Official | Monitor relevant meteorological conditions. |
| UC-03 | View Dashboard | Local Authority / Disaster Management Official | View the central decision-support dashboard. |
| UC-04 | Generate Heatwave Prediction | ML Prediction Engine | Generate a heatwave prediction from available meteorological features. |
| UC-05 | View Risk Level | Local Authority / Disaster Management Official | View predicted heatwave risk and probability/confidence. |
| UC-06 | View SHAP Explanation | Local Authority / Disaster Management Official | Understand the main factors contributing to a prediction. |
| UC-07 | View Forecast | Local Authority / Disaster Management Official | View available forecast weather information. |
| UC-08 | Generate Early Warning | Local Authority / Disaster Management Official | Prepare an early warning when heatwave risk requires action. |
| UC-09 | Generate Public Advisory | Local Authority / Disaster Management Official | Prepare a plain-language public advisory. |
| UC-10 | View Analytics | Local Authority / Disaster Management Official | Review heatwave prediction and related analytical information. |

---

# 4. Detailed Use-Case Specifications

## UC-01 — Login

**Actor:** Local Authority / Disaster Management Official

**Precondition:** The user has valid authorized credentials.

**Main Flow:**
1. User opens the system.
2. User enters credentials.
3. System validates the credentials.
4. System grants access to the dashboard.

**Postcondition:** The user is authenticated and can access authorized system functions.

---

## UC-02 — Monitor Weather

**Primary Actor:** Local Authority / Disaster Management Official  
**External Actor:** Weather Data Source

**Precondition:** Relevant weather data is available.

**Main Flow:**
1. User opens the weather monitoring function.
2. System obtains available meteorological information.
3. System presents the relevant weather conditions to the user.

**Postcondition:** Current/available meteorological information is displayed.

---

## UC-03 — View Dashboard

**Actor:** Local Authority / Disaster Management Official

**Precondition:** User is authenticated.

**Main Flow:**
1. User opens the dashboard.
2. System loads available heatwave decision-support information.
3. System displays prediction, risk, forecast and explanation information where available.

**Postcondition:** The user can access the main decision-support information.

---

## UC-04 — Generate Heatwave Prediction

**Primary Actor:** ML Prediction Engine  
**External Actor:** Weather Data Source

**Precondition:** Required meteorological features are available and prepared for prediction.

**Main Flow:**
1. System obtains the required meteorological features.
2. Features are processed for the prediction model.
3. ML Prediction Engine generates a heatwave prediction.
4. System obtains the associated probability/risk information where available.

**Postcondition:** A heatwave prediction is available for presentation to the user.

**Expected Output:** Heatwave classification such as Normal, Heatwave or Severe Heatwave.

---

## UC-05 — View Risk Level

**Actor:** Local Authority / Disaster Management Official

**Precondition:** A heatwave prediction is available.

**Main Flow:**
1. User opens the risk information.
2. System retrieves the prediction result.
3. System displays the corresponding risk level.
4. System displays probability/confidence information where available.

**Postcondition:** The user understands the predicted heatwave risk.

---

## UC-06 — View SHAP Explanation

**Actor:** Local Authority / Disaster Management Official

**Precondition:** A prediction and corresponding SHAP explanation are available.

**Main Flow:**
1. User opens the explanation view.
2. System retrieves SHAP explanation information.
3. System identifies the major contributing meteorological factors.
4. System presents the explanation in an understandable form.

**Postcondition:** The user can understand which factors contributed to the prediction.

---

## UC-07 — View Forecast

**Primary Actor:** Local Authority / Disaster Management Official  
**External Actor:** Weather Data Source

**Precondition:** Forecast weather information is available.

**Main Flow:**
1. User opens the forecast function.
2. System retrieves available forecast information.
3. System presents forecast conditions relevant to heatwave monitoring.

**Postcondition:** Forecast information is available to support decision-making.

---

## UC-08 — Generate Early Warning

**Primary Actor:** Local Authority / Disaster Management Official  
**External Actor:** Notification Service

**Precondition:** A heatwave risk requiring an early warning has been identified.

**Main Flow:**
1. System identifies the relevant heatwave risk.
2. User reviews the prediction and risk information.
3. User initiates early-warning generation.
4. System prepares the warning information.
5. Notification Service supports dissemination.

**Postcondition:** An early warning is prepared for dissemination.

---

## UC-09 — Generate Public Advisory

**Primary Actor:** Local Authority / Disaster Management Official  
**External Actor:** Notification Service

**Precondition:** A relevant heatwave risk has been identified.

**Main Flow:**
1. User reviews the prediction, risk and available explanation.
2. User initiates public advisory generation.
3. System prepares a plain-language advisory.
4. Notification Service supports dissemination.

**Postcondition:** A public heatwave advisory is prepared for dissemination.

---

## UC-10 — View Analytics

**Actor:** Local Authority / Disaster Management Official

**Precondition:** Relevant prediction or historical information is available.

**Main Flow:**
1. User opens the analytics function.
2. System retrieves available heatwave prediction information.
3. System presents relevant analytical information.

**Postcondition:** Heatwave-related analytics are available to support monitoring and decision-making.

---

## 5. Scope Note

These specifications describe the intended decision-support workflow for KJS-CES-01. Specific implementation details should be updated to match the final working system.