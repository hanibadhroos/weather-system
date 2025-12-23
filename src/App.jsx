import React, { useState } from 'react';
import MapComponent from './Components/MapComponent' ;
import WeatherDisplay from './Components/WeatherDisplay';
import SearchBar from './Components/SearchBar';
import './App.css';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    fetchWeatherData(location.lat, location.lng);
  };

  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b24c2726a7e68b3a177416e4ae70356e&units=metric&lang=ar`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>تطبيق حالة الطقس التفاعلي</h1>
      </header>
      
      <div className="container">
        <SearchBar onLocationSelect={handleLocationSelect} />
        
        <div className="main-content">
          <div className="map-container">
            <MapComponent 
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
            />
          </div>
          
          <div className="weather-container">
            <WeatherDisplay 
              weatherData={weatherData}
              loading={loading}
              selectedLocation={selectedLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;