'use client'
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Erreur lors de l'obtention de la position :", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  }, []);

  const customIcon = new L.Icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    iconSize: [38, 95], // taille de l'icône
    iconAnchor: [22, 94], // point de l'icône qui correspond à la position du marker
    popupAnchor: [-3, -76], // point où la bulle s'ouvre par rapport à l'iconAnchor
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>Vous êtes ici</Popup>
    </Marker>
  );
};

const MapView = () => {
  const [mapCenter, setMapCenter] = useState([43.3, 5.4]); // Coordonnées par défaut (Londres)

  return (
    <MapContainer center={mapCenter} zoom={15} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapView;
