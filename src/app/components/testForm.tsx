"use client"

import { FormEvent, useState } from 'react'

export default function TestForm() {
    const [formStatus, setFormStatus] = useState<string>("")

    async function HandleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const inputTextValue = formData.get('inputText');
        const inputValueValue = formData.get('inputValue');

        console.log("sending data: ", inputTextValue)

        const response = await fetch('../../api/testForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: inputTextValue
            })
        });

        if (response.ok) {
            setFormStatus('form submitted');
        } else {
            setFormStatus('error submitting form');
        }

        console.log(inputTextValue);
        console.log(inputValueValue);
    }

    return (
        <div>
            <div className='bg-gray-400 p-2 w-[400px]'>
                <form className='flex flex-col gap-2 bg-gray-200 p-3' onSubmit={HandleSubmit}>
                    <label>input text</label>
                    <input type='text' name="inputText" className='rounded p-1'></input>
                    <label>input value</label>
                    <input type='text' name="inputValue" className='rounded p-1'></input>
                    <input type='submit' className='bg-green-500 w-fit px-6 py-1 place-self-end text-white rounded hover:cursor-pointer'></input>
                </form>
            </div>
            <p className='px-2 text-red-600'>{formStatus}</p>
        </div>
    )
}