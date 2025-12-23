import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// استيراد الصور مباشرة
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// إصلاح أيقونات الـ marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const LocationMarker = ({ onLocationSelect, selectedLocation }) => {
  const [position, setPosition] = useState(selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : [24.7136, 46.6753]);
  
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect({ lat, lng });
    },
  });

  useEffect(() => {
    if (selectedLocation) {
      setPosition([selectedLocation.lat, selectedLocation.lng]);
      map.setView([selectedLocation.lat, selectedLocation.lng], 12);
    }
  }, [selectedLocation, map]);

  return position ? (
    <Marker position={position}>
      <Popup>الموقع المحدد</Popup>
    </Marker>
  ) : null;
};

const MapComponent = ({ onLocationSelect, selectedLocation }) => {
  return (
    <MapContainer
      center={[24.7136, 46.6753]}
      zoom={8}
      style={{ height: '500px', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker 
        onLocationSelect={onLocationSelect} 
        selectedLocation={selectedLocation}
      />
    </MapContainer>
  );
};

export default MapComponent;