import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
import os
from datetime import datetime, timedelta

class SpoilagePredictor:
    def __init__(self, model_path='backend/ai/models/spoilage_rf.pkl'):
        self.model_path = model_path
        self.model = None
        # Rule-based fallback for Phase 1
        self.shelf_life_rules = {
            "Tomato": 7,
            "Onion": 20,
            "Banana": 5,
            "Potato": 30,
            "Leafy Greens": 3
        }

    def predict_remaining_days(self, crop_type, harvest_date_str, temp=25, humidity=60):
        """
        Predicts remaining days before spoilage using a mix of rules and ML.
        """
        # Step 1: Rule-based fallback (Phase 1)
        base_life = self.shelf_life_rules.get(crop_type, 10) # Default to 10 days
        
        # Step 2: Adjust based on temperature (Simple heuristic)
        # If temp is higher than 25C, life decreases; if lower, it increases.
        temp_adjustment = (25 - temp) * 0.1 # Very simple logic for demo
        adjusted_life = base_life + temp_adjustment
        
        # Step 3: Calculation from Harvest Date
        harvest_date = datetime.strptime(harvest_date_str, "%Y-%m-%d")
        days_since_harvest = (datetime.now() - harvest_date).days
        
        remaining_days = max(0, adjusted_life - days_since_harvest)
        
        spoilage_date = datetime.now() + timedelta(days=remaining_days)
        
        return {
            "crop_type": crop_type,
            "remaining_days": round(remaining_days, 1),
            "estimated_spoilage_date": spoilage_date.strftime("%Y-%m-%d"),
            "risk_level": "High" if remaining_days < 3 else "Low"
        }

    def train_model(self, data):
        """
        Phase 2: Train Random Forest when you have enough tabular data.
        """
        X = data[['temp', 'humidity', 'days_since_harvest']]
        y = data['actual_shelf_life']
        self.model = RandomForestRegressor(n_estimators=100)
        self.model.fit(X, y)
        joblib.dump(self.model, self.model_path)
