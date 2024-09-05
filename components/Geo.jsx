'use client'
import L from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// Icône personnalisée pour la voiture
const carIcon = new L.Icon({
  iconUrl: '/money.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});
const location
  = new L.Icon({
    iconUrl: '/location.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  })
// Composant pour afficher un marqueur à une position donnée
const LocationMarker = ({ position, text, icon }) => {
  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>{text}</Popup>
    </Marker>
  );
};

// Composant pour gérer la géolocalisation
const MapView = () => {
  const [currentPosition, setCurrentPosition] = useState(null); // Position actuelle
  const [addressPosition, setAddressPosition] = useState(null); // Position géocodée
  const [address, setAddress] = useState(''); // Adresse saisie par l'utilisateur

  // Fonction pour géolocaliser l'utilisateur et centrer la carte
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = [latitude, longitude];
          setCurrentPosition(newPosition);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          alert("Impossible d'obtenir la géolocalisation.");
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  };

  // Fonction pour centrer la carte sur une position
  const SetMapCenter = ({ position }) => {
    const map = useMap();
    if (position) {
      map.setView(position, 13);
    }
    return null;
  };

  // Fonction pour géocoder une adresse à l'aide de Nominatim
  const geocodeAddress = async () => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      const newPosition = [parseFloat(lat), parseFloat(lon)];
      setAddressPosition(newPosition);
    } else {
      alert('Adresse introuvable.');
    }
  };

  return (
    <div style={{ position: "relative", height: "500px", width: "100%" }}>
      {/* Texte superposé avec les boutons */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        padding: "10px",
        borderRadius: "5px",
        width: "250px",
      }}>
        <h3>Carte interactive</h3>
        <button onClick={handleGeolocation} style={{ marginBottom: "10px", width: '100%' }}>
          Signaler ma position actuelle
        </button>

        {/* Champ texte pour entrer une adresse */}
        <div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Entrez une adresse"
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button onClick={geocodeAddress} style={{ width: "100%" }}>
            Localiser l'adresse
          </button>
        </div>
      </div>

      {/* Carte Leaflet */}
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Centrer la carte sur la position actuelle */}
        {currentPosition && <SetMapCenter position={currentPosition} />}
        {/* Centrer la carte sur la position géocodée */}
        {addressPosition && <SetMapCenter position={addressPosition} />}

        {/* Marqueur pour la position actuelle */}
        <LocationMarker position={currentPosition} text="Votre voiture est garé ici" icon={location} />

        {/* Marqueur pour la position géocodée */}
        <LocationMarker position={addressPosition} text="La voiture " icon={carIcon} />
      </MapContainer>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <h1>Carte avec position actuelle et géocodage d'adresse</h1>
      <MapView />
    </div>
  );
}

