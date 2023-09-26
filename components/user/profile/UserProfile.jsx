'use client'
import React, { useState } from 'react';
import { useUserContext } from '/context/UserContext';
import { redirect } from 'next/navigation';
import styles from './styles.module.scss'
import Image from 'next/image';

const UserProfile = () => {
  const { user } = useUserContext();
  const [changeDescription, setChangeDescription] = useState(false)
  const [description, setDescription] = useState('')
  if (!user) {
    redirect('/login')
  }


  return (
    <div className={styles.userProfileContainer}>
      <h2>
        Bonjour, {user.name}
      </h2>
      <div className={styles.pictureContainer}>
        <Image src='/chien.jpg' fill alt="photo de profil de l'utilisateur " />
      </div>
      {
        changeDescription ? <textarea name="" id="" cols="30" rows="10" onChange={e => setDescription(e.target.value)}></textarea> :
          <div>{description}</div>
      }
      <button className={styles.btn} onClick={() => setChangeDescription(!changeDescription)}>{!changeDescription ? 'Ajouter une description' : 'enregistrer la description'}</button>
    </div>
  );
};

export default UserProfile;