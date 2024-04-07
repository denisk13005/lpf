'use client'
import React, { useRef } from 'react';

const Camera = () => {
  const videoRef = useRef(null);

  const handleStartCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { width: 128, height: 72 } }) // Vous pouvez spécifier des contraintes ici
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Erreur lors de l'accès à la caméra :", err);
        });
    }
  };

  // Styles pour l'encart vidéo
  const videoStyles = {
    width: '100%', // Prend la largeur complète de l'encart
    maxHeight: '400px', // Hauteur maximale pour l'encart vidéo
    objectFit: 'cover', // Ajuste le flux vidéo pour couvrir l'espace disponible, cela peut découper les bords du flux
    border: '3px solid #333', // Bordure pour l'encart
    borderRadius: '58px', // Bords arrondis pour l'encart

  };

  return (
    <div >
      test 1234567
      <video playsInline autoPlay style={videoStyles} ref={videoRef} />
      <button onClick={handleStartCamera}>Activer la caméra</button>
    </div>
  );
};

export default Camera;
