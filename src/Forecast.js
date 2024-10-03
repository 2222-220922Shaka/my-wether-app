import React from 'react';
import './App.css'; // Import the CSS file

const Forecast = ({ data }) => {
  // Group forecast data by date
  const forecastItems = data.list.filter(item => item.dt_txt.includes('12:00:00')); // Only get midday forecasts

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-items">
        {forecastItems.map(item => (
          <div key={item.dt} className="forecast-item">
            <h3>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
            <img 
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} 
              alt={item.weather[0].description} 
              className="weather-icon" 
            />
            <p className="forecast-temp">
              Temp: {Math.round(item.main.temp)} °C
            </p> {/* Display rounded temperature with class */}
            <p>Weather: {item.weather[0].ddescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
