"use client"

import { useState, useEffect } from 'react'
import { format } from 'date-fns'

type EventType = {
    eventID: number,
    eventName: string,
    eventDate: Date,
    eventEndDate: Date,
    eventDetails: string
}

export default function TimelineEntries() {
    const [retrievedEvents, setEvents] = useState<EventType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('../../api/timeline/newEvent', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
    
                if (response.ok) {
                    const data = await response.json()
                    setEvents(data.events)
                } else {
                    console.error('Failed to fetch events')
                }
            } catch (error) {
                console.error('Error fetching events: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchEvents()
    }, [])

    console.log(retrievedEvents)

    return (
        <div className='bg-gray-400 place-self-center mx-12'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>End Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    {retrievedEvents && retrievedEvents.length > 0 ? (
                        retrievedEvents.map((event) => (
                            <tr key={event.eventID}>
                            <td>{event.eventID}</td>
                            <td>{event.eventName}</td>
                            <td>{format(event.eventDate, 'yyyy-MM-dd')}</td>
                            <td>{format(event.eventEndDate, 'yyyy-MM-dd')}</td>
                            <td>{event.eventDetails}</td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td className='col-span-5'>No events found</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

function isValidDate(date: Date): boolean {
    // Check if the date is a valid JavaScript Date object
    return date instanceof Date && !isNaN(date.getTime());
}