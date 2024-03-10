'use client'

// Importez React et useState, useEffect pour gérer l'état et le cycle de vie du composant
import { useEffect, useRef, useState } from 'react';

function Camera() {
  // Utilisez useState pour stocker le flux vidéo
  const [stream, setStream] = useState(null);
  // Utilisez useRef pour accéder à l'élément vidéo dans le DOM
  const videoRef = useRef(null);

  useEffect(() => {
    async function enableStream() {
      try {
        // Demande d'accès à la caméra (video: true spécifie que nous voulons uniquement la vidéo, pas l'audio)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream); // Stockez le flux obtenu dans l'état du composant
        
        // Une fois le composant rendu, affectez le flux vidéo à l'élément vidéo
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        // Gérez les erreurs (par exemple, l'utilisateur refuse l'accès à la caméra)
        console.error("Erreur d'accès à la caméra:", err);
      }
    }

    // Appelez enableStream lors du montage du composant
    enableStream();

    // Fonction de nettoyage pour arrêter le flux vidéo lorsque le composant est démonté
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [stream]);

  // Rendu de l'élément vidéo
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}

export default Camera;
