from fastapi import APIRouter

router = APIRouter()

@router.get("/alerts")
def get_alerts():
    return {
        "severity": "HIGH",
        "message": "High heatwave risk detected",
        "recommended_actions": [
            "Issue public advisory",
            "Monitor vulnerable areas",
            "Prepare emergency response teams"
        ]
    }
