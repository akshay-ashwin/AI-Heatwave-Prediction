from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes import prediction, weather, alerts
from ml.predict import init_model

app = FastAPI(title="AI Heatwave Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model on startup
@app.on_event("startup")
def startup_event():
    init_model()

app.include_router(prediction.router, prefix="/api")
app.include_router(weather.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "Backend is running!"}
