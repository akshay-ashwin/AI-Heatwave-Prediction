# Handoff Document for Saanvi (Frontend)

Here is everything you need to connect your frontend to the Heatwave Prediction backend.

## A. API Base URL
- **Local Development URL**: `http://localhost:8000/api`
*(Run the backend locally using `uvicorn backend.app:app --reload`)*

## B. Prediction API
**Endpoint**: `POST /api/predict`

**Request Format (JSON):**
```json
{
  "temperature": 42.0,
  "humidity": 68.0,
  "wind_speed": 9.0,
  "temp_deviation": 5.0
}
```

**Response Format (JSON):**
```json
{
  "risk": "Severe Heatwave",
  "probability": 0.98,
  "temperature": 42.0,
  "humidity": 68.0,
  "wind_speed": 9.0,
  "top_factors": [
    {
      "name": "Temperature Deviation",
      "impact": 0.24,
      "direction": "increases"
    },
    {
      "name": "Maximum Temperature",
      "impact": 0.18,
      "direction": "increases"
    },
    {
      "name": "Relative Humidity",
      "impact": 0.05,
      "direction": "increases"
    }
  ]
}
```
*Note: The `top_factors` are generated dynamically by SHAP and represent the top 3 meteorological variables that contributed to this specific prediction.*

## C. Additional APIs (For Dashboards)

**Endpoint**: `GET /api/weather`
Returns sample live weather data.
```json
{
  "location": "Mumbai",
  "temperature": 39.2,
  "humidity": 65.0,
  "wind_speed": 12.0
}
```

**Endpoint**: `GET /api/alerts`
Returns current active alerts.
```json
{
  "severity": "HIGH",
  "message": "High heatwave risk detected",
  "recommended_actions": [
    "Issue public advisory",
    "Monitor vulnerable areas",
    "Prepare emergency response teams"
  ]
}
```

## D. Machine Learning Results
We trained three models on the synthetically generated heatwave dataset (5000 records mimicking IMD criteria).

- **Logistic Regression**:
  - Precision: 0.995
  - Recall: 0.995
  - F1 Score: 0.995

- **Random Forest**:
  - Precision: 0.997
  - Recall: 0.997
  - F1 Score: 0.997

- **XGBoost**:
  - Precision: 0.996
  - Recall: 0.996
  - F1 Score: 0.996

**Best Model**: Random Forest (Saved to `ml/best_model.pkl`)
