'use client'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { LuSwitchCamera } from "react-icons/lu";
import { SiPhotobucket } from "react-icons/si";

import styles from './styles.module.scss';



const Camera = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    // Obtenir tous les dispositifs de capture vidéo
    console.log(navigator.mediaDevices)

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      console.log(devices, '----')
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log(videoDevices, 'video devices')
      setDevices(videoDevices);
      // Sélectionner par défaut la première caméra trouvée
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    });

  }, []);
  useEffect(() => {
    handleStartCamera(selectedDeviceId)
  }, [selectedDeviceId])

  const startCamera = (deviceId) => {
    if (navigator.mediaDevices) {
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
    console.log(event.target)
    setSelectedDeviceId(event.target.value);
    startCamera(event.target.value);
  };

  // Capture et affichage de la photo
  const [photo, setPhoto] = useState("");
  const handleTakePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL('image/png'));
  };

  const retakePicture = () => {
    setPhoto("")
    startCamera(selectedDeviceId)
  }

  return (
    <div className={styles.cameraContainer} >
      {/* {devices.map((device, index) => (
        <div>

          <   LuSwitchCamera key={device.deviceId} onClick={() => handleChangeCamera({ target: { value: device.deviceId } })} />

          <video playsInline autoPlay ref={videoRef} />
          <SiPhotobucket onClick={handleTakePhoto} />
        </div>
      ))} */}
      {photo ?
        <div className={styles.photoContainer}>

          <Image src={photo} alt="Capture" fill />
          <div className={styles.btnContainer}>

            <span className={styles.btn}>Valider</span><span className={styles.btn} onClick={retakePicture}>Reprendre la photo</span>
          </div>
        </div> :
        devices.map((device, index) => (
          <div key={index} className={styles.cameraPart}>

            <   LuSwitchCamera key={device.deviceId} onClick={() => handleChangeCamera({ target: { value: device.deviceId } })} />

            <video playsInline autoPlay ref={videoRef} />
            <SiPhotobucket onClick={handleTakePhoto} />
          </div>
        ))
      }
    </div >
  );
};

export default Camera;
