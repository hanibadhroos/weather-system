import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchLocation = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&accept-language=ar`
      );
      setSuggestions(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error searching location:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchLocation(query);
  };

  const handleSelect = (location) => {
    const { lat, lon, display_name } = location;
    onLocationSelect({
      lat: parseFloat(lat),
      lng: parseFloat(lon),
      name: display_name
    });
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن مدينة أو منطقة..."
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'جاري البحث...' : 'بحث'}
        </button>
      </form>
      
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSelect(item)}
            >
              {item.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;