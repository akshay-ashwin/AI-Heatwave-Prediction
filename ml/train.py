import os
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

from ml.preprocessing import load_and_preprocess_data
from ml.evaluate import evaluate_model, print_comparison_table

def main():
    print("Loading and preprocessing data...")
    X_train, X_test, y_train, y_test, _, _ = load_and_preprocess_data()
    
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "XGBoost": XGBClassifier(random_state=42)
    }
    
    results = []
    trained_models = {}
    
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train, y_train)
        trained_models[name] = model
        
        # Evaluate
        metrics = evaluate_model(name, model, X_test, y_test)
        results.append(metrics)
        
    best_model_name, df_results = print_comparison_table(results)
    
    # Save best model
    best_model = trained_models[best_model_name]
    os.makedirs("ml", exist_ok=True)
    joblib.dump(best_model, "ml/best_model.pkl")
    print(f"\nSaved {best_model_name} to ml/best_model.pkl")
    
    # Save results to a CSV for handoff
    df_results.to_csv("ml/model_results.csv", index=False)

if __name__ == "__main__":
    main()
