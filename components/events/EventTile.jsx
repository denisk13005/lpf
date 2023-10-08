'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './styles.module.scss'

function EventTile({ props }) {
  const router = useRouter()
  const [imgData, setImgData] = useState(null)



  return (
    <article className={styles.tileContainer} onClick={() => router.push(`/events/${props.id}`)}>
      <h4 className={styles.eventDate}> {
        new Date(props.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      }</h4>

      <div className={styles.imageContainer}>
        {
          props.picture !== null ?
            <Image src={`data:image/png;base64,${props.picture}`} fill alt='image events' /> : ''
        }
      </div>
      <p className={styles.description}>{props.description}</p>

    </article>
  )
}

export default EventTile