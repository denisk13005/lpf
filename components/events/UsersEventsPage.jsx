'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import { useUserContext } from '@/context/UserContext';

import EventTile from './EventTile'
import data from '@/mocks/eventsMock.json'
import ModalAddEvent from './ModalAddEvent';
import axios from 'axios';

function UsersEventsPage() {
  const { user, addUser } = useUserContext();
  const [showEventModal, setShowEventModal] = useState(false)

  const router = useRouter()
  const [events, setevents] = useState([])
  const getEvents = async () => {
    const res = await axios.get('/api/events/getEvents')
    console.log(res);
    const events = res.data
    console.log(events, '-----');
    setevents(events)
  }
  useEffect(() => {
    getEvents()
    console.log(user, 'user');
  }, [])

  const close = (data) => {
    console.log(data, 'data')
    setShowEventModal(!data)
  }




  return (
    <div className={styles.eventsContainer}>

      <div style={{ position: 'relative' }}>

        <h1 className={styles.title}>Nos Evénements</h1>
        {
          (user && user.role === 'ADMIN') &&
          <button className={styles.btn} onClick={() => router.push('/events/addEvent')}>Ajouter un Evénement</button>

        }
      </div>
      {
        events.map((event, id) => (

          <EventTile props={event} key={id} />
        ))
      }

    </div>
  )
}

export default UsersEventsPage