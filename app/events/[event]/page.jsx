'use client'
import React, { useEffect, useState } from 'react'
import data from '@/mocks/eventsMock.json'

function Event({ params }) {
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({})
    useEffect(() =>{
        setEvents(data.events)
    },[])
    useEffect(() => {
        const event = events.filter(el => el.id === parseInt(params.event))
        setEvent(event)
        console.log(events, event, params.event,'------')
        
    }, [events])
    return (

        <div>


            <div>{event[0] && event[0].date}</div>
            <div>{event[0] && event[0].description}</div>
        </div>
    )
}

export default Event