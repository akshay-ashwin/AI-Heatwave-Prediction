import joblib
import shap
import pandas as pd
import numpy as np

model = None
explainer = None
model_type = None

def init_model():
    global model, explainer, model_type
    if model is None:
        try:
            model = joblib.load("ml/best_model.pkl")
            model_type = type(model).__name__
            if model_type in ['RandomForestClassifier', 'XGBClassifier']:
                explainer = shap.TreeExplainer(model)
        except FileNotFoundError:
            print("Model not found. Please train it first.")

def predict_heatwave(temperature, humidity, wind_speed, temp_deviation):
    if model is None:
        init_model()
        if model is None:
            raise ValueError("Model not loaded.")
            
    features = ["maximum_temperature", "relative_humidity", "wind_speed", "temp_deviation"]
    input_df = pd.DataFrame([{
        "maximum_temperature": temperature,
        "relative_humidity": humidity,
        "wind_speed": wind_speed,
        "temp_deviation": temp_deviation
    }])
    
    prob = model.predict_proba(input_df)[0]
    pred_idx = model.predict(input_df)[0]
    
    label_map = {0: "Normal", 1: "Heatwave", 2: "Severe Heatwave"}
    risk = label_map[pred_idx]
    probability = float(prob[pred_idx])
    
    top_factors = []
    if explainer is not None:
        # Get explanation
        explanation = explainer(input_df)
        val = explanation.values[0]
        
        # Handle shape differences between RF and XGBoost
        if len(val.shape) == 2:
            # Multi-class output (features, classes)
            sv = val[:, pred_idx]
        else:
            sv = val
            
        factors = []
        for i, feature in enumerate(features):
            impact = float(sv[i])
            name_map = {
                "maximum_temperature": "Maximum Temperature",
                "relative_humidity": "Relative Humidity",
                "wind_speed": "Wind Speed",
                "temp_deviation": "Temperature Deviation"
            }
            factors.append({
                "name": name_map[feature],
                "impact": round(abs(impact), 4),  # Use absolute value for sorting but keep real impact
                "real_impact": round(impact, 4),
                "direction": "increases" if impact > 0 else "decreases"
            })
            
        # Sort by absolute impact and take top 3
        factors.sort(key=lambda x: x["impact"], reverse=True)
        top_factors = [
            {"name": f["name"], "impact": f["real_impact"], "direction": f["direction"]}
            for f in factors[:3]
        ]
        
    return {
        "risk": risk,
        "probability": round(probability, 2),
        "factors": top_factors
    }
