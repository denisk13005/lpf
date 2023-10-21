'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton';
import { IoIosArrowDropleftCircle } from 'react-icons/io';



import styles from './styles.module.scss'

function Event({ params }) {
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({})
    const [imgSrc, setImgSrc] = useState('')
    useEffect(() => {
        console.log(params.event);
        getEvent(params.event)
    }, [])
    useEffect(() => {
        const event = events.filter(el => el.id === parseInt(params.event))
        setEvent(event)


    }, [events])
    const getEvent = async (id) => {
        const response = await axios.get(`/api/events/getEvents?id=${id}`)
        const event = await response.data
        setEvent(event)
        event && getImgUrl(event)


    }

    const getImgUrl = (evt) => {
        if (evt[0].picture !== null) {
            setImgSrc(`data:image/png;base64,${evt[0].picture}`)
        } else {
            setImgSrc('/home.jpg')
        }
    }
    return (

        <div className={styles.eventContainer}>

            {

                <div className={styles.partContainer}>
                    <div style={{ position: 'relative' }}>
                        <Link href="/events">
                            <span style={{ position: 'absolute', left: '15px', top: '-2px', fontSize: '24px', cursor: 'pointer' }}>    <IoIosArrowDropleftCircle />
                            </span>
                        </Link>
                        <h3>Information sur l'événement </h3>
                    </div>


                    {
                        event[0] ?
                            <>

                                <div className={styles.datePart}>{new Date(event[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>

                                <div className={styles.picturePart}>
                                    <Image src={imgSrc} fill alt='event image' />

                                </div>
                                <div className={styles.descriptionPart}>{event[0].description}</div>

                            </>
                            :
                            <div className={styles.picturePart}>
                                <Skeleton width={'100%'} height={'100%'} />

                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default Event