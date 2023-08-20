'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import styles from './styles.module.scss'

function EventTile({props}) {
  const router = useRouter()
    

  return (
    <article className={styles.tileContainer} onClick={() => router.push(`/events/${props.id}`)}>
        <h4 className={styles.eventDate}> {props.date}</h4>

          <div className={styles.imageContainer}>
            {
              props.picture !== null ?
              <Image src={props.picture} fill alt='image events'/> : ''
            }
        </div>
        <p className={styles.description}>{props.description}</p>

    </article>
  )
}

export default EventTile