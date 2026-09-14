from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import pandas as pd

def evaluate_model(model_name, model, X_test, y_test):
    y_pred = model.predict(X_test)
    
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    rec = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)
    
    return {
        "Model": model_name,
        "Accuracy": acc,
        "Precision": prec,
        "Recall": rec,
        "F1 Score": f1
    }

def print_comparison_table(results):
    df = pd.DataFrame(results)
    print("\n--- Model Comparison ---")
    print(df.to_string(index=False))
    
    best_model_idx = df['F1 Score'].idxmax()
    best_model_name = df.loc[best_model_idx, 'Model']
    print(f"\nBest Model = {best_model_name}")
    
    return best_model_name, df
