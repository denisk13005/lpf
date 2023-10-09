'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation'

import axios from 'axios';
import { getImageUrl } from '@/lib/getImageUrl';


import defaultImage from '@/public/img/photo2.jpg'


import styles from './styles.module.scss'
function AddEvent() {
  // state local
  const [event, setEvent] = useState({
    name: "",
    date: "",
    description: "",
    picture: "",
    userId: ""
  })
  const [eventFormData, setEventFormData] = useState()
  const [imageSrc, setImageSrc] = useState('/home.jpg')
  const [today, setToday] = useState('')
  const { user, addUser } = useUserContext();
  const router = useRouter()


  useEffect(() => {
    setImageSrc(defaultImage)
    setEvent({ ...event, userId: user && user.id })

  }, [])




  const loadPicture = (e) => {
    console.log(e.target.files);
    const { name, value, files } = e.target;
    console.log(name, value, files);

    setImageSrc(getImageUrl(e).imageURL);
    setEvent({ ...event, picture: e.target.files[0] })

    console.log(files[0].name);


  }



  const postEvent = async ({ date, picture, description }) => {
    console.log(user);
    const formDataEventToSend = new FormData()
    formDataEventToSend.append('date', event.date)
    formDataEventToSend.append('description', event.description)
    formDataEventToSend.append('name', event.name)
    formDataEventToSend.append('userId', event.userId)
    formDataEventToSend.append('picture', event.picture)

    const response = await fetch('/api/events/postEvent', {
      method: 'POST',
      body: formDataEventToSend
    })
      .then(res => res.json()).then(data => data.status === 201 && router.push('/events'))
    console.log(event);


  }

  return (

    (

      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <h5>Ajouter un événement</h5>
          <div className={styles.eventInfosContainer}>
            <div className={`${styles.partEventContainer} ${styles.date}`}>
              <label htmlFor="date">Date de l'événement :</label>
              <input type="date" id='date' min={today} onChange={(e) => setEvent({ ...event, date: new Date(e.target.value) })} />
            </div>
            <div className={`${styles.partEventContainer} ${styles.picture} `}>
              <label htmlFor="picture">Ajouter une photo pour l'événement</label>
              <input type='file' name="picture" id='picture' style={{ position: 'absolute', bottom: '0px', left: '0px' }}
                refs='inputPicture' onChange={(e) => loadPicture(e)} />
              <div style={{ position: 'relative', height: '75%', background: 'white', boxShadow: '1px 1px 4px lightGrey' }}>

                <Image src={imageSrc} fill alt='image de l événement' />
              </div>
            </div>
            <div className={`${styles.partEventContainer} ${styles.description}`}>
              <label htmlFor="description">Description de l'événement</label>
              <textarea id='description' onChange={(e) => setEvent({ ...event, description: e.target.value })} />
            </div>
          </div>

          <button className={styles.btnValid} onClick={() => { postEvent({ date, picture, description }) }}>Ajouter l'événement</button>
        </div>
      </div>

    )

  )
}

export default AddEvent