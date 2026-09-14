import pandas as pd
import numpy as np
import os

# Define size of the dataset
NUM_SAMPLES = 5000
np.random.seed(42)

def generate_synthetic_data(num_samples=NUM_SAMPLES):
    # Base meteorological variables
    # Seasonal normal temp for a typical summer (e.g., 35-40 C)
    seasonal_normal_temperature = np.random.uniform(35.0, 40.0, num_samples)
    
    # Let's create realistic deviations
    temp_deviation = np.random.normal(loc=1.0, scale=3.5, size=num_samples)
    
    maximum_temperature = seasonal_normal_temperature + temp_deviation
    
    relative_humidity = np.random.uniform(20.0, 80.0, num_samples)
    wind_speed = np.random.uniform(2.0, 25.0, num_samples)
    
    # Forecast data (mock 1-day forecast temp for simplicity)
    forecast_weather_data = maximum_temperature + np.random.normal(0, 1.0, num_samples)
    
    # IMD Heatwave Criteria rules roughly simulated
    # Heatwave: Max Temp >= 40 and Deviation >= 4.5
    # Severe Heatwave: Max Temp >= 40 and Deviation >= 6.4
    
    heatwave_label = []
    for m_temp, dev in zip(maximum_temperature, temp_deviation):
        if m_temp >= 40.0:
            if dev >= 6.4:
                heatwave_label.append("Severe Heatwave")
            elif dev >= 4.5:
                heatwave_label.append("Heatwave")
            else:
                heatwave_label.append("Normal")
        else:
            heatwave_label.append("Normal")
            
    df = pd.DataFrame({
        "maximum_temperature": np.round(maximum_temperature, 1),
        "seasonal_normal_temperature": np.round(seasonal_normal_temperature, 1),
        "temp_deviation": np.round(temp_deviation, 1),
        "relative_humidity": np.round(relative_humidity, 1),
        "wind_speed": np.round(wind_speed, 1),
        "forecast_weather_data": np.round(forecast_weather_data, 1),
        "heatwave_label": heatwave_label
    })
    
    return df

if __name__ == "__main__":
    df = generate_synthetic_data()
    os.makedirs("data", exist_ok=True)
    file_path = "data/heatwave_dataset.csv"
    df.to_csv(file_path, index=False)
    print(f"Dataset generated successfully at {file_path} with {len(df)} records.")
    print("Label distribution:")
    print(df['heatwave_label'].value_counts())
