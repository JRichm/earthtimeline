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
        <div className='bg-gray-400 place-self-center p-2'>
            <div className='bg-gray-100'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b'>
                                <th className='w-24'>ID</th>
                                <th className='w-80'>Name</th>
                                <th>Date</th>
                                <th>End Date</th>
                                <th className=''>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {retrievedEvents && retrievedEvents.length > 0 ? (
                                retrievedEvents.map((event) => (
                                    <tr key={event.eventID} className='text-center'>
                                        <td className='w-24 align-top'>{event.eventID}</td>
                                        <td className='w-80 text-start align-top'>{event.eventName}</td>
                                        <td className='align-top'>{format(event.eventDate, 'yyyy-MM-dd')}</td>
                                        <td className='align-top'>{format(event.eventEndDate, 'yyyy-MM-dd')}</td>
                                        <td className='text-start align-top max-w-[250px]'>{event.eventDetails}</td>
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
        </div>
    )
}

function isValidDate(date: Date): boolean {
    // Check if the date is a valid JavaScript Date object
    return date instanceof Date && !isNaN(date.getTime());
}