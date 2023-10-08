'use client'
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useUserContext } from '/context/UserContext';
import { redirect } from 'next/navigation';
import styles from './styles.module.scss'
import Image from 'next/image';

const UserProfile = () => {
  const { user } = useUserContext();
  const [changeDescription, setChangeDescription] = useState(false)
  const [description, setDescription] = useState('')
  const area = useRef(null)
  const picture = useRef(null)

  const changeDescriptionText = () => {
    setChangeDescription(!changeDescription)
  }
  const checkKeyPress = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      setChangeDescription(!changeDescription)
    }
  }
  const changePicture = () => {

  }
  useEffect(() => {
    area.current.focus()
  }, [changeDescription])
  if (!user) {
    redirect('/login')
  }


  return (
    <div className={styles.userProfileContainer}>
      <h2>
        Bonjour, {user.name}
      </h2>
      <Suspense fallback={"...loading..."} >

        <div className={styles.pictureContainer}>
          <Image className={styles.image} src='/chien.jpg' fill alt="photo de profil de l'utilisateur " ref={picture} />
        </div>
      </Suspense>

      <textarea ref={area} cols="30" rows="10" onChange={e => setDescription(e.target.value)} className={`${changeDescription ? '' : styles.hidden}`} onKeyUp={(e) => checkKeyPress(e)}></textarea>
      <div className={`${!changeDescription ? '' : styles.hidden}`}>{description}</div>
      <div className={styles.btnsContainer}>


        <button className={styles.btn} onClick={() => changePicture()}>Ajouter ou modifier ma photo</button>

        <button className={styles.btn} onClick={() => changeDescriptionText()}>{!changeDescription ? (description.length ? 'Modifier la description' : 'Ajouter une description') : 'enregistrer la description'}</button>
      </div>
    </div>
  );
};

export default UserProfile;