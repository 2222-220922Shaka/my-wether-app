import React from 'react';
import './App.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faDroplet } from '@fortawesome/free-solid-svg-icons';

const Weather = ({ data }) => {
  if (!data) return null;

  const { main, weather, name, wind, rain } = data;

  // Construct the icon URL
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  // Extract humidity, wind speed, and precipitation
  const humidity = main.humidity; // Humidity in percentage
  const windSpeed = wind.speed; // Wind speed in meters per second
  const precipitation = rain ? rain['1h'] : 0; // Precipitation in the last hour (if available)
  const precipitationPercentage = precipitation ? `${precipitation} mm` : '0 mm';

  // Round temperature to whole number and add a few degrees to make it feel warmer
  const roundedTemp = Math.round(main.temp) + 2; // Adjusted temperature

  return (
    <div className="weather-container">
      <h2>{name}</h2>
      <img src={iconUrl} alt={weather[0].description} style={{ width: '100px', height: '100px' }} />
      <h2 className="temperature"><strong>{roundedTemp} °C</strong></h2>
      <h3>{weather[0].description}</h3>
      <div className="weather-details">
        <div className="left-side">
          <h8>
            <span><FontAwesomeIcon icon={faDroplet} /></span> Humidity: <br/> {humidity} %
          </h8>
      
        </div>
        <div className="right-side">
          <p>
          <span><FontAwesomeIcon icon={faWind} /></span> Wind Speed: {(windSpeed * 3.6).toFixed(1)} km/h
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
