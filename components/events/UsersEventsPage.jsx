'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import { useUserContext } from '@/context/UserContext';

import EventTile from './EventTile'
import data from '@/mocks/eventsMock.json'
import ModalAddEvent from './ModalAddEvent';

function UsersEventsPage() {
  const { user, addUser } = useUserContext();
  const [showEventModal, setShowEventModal] = useState(false)

  const router = useRouter()
  const [events, setevents] = useState([])
  useEffect(() => {
    setevents(data.events)
    user ? user.role = 'ADMIN' : null
  }, [])
  useEffect(() => {
    console.log(showEventModal)
  }, [showEventModal])

  const close = (data) => {
    console.log(data,'data')
    setShowEventModal(!data)
  }

  const addEvent = ({ date, picture, description }) => {
    console.log(date, picture, description, '---')
    events.push({
      "id": 3,
      "name": "1er event",
      "date": date,
      "description": description,
      "picture": "https://images.unsplash.com/photo-1545048702-79362596cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5vZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "userId": 1
    })
  } 


  return (
    <div className={styles.eventsContainer}>
      <ModalAddEvent showEventModal={showEventModal} close={close} addEvent={addEvent} />
      <div style={{ position: 'relative' }}>

        <h1 className={styles.title}>Nos Evénements</h1>
        {
          // (user && user.role === 'ADMIN') &&
          <button className={styles.btn} onClick={() => setShowEventModal(true)}>Ajouter un événement</button>

        }
      </div>
      {
        events.map((event,id) => (

          <EventTile props={event} key={id} />
        ))
      }

    </div>
  )
}

export default UsersEventsPage