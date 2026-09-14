import pandas as pd
from sklearn.model_selection import train_test_split

def load_and_preprocess_data(filepath="data/heatwave_dataset.csv"):
    df = pd.read_csv(filepath)
    
    if "temp_deviation" not in df.columns:
        df["temp_deviation"] = df["maximum_temperature"] - df["seasonal_normal_temperature"]
    
    df = df.dropna()
    
    label_map = {"Normal": 0, "Heatwave": 1, "Severe Heatwave": 2}
    df["heatwave_label_encoded"] = df["heatwave_label"].map(label_map)
    
    features = ["maximum_temperature", "relative_humidity", "wind_speed", "temp_deviation"]
    X = df[features]
    y = df["heatwave_label_encoded"]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    return X_train, X_test, y_train, y_test, X, y
