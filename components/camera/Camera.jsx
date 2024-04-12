'use client'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { LuSwitchCamera } from "react-icons/lu";
import { SiPhotobucket } from "react-icons/si";


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
    handleStartCamera()
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
    <div style={{ backgroundColor: 'red', height: '100%', width: '100%', position: 'relative' }}>
      {devices.map((device, index) => (
        <   LuSwitchCamera style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(-50%)', fontSize: '4dvh' }} key={device.deviceId} onClick={() => handleChangeCamera({ target: { value: device.deviceId } })} />

      ))}
      <video playsInline autoPlay ref={videoRef} style={{ height: '100%', zIndex: 9 }} />
      <SiPhotobucket style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%)', fontSize: '8dvh', zIndex: 10, display: 'inline-block' }} onClick={handleTakePhoto} />
      {photo && <Image style={{ position: 'absolute', bottom: 0 }} src={photo} alt="Capture" fill />}
    </div>
  );
};

export default Camera;
