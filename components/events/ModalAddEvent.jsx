'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import defaultImage from '@/public/img/photo2.jpg'


import styles from './styles.module.scss'
function ModalAddEvent({ showEventModal, close , addEvent}) {
    // state local
    const [date, setDate] = useState('')
    const [imageSrc, setImageSrc] = useState('../../public/home.jpg')
    const [description, setDescription] = useState('')
    const [today, setToday] = useState('')
    console.log(showEventModal)
    useEffect(() => {
        console.log(showEventModal)
    }, [showEventModal])
    useEffect(() => {
        setImageSrc(defaultImage)


        console.log(today);
        setToday(new Date().getFullYear()+'-'+( new Date().getMonth() + 1)+'-'+ new Date().getDate())
        console.log(today);
    }, [])
    useEffect(() => {
       
        // console.log(t);
        // let l = t[t.length-1]
        // t.splice(2)
        // console.log(t);
        // t.splice(1,0,l)
        // console.log(t);
        // setToday(t[0]+'-'+ t[1]+'-'+t[2])
       
    }, [date])
    
    const loadPicture = (e) => {
        

        let value =e.target.files[0]
        console.log(value);
        if (value) {
            if(value.type !==  'image/jpeg'  && value.type !=='image/jpg' && value.type !== 'image/svg' && value.type !==  'image/png' ){
                alert('image non supportée, veuillez choisir une image avec une extension .jpg, .png ou .svg')
                return
            }
            if(value.size > 512000){
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
                            <input type="date" id='date' min= {today} onChange={(e) => setDate(new Date(e.target.value))} />
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

                    <button className={styles.btnValid} onClick={() => { handleSubmit(); close(true); addEvent({date,picture,description}) }}>Ajouter l'événement</button>
                </div>
            </div>

        )

    )
}

export default ModalAddEvent