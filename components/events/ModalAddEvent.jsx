'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import defaultImage from '@/public/img/photo2.jpg'


import styles from './styles.module.scss'
function ModalAddEvent({ showEventModal, close , addEvent}) {
    // state local
    const [date, setDate] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const [description, setDescription] = useState('')
    console.log(showEventModal)
    useEffect(() => {
        console.log(showEventModal)
    }, [showEventModal])
    useEffect(() => {
        setImageSrc(defaultImage)
    }, [])
    const loadPicture = (e) => {
        let value = (e.target)
        console.log(value, 'image src')
        close(true)
    }

    const handleSubmit = (close) => {
        console.log(date, imageSrc, description),
            () => close(true)


    }

    return (

        showEventModal &&
        (

            <div className={styles.modalOverlay}>
                <div className={styles.modalContainer}>
                    <h5>Ajouter un événement</h5>
                    <div className={styles.eventInfosContainer}>
                        <div className={`${styles.partEventContainer} ${styles.date}`}>
                            <label htmlFor="date">Date de l'événement :</label>
                            <input type="date" id='date' onChange={(e) => setDate(new Date(e.target.value).toLocaleDateString('fr-FR', {day :'numeric', month:'long', year:'numeric'}))} />
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
                    <button onClick={() => { handleSubmit(); close(true); addEvent({date,picture,description}) }}>valider</button>

                </div>
            </div>

        )

    )
}

export default ModalAddEvent