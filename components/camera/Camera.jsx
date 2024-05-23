'use client'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { LuSwitchCamera } from "react-icons/lu";
import { SiPhotobucket } from "react-icons/si";

import styles from './styles.module.scss';



const Camera = ({ getUrl }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [cameraChoosen, setCameraChoosen] = useState(0)
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
        setSelectedDeviceId(videoDevices[cameraChoosen].deviceId);
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
    if (cameraChoosen <= devices.length) {
      setCameraChoosen(cameraChoosen + 1)
    } else {
      setCameraChoosen(0)

    }


    setSelectedDeviceId(devices[cameraChoosen].deviceId);

  };

  // Capture et affichage de la photo
  const [photo, setPhoto] = useState("");
  const handleTakePhoto = () => {
    console.log('ici')
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL('image/png'));

  };
  useEffect(() => {
    console.log(photo)
  }, [photo])

  const retakePicture = () => {
    setPhoto("")
    startCamera(devices[1])
  }
  const validate = () => {
    getUrl(photo)
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

            <span className={styles.btn} onClick={validate}>Valider</span>
            <span className={styles.btn} onClick={retakePicture}>Reprendre la photo</span>
          </div>
        </div> :



        <div className={styles.cameraPart}>

          <LuSwitchCamera onClick={handleChangeCamera} className={styles.changeBtn} />

          <video playsInline autoPlay ref={videoRef} className={styles.video} />
          <SiPhotobucket onClick={handleTakePhoto} className={styles.takePhotoBtn} />
        </div>

      }
    </div >
  );
};

export default Camera;
