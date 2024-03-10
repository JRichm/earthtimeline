"use client"

import { useEffect, useState } from 'react'
import { Josefin_Sans } from "next/font/google";
import TimelineEntries from "../components/timelineEntries";

const josefin = Josefin_Sans({ subsets: ["latin"] })

type EventType = {
    eventID: number,
    eventName: string,
    eventDate: Date,
    eventEndDate: Date,
    eventDetails: string
}

export default function TimelinePage() {
    
    const [retrievedEvents, setEvents] = useState<EventType[]>([])
    const [loading, setLoading] = useState(true)

    console.log("timeline page")

    useEffect(() => {

        console.log("use effect")
        const fetchEvents = async () => {
            try {
                const response = await fetch('../../api/timeline/newEvent', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                console.log("response")
                console.log(response)
    
                if (response.ok) {
                    const data = await response.json()
                    const sortedEvents = data.events.sort((a: EventType, b: EventType) => {
                        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
                    })
                    setEvents(sortedEvents)
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

    // set date variables
    const time = new Date();

    const startDate = retrievedEvents.length > 0 ? new Date(retrievedEvents[0].eventDate) : new Date();
    const endDate = retrievedEvents.length > 0 ? new Date(retrievedEvents[retrievedEvents.length - 1].eventDate) : new Date();
    const totalDays = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)

    const TimelineEvent: React.FC<{ event: EventType }> = ({ event }) => {
        const eventDays = (new Date(event.eventDate).getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
        const positionPercent = (eventDays / totalDays) * 100

        return (
            <div key={event.eventName} className="absolute w-[10px] h-[10px] bg-blue-500 rounded-full translate-x-[-50%] cursor-pointer transition-all" style={{ left: `${positionPercent}%`,zIndex: 2 }}>
              <div>
                <p>{event.eventName}</p>
              </div>
            </div>
        )
    }
  
    console.log(startDate)

    const eventTypes = [
        "Art",
        "Discoveries",  
        "Political Events",
        "Astronomy",
        "Wars",
        "Inventions",
        "Disasters",
        "Epidemics"
    ]

    const TimlineComponent = () => {
        return (
            <div className="bg-gray-400 p-2">
                <div className="bg-gray-100 flex flex-col">
                    <div className="flex flex-row mt-8 mb-2">
                        {/* event type label column */}
                        <div className="flex flex-col pl-10 pr-3">
                            {
                                eventTypes && 
                                    eventTypes.map((eventType) => (
                                        <p key={eventType} className="h-6 text-nowrap text-right align-middle">{eventType}</p>
                                    ))
                            }
                            <p className="h-6 text-nowrap text-right align-middle">default</p>
                        </div>

                        {/* timeline */}
                        <div className="w-full mr-5">
                            <div className="flex flex-col w-full border-l border-r">
                                {
                                    eventTypes &&
                                        eventTypes.map((eventType) => (
                                            <div key={eventType} className="h-6 flex place-items-center">
                                                <hr className="h-0 w-full" />
                                            </div>
                                        ))
                                }
                                
                                <div key={"default"} className="h-6 flex place-items-center">
                                    <hr className="h-0 w-full" />
                                    <div className='h-[50px] flex align-items-center'>
                                        {
                                            retrievedEvents.map((event: EventType) => (
                                                <TimelineEvent key={event.eventID} event={event} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* date key */}
                            <div className="flex flex-row mt-5 justify-between w-full">
                                <div className="flex flex-col">
                                    <div className="border-l-2 h-4 border-gray-600"></div>
                                    <p className="">{startDate.getFullYear()}</p>
                                </div>

                                <div className="flex flex-col">
                                    <div className="border-l-2 h-4 border-gray-600"></div>
                                    <p className="">{endDate.getFullYear()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="bg-gray-300 min-h-screen p-12">
            <div className="flex justify-end">
                <a href="/timeline/new" className="bg-green-500 px-3 py-1 rounded text-white">new</a>
            </div>
            <h1 className={`text-3xl text-center font-bold tracking-[3px] ${josefin.className}`}>Timeline of Earths History</h1>
            <div className="my-12">
                <TimlineComponent />
            </div>
            <h1 className={`text-3xl text-center font-bold tracking-[3px] ${josefin.className}`}>Events Table</h1>
            <div>
                <TimelineEntries />
            </div>
        </main>
    )
}