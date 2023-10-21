'use client'
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useUserContext } from '/context/UserContext';
import { redirect } from 'next/navigation';
import styles from './styles.module.scss'
import { getImageUrl } from '@/lib/getImageUrl';
import Image from 'next/image';

const UserProfile = () => {
  const { user } = useUserContext();
  const [changeDescription, setChangeDescription] = useState(false)
  const [imageSrc, setImageSrc] = useState('/chien.jpg')
  const [description, setDescription] = useState('')
  const area = useRef(null)
  const picture = useRef(null)

  if (!user) {
    redirect('/login')
  }


  const changeDescriptionText = () => {
    setChangeDescription(!changeDescription)
  }
  const checkKeyPress = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      setChangeDescription(!changeDescription)
    }
  }
  const changePicture = (e) => {
    const input = e.target.children[0]
    if (input) {
      input.click()
      input.addEventListener('change', (e) => loadPicture(e))
    }
  }

  const updatePictureInDb = async (updatedPicture) => {
    console.log(user, updatedPicture);
    const formDataUserToUpdate = new FormData()
    formDataUserToUpdate.append('id', user.id)
    formDataUserToUpdate.append('picture', updatedPicture)
    const response = await fetch('/api/user/updateUserInfos', {
      method: 'PUT',
      body: formDataUserToUpdate
    })
  }

  const loadPicture = (e) => {
    console.log(e.target.files);
    setImageSrc(getImageUrl(e).imageURL);
    updatePictureInDb(e.target.files[0])


  }


  useEffect(() => {
    area.current.focus()
  }, [changeDescription])

  useEffect(() => {
    if (user.picture) {
      setImageSrc(`data:image/png;base64,${user.picture}`)
    }
  }, [user])


  return (
    <div className={styles.userProfileContainer}>
      <h2>
        Bonjour, {user.name}
      </h2>
      <Suspense fallback={"...loading..."} >

        <div className={styles.pictureContainer}>
          <Image className={styles.image} src={imageSrc} fill alt="photo de profil de l'utilisateur " ref={picture} />
        </div>
      </Suspense>

      <textarea ref={area} cols="30" rows="10" onChange={e => setDescription(e.target.value)} className={`${changeDescription ? '' : styles.hidden}`} onKeyUp={(e) => checkKeyPress(e)}></textarea>
      <div className={`${!changeDescription ? '' : styles.hidden}`}>{description}</div>
      <div className={styles.btnsContainer}>


        <button className={styles.btn} onClick={changePicture}>Ajouter ou modifier ma photo <input type='file' /></button>

        <button className={styles.btn} onClick={() => changeDescriptionText()}>{!changeDescription ? (description.length ? 'Modifier la description' : 'Ajouter une description') : 'enregistrer la description'}</button>
      </div>
    </div>
  );
};

export default UserProfile;