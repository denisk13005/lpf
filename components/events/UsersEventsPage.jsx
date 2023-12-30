'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import { useUserContext } from '@/context/UserContext';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';



import EventTile from './EventTile'
import axios from 'axios'
import Loading from './Loading';
function UsersEventsPage() {
  const { user, addUser } = useUserContext();
  const [showEventModal, setShowEventModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [container, setContainer] = useState(styles.loading)

  const router = useRouter()
  const [events, setevents] = useState([])
  const getEvents = async () => {
    const res = await axios.get('/api/events/getEvents')
    console.log(res);
    const events = res.data
    console.log(events, '-----');
    setevents(events)
    events.length && setLoading(false)
  }
  useEffect(() => {
    setLoading(true)
    getEvents()
    console.log(user, 'user');
  }, [])

  useEffect(() => {
    loading ? setContainer(styles.loading) : setContainer(styles.eventsContainer)
  }, [loading])

  const close = (data) => {
    console.log(data, 'data')
    setShowEventModal(!data)
  }






  return (
    <div className={container}>

      <div style={{ position: 'relative' }}>

        <h1 className={styles.title}>Nos Evénements</h1>
        {
          (!loading && user && user.role === 'ADMIN') &&
          <button className={styles.btn} onClick={() => router.push('/events/addEvent')}>Ajouter un Evénement</button>

        }
      </div>

      {

        events.length ? (

          events.map((event, id) =>

            <EventTile props={event} key={id} />)
        ) :
          <div className={styles.skeletonContainer}>

            {/* <Loading /> */}
            <Stack spacing={5} >
              {user && user.role === 'ADMIN' &&
                <div style={{ width: '100%', height: '40px', margin: 'auto', display: 'flex', justifyContent: 'center' }}>

                  <Skeleton id={styles.skel} animation="wave" variant="rectangular" width={'80%'} height={40} />
                </div>
              }

              <Skeleton id={styles.skel} animation="wave" variant="rectangular" width={'100%'} height={300} />
              <Skeleton id={styles.skel} animation="wave" variant="rectangular" width={'100%'} height={300} />
              <Skeleton id={styles.skel} animation="wave" variant="rectangular" width={'100%'} height={300} />
              <Skeleton id={styles.skel} animation="wave" variant="rectangular" width={'100%'} height={300} />
              <Skeleton id={styles.skel} animation="wave" variant="rectangular" width={'100%'} height={300} />
              <Skeleton id={styles.skel} animation="wave" variant="rectangular" width={'100%'} height={300} />
            </Stack>
          </div>
      }





    </div>
  )
}

export default UsersEventsPage