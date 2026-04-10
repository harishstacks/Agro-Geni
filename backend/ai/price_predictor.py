import pandas as pd
from prophet import Prophet
import os

class PricePredictor:
    def __init__(self, model_path='backend/ai/models/prophet_model.json'):
        self.model_path = model_path
        self.model = None

    def train(self, data):
        """
        Trains the prophet model on historical price data.
        'data' should be a DataFrame with 'ds' (date) and 'y' (price).
        """
        self.model = Prophet(daily_seasonality=True, yearly_seasonality=True)
        self.model.fit(data)
        # In a real scenario, you'd save the model here.
        return self.model

    def predict(self, periods=30):
        """
        Predicts future prices for the given number of periods (days).
        """
        if self.model is None:
            return {"error": "Model not trained yet."}
        
        future = self.model.make_future_dataframe(periods=periods)
        forecast = self.model.predict(future)
        return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)

# Basic usage example:
# predictor = PricePredictor()
# data = pd.read_csv('historical_prices.csv')
# predictor.train(data)
# forecast = predictor.predict(30)
