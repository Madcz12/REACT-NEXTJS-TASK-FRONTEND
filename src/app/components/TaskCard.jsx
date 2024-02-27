"use client"
import { useRouter } from "next/navigation"
import { useState } from 'react'


function TaskCard({ task }) {

    const router = useRouter()
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(false)
    const [newDescription, setNewDescription] = useState(false)

    const handleDelete = async (id) => {
        if (window.confirm('Quieres eliminar esta tarea?')) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`, {
                method: "DELETE",
            })
            if (res.status === 204) {
                router.refresh();
            }
        }
    }

    const handleUpdate = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
            method: "PUT",
            body: JSON.stringify({ title: newTitle, description: newDescription }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        setNewTitle(data.title);
        setNewDescription(data.description);
        setEdit(false);
    }

    const handleStatus = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`, {
            method: "POST",
        })
        if (res.status === 200) {
            router.refresh();
        }
    }

    return (
        <div className="bg-slate-500 px-4 py-3 mb-2 rounded-md text-slate-200 flex justify-between items-center">
            <div className="flex flex-col">
                {
                    !edit ? (
                        <h2 className="font-bold">{newTitle}
                            {task.done && <span>✅</span>}</h2>
                    ) : (
                        <input type="text" placeholder={task.title}
                            className="p-2 bg-slate-500 border-none outline-none
                         text-green-300"
                            onChange={e => setNewTitle(e.target.value)}
                        />
                    )
                }

                {
                    !edit ? (
                        <p>{newDescription}</p>
                    ) : (
                        <textarea rows={1} value={newDescription}
                            className="p-2 bg-slate-500 border-none outline-none
                         text-green-300 w-full"
                            onChange={e => setNewDescription(e.target.value)}
                        >{task.description}
                        </textarea>
                    )
                }

            </div>
            {/* /////////////////Seccion de botones//////////////// */}
            <div className="flex justify-between gap-x-2">
                {
                    edit && (
                        <button className="bg-slate-300 text-black rounded-md p-2 m-2"
                            onClick={() => handleUpdate(task.id)}>Guardar Cambios</button>
                    )
                }

                <button className={"text-white rounded-md p-2" + (task.done ? "bg-gray-800" : "bg-green-500")}
                    onClick={() => handleStatus(task.id)}>
                    {task.done ? "Desmarcar" : "Marcar"}
                </button>
                <button className="rounded-md p-2 m-2 bg-red-500 text-white"
                    onClick={() => handleDelete(task.id)}
                >Eliminar
                </button>
                <button className="rounded-md p-2 m-2 bg-yellow-500"
                    onClick={() => setEdit(!edit)}
                >Editar
                </button>
            </div>
        </div >
    )
}

export default TaskCard