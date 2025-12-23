import React from 'react';

const WeatherDisplay = ({ weatherData, loading, selectedLocation }) => {
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getArabicDescription = (weather) => {
    const descriptions = {
      'clear sky': 'سماء صافية',
      'few clouds': 'قليل من السحب',
      'scattered clouds': 'سحب متفرقة',
      'broken clouds': 'سحب متناثرة',
      'shower rain': 'مطر خفيف',
      'rain': 'مطر',
      'thunderstorm': 'عاصفة رعدية',
      'snow': 'ثلج',
      'mist': 'ضباب',
      'overcast clouds': 'غائم جزئياً'
    };
    return descriptions[weather.toLowerCase()] || weather;
  };

  if (loading) {
    return (
      <div className="weather-display loading">
        <div className="spinner"></div>
        <p>جاري تحميل بيانات الطقس...</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="weather-displace">
        <div className="welcome-message">
          <h2>مرحباً!</h2>
          <p>اختر موقعاً على الخريطة للاطلاع على حالة الطقس</p>
        </div>
      </div>
    );
  }

  if (weatherData.cod !== 200) {
    return (
      <div className="weather-display error">
        <p>حدث خطأ في جلب بيانات الطقس</p>
      </div>
    );
  }

  return (
    <div className="weather-display">
      <div className="weather-header">
        <h2>{weatherData.name}</h2>
        {selectedLocation?.name && (
          <p className="location-name">{selectedLocation.name}</p>
        )}
      </div>
      
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{Math.round(weatherData.main.temp)}°</span>
          <span className="temp-unit">مئوية</span>
        </div>
        
        <div className="weather-icon">
          <img 
            src={getWeatherIcon(weatherData.weather[0].icon)} 
            alt={weatherData.weather[0].description}
          />
          <p className="weather-description">
            {getArabicDescription(weatherData.weather[0].description)}
          </p>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">الرطوبة:</span>
          <span className="detail-value">{weatherData.main.humidity}%</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">سرعة الرياح:</span>
          <span className="detail-value">{weatherData.wind.speed} م/ث</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">الضغط:</span>
          <span className="detail-value">{weatherData.main.pressure} hPa</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">الدرجة القصوى:</span>
          <span className="detail-value">{Math.round(weatherData.main.temp_max)}°</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">الدرجة الدنيا:</span>
          <span className="detail-value">{Math.round(weatherData.main.temp_min)}°</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;