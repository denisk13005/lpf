'use client'
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// Exemple d'icône personnalisée avec une image de voiture
const carIcon = new L.Icon({
  iconUrl: '/money.png', // Chemin vers l'image de la voiture
  iconSize: [38, 38], // Taille de l'icône
  iconAnchor: [19, 38], // Point de l'icône qui correspond à la position du marqueur
  popupAnchor: [0, -38], // Point où la bulle d'info s'affiche par rapport au marqueur
});

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap(); // Accès à l'instance de la carte

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);

          // Centrer la carte sur la position actuelle
          map.setView([latitude, longitude], 18); // Le deuxième argument est le zoom
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
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={carIcon}>
      <Popup>Vous êtes ici avec une voiture</Popup>
    </Marker>
  );
};

const MapView = () => {
  // Centrage initial par défaut (au cas où la géolocalisation échoue)
  const defaultPosition = [51.505, -0.09];

  return (
    <MapContainer center={defaultPosition} zoom={18} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapView;
