from fastapi import APIRouter

router = APIRouter()

@router.get("/weather")
def get_weather():
    return {
        "location": "Mumbai",
        "temperature": 39.2,
        "humidity": 65,
        "wind_speed": 12
    }
