'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation'

import axios from 'axios';


import defaultImage from '@/public/img/photo2.jpg'


import styles from './styles.module.scss'
function AddEvent() {
  // state local
  const [date, setDate] = useState('')
  const [imageSrc, setImageSrc] = useState('/home.jpg')
  const [description, setDescription] = useState('')
  const [today, setToday] = useState('')
  const { user, addUser } = useUserContext();
  const router = useRouter()


  useEffect(() => {
    setImageSrc(defaultImage)

    console.log(user);
  }, [])

  const loadPicture = (e) => {


    let value = e.target.files[0]
    console.log(value);
    if (value) {
      if (value.type !== 'image/jpeg' && value.type !== 'image/jpg' && value.type !== 'image/svg' && value.type !== 'image/png') {
        alert('image non supportée, veuillez choisir une image avec une extension .jpg, .png ou .svg')
        return
      }
      if (value.size > 512000) {
        alert('image trop lourde max:500 ko')
        return
      }
      else {


        var imageURL = URL.createObjectURL(value); // Créez une URL pour le fichier


        // Mettez à jour l'attribut src de l'élément <img> avec l'URL de l'image
        setImageSrc(imageURL);
      }
    }
  }

  const postEvent = async ({ date, picture, description }) => {
    console.log(user);
    const event = await axios.post('/api/events/postEvent', {
      "name": "1er event",
      "date": date,
      "description": description,
      "picture": "https://images.unsplash.com/photo-1545048702-79362596cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5vZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "userId": user.id
    }).then(res => res.status === 200 && router.push('/events'))



  }

  return (

    (

      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <h5>Ajouter un événement</h5>
          <div className={styles.eventInfosContainer}>
            <div className={`${styles.partEventContainer} ${styles.date}`}>
              <label htmlFor="date">Date de l'événement :</label>
              <input type="date" id='date' min={today} onChange={(e) => setDate(new Date(e.target.value))} />
            </div>
            <div className={`${styles.partEventContainer} ${styles.picture} `}>
              <label htmlFor="picture">Ajouter une photo pour l'événement</label>
              <input type='file' id='picture' style={{ position: 'absolute', bottom: '0px', left: '0px' }}
                refs='inputPicture' onChange={(e) => loadPicture(e)} />
              <div style={{ position: 'relative', height: '75%', background: 'white', boxShadow: '1px 1px 4px lightGrey' }}>

                <Image src={imageSrc} fill alt='image de l événement' />
              </div>
            </div>
            <div className={`${styles.partEventContainer} ${styles.description}`}>
              <label htmlFor="description">Description de l'événement</label>
              <textarea id='description' onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <button className={styles.btnValid} onClick={() => { postEvent({ date, picture, description }) }}>Ajouter l'événement</button>
        </div>
      </div>

    )

  )
}

export default AddEvent