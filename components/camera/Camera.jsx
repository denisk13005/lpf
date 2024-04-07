'use client'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const Camera = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    // Obtenir tous les dispositifs de capture vidéo
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      // Sélectionner par défaut la première caméra trouvée
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    });
  }, []);

  const startCamera = (deviceId) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } }
      })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Erreur lors de l'accès à la caméra:", err);
        });
    }
  };

  const handleStartCamera = () => {
    startCamera(selectedDeviceId);
  };

  // Gérer le changement de caméra sélectionnée
  const handleChangeCamera = (event) => {
    setSelectedDeviceId(event.target.value);
    startCamera(event.target.value);
  };

  // Capture et affichage de la photo
  const [photo, setPhoto] = useState("");
  const handleTakePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 50;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL('image/png'));
  };

  return (
    <div>
      {devices.map((device, index) => (
        <button key={device.deviceId} onClick={() => handleChangeCamera({ target: { value: device.deviceId } })}>
          Caméra {index + 1}
        </button>
      ))}
      <video playsInline autoPlay ref={videoRef} />
      <button onClick={handleStartCamera}>Activer la caméra</button>
      <button onClick={handleTakePhoto}>Prendre une photo</button>
      {photo && <Image src={photo} alt="Capture" fill />}
    </div>
  );
};

export default Camera;
