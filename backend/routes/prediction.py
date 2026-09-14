from fastapi import APIRouter
from pydantic import BaseModel
from ml.predict import predict_heatwave

router = APIRouter()

class PredictionRequest(BaseModel):
    temperature: float
    humidity: float
    wind_speed: float
    temp_deviation: float

@router.post("/predict")
def predict(request: PredictionRequest):
    result = predict_heatwave(
        temperature=request.temperature,
        humidity=request.humidity,
        wind_speed=request.wind_speed,
        temp_deviation=request.temp_deviation
    )
    
    return {
        "risk": result["risk"],
        "probability": result["probability"],
        "temperature": request.temperature,
        "humidity": request.humidity,
        "wind_speed": request.wind_speed,
        "top_factors": result["factors"]
    }
