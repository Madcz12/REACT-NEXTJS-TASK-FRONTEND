"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function FormTask() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(title, description)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
        router.refresh()
    }

    return (
        <div className='bg-slate-200 p-7 h-fit'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-black font-bold'>Añadir Tarea</h1>
                <label htmlFor="title" className='text-xs text-black'>Title:</label>
                <input type="text" name="title" id=""
                    className='bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900'
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="description" className='text-xs text-black'>Descripción:</label>
                <textarea name="description" id=""
                    className='bg-slate-400 rounded-md p-2 mb-2 w-full text-slate-900'
                    onChange={e => setDescription(e.target.value)}></textarea>
                <button className='rounded-md p-2 bg-blue-500 text-white block w-full'>Save</button>
            </form>
        </div>
    )
}

export default FormTask