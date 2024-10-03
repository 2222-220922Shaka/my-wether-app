import React, { useState } from 'react';
import Search from './Search';
import Weather from './Weather';
import Forecast from './Forecast';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleWeatherFetch = async (city) => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    const apiKey = '5b23e9b4a0b9f75e0e14456844d790ee'; // Your API key

    try {
      // Fetch current weather data
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          setError("Sorry, that city does not exist. Please type a city again.");
        } else {
          setError("Please Enter city name");
        }
        setWeatherData(null);
        setForecastData(null); // Reset forecast data on error
      } else {
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        // Fetch 5-day forecast data
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      }
    } catch (error) {
      // Handle network error
      setError("No internet, please connect to the internet.");
      setWeatherData(null);
      setForecastData(null); // Reset forecast data on error
    }

    setLoading(false);
  };

  return (
    <div>
  <h1>Weather App</h1>
  <Search setWeatherData={setWeatherData} setError={setError} fetchWeather={handleWeatherFetch} />
  {loading && <p className="loading-message">Loading...</p>} {/* Apply the loading message class */}
  {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message in red */}
  {weatherData && <Weather data={weatherData} />}
  {forecastData && <Forecast data={forecastData} />} {/* Display forecast data */}
</div>

  );
};

export default App;
