"use client"

import { FormEvent, useState } from 'react'

export default function TestForm() {
    const [formStatus, setFormStatus] = useState<string>("")

    function HandleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormStatus("form submitted")
    }

    return (
        <div>
            <div className='bg-gray-400 p-2 w-[400px]'>
                <form className='flex flex-col gap-2 bg-gray-200 p-3' onSubmit={HandleSubmit}>
                    <label>input text</label>
                    <input type='text' className='rounded p-1' placeholder='test'></input>
                    <input type='submit' className='bg-green-500 w-fit px-6 py-1 place-self-end text-white rounded hover:cursor-pointer'></input>
                </form>
            </div>
            <p className='px-2 text-red-600'>{formStatus}</p>
        </div>
    )
}