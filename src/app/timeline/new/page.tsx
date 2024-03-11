"use client"

import { Josefin_Sans } from 'next/font/google'
import { useState, FormEvent } from 'react'

const josefin = Josefin_Sans({ subsets: ["latin"] })

export default function NewTimelineItemPage() {

    const [eventErrors, setErrors] = useState(["", "", "", "", ""])
    const [isMultiDateEvent, setIsMultiDateEvent] = useState(false)


    function HandleCheckBoxChange() {
        setIsMultiDateEvent(!isMultiDateEvent)
    }

    async function HandleSubmit(e: FormEvent<HTMLFormElement>) {
        // dont refresh page when submitting form
        e.preventDefault()

        // gather input
        const formData = new FormData(e.target as HTMLFormElement)
        const formDataObject = {
            eventName: formData.get('event-name-input'),
            eventDate: formData.get('event-date-input'),
            multiDateEvent: formData.get('multi-date-checkbox'),
            eventEndDate: formData.get('event-end-date-input'),
            eventDetails: formData.get('event-details-input'),
            honeypot: formData.get('honeypot-input')
        }

        // check if honeypot input is filled
        if (formDataObject.honeypot) {
            console.log("honeypot input filled, bot detected")
            return
        }

        // validate user input
        var newErrors = [...eventErrors]

        if (!formDataObject.eventName || formDataObject.eventName == "") {
            newErrors[0] = "Please enter event name"
        } else {
            newErrors[0] = ""
        }

        if (!formDataObject.eventDate || formDataObject.eventDate == "") {
            newErrors[1] = "Please enter event date"
        } else {
            newErrors[1] = ""
        }

        if (formDataObject.multiDateEvent) {
            const startDate = new Date(formDataObject.eventDate as string)
            const endDate = new Date(formDataObject.eventEndDate as string)

            if (endDate <= startDate) {
                newErrors[2] = "End date must come after start date"
            } else if (!formDataObject.eventEndDate) {
                newErrors[2] = "Multi date event must have end date"
            } else {
                newErrors[2] = ""
            }
        }

        if (!formDataObject.eventDetails || formDataObject.eventDetails == "") {
            newErrors[3] = "Event must have details"
        } else {
            newErrors[3] = ""
        }
        
        setErrors(newErrors)

        // check if there are any errors
        const hasErrors = newErrors.some(error => error !== "")
        if (!hasErrors) {

            // call api to add new event
            const response = await fetch('../../../api/timeline/newEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventName: formDataObject.eventName,
                    eventDate: formDataObject.eventDate,
                    eventEndDate: formDataObject.eventEndDate,
                    eventDetails: formDataObject.eventDetails,
                })
            })

            // handle api response
            const responseData = await response.json()
            console.log(responseData)

            if (response.ok) {
                window.location.href = ('/timeline')
            }
        }
    }

    return (
        <main className='bg-gray-300 min-h-screen flex flex-col place-items-center p-12 gap-6'>
            <h1 className={`text-3xl text-center font-bold tracking-[3px] ${josefin.className}`}>New Event</h1>
            <div className='bg-gray-500 p-2 min-w-[500px]'>
                <form className='bg-gray-100 flex flex-col p-3 gap-4' onSubmit={HandleSubmit}>

                    {/* Event Name */}
                    <div className='flex flex-col'>
                        <span className='flex flex-row justify-between'>
                            <label>Event Name</label>
                            <p className='text-red-500'>{eventErrors[0]}</p>
                        </span>
                        <input type="text" name="event-name-input"></input>
                    </div>


                    {/* Event Date */}
                    <div className='flex flex-col'>
                        <span className='flex flex-row justify-between'>
                            <label>Event Date</label>
                            <p className='text-red-500'>{eventErrors[1]}</p>
                        </span>
                        <input type="date" name="event-date-input" placeholder="YYYY-MM-DD BCE"></input>
                    </div>


                    {/* Multi Date Checkbox */}
                    <div className='flex flex-row justify-between'>
                        <label>Multi Date Event</label>
                        <input type="checkbox" className='w-[20px]' onChange={HandleCheckBoxChange} name='multi-date-checkbox'></input>
                    </div>


                    {/* End Date */}
                    {isMultiDateEvent && (
                        <div className='flex flex-col'>
                            <span className='flex flex-row justify-between'>
                                <label>End Date</label>
                                <p className='text-red-500'>{eventErrors[2]}</p>
                            </span>
                            <input type="date" name="event-end-date-input" placeholder="YYYY-MM-DD BCE"></input>
                        </div>
                    )}


                    {/* Event Details */}
                    <div className='flex flex-col'>
                        <span className='flex flex-row justify-between'>
                            <label>Event Details</label>
                            <p className='text-red-500'>{eventErrors[3]}</p>
                        </span>
                        <textarea name="event-details-input"></textarea>
                    </div>


                    {/* Honeypot */}
                    <div className='hidden'>
                        <input type='text' name="honeypot-input"></input>
                    </div>


                    {/* Form Submit Button */}
                    <div className='flex flex-row justify-end'>
                        <input type='submit' className='bg-green-500 px-4 py-1 rounded text-white hover:cursor-pointer'></input>
                    </div>
                </form>
            </div>
        </main>
    )

}