import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Modal = ({ action, socketId, setName }) => {

    const dialogRef = useRef()
    const navigate = useNavigate()

    const [myName, setMyName] = useState('')
    const [dialId, setDialId] = useState('')

    function handleClick(event) {
        if (event.target === dialogRef.current && action !== "set_name") {
            dialogRef.current.close();
        }
    }

    const submitAction = (e) => {
        e.preventDefault()
        if (action === "start") {
            // to={`/dial/${uuidv4()}`} state={{ hasUserJoined: false }}
            navigate(`/dial/initiator`, { state: { hasUserJoined: false, myName } })
        } else if (action === "set_name") {
            setName(myName);
            dialogRef.current.close();
        } else {
            navigate(`/dial/${dialId}`, { state: { hasUserJoined: true, myName } })
        }
    }

    return (
        <>
            <dialog ref={dialogRef} id='call_dialog' className="modal lg:w-1/2 md:w-3/4 bg-gray-900 rounded-3xl " onClick={(e) => handleClick(e)}>
                {action !== "set_name" &&
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2 text-gray-500">✕</button>
                    </form>
                }
                <div className="dark:bg-gray-800 dark:text-gray-100">
                    <div className="dark">
                        <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-900">
                            <span className="block dark:text-violet-400">SKYDIAL</span>
                            <h1 className="text-5xl font-extrabold dark:text-gray-50">{action === "join" ? 'Join a call' : 'Get on a call'}</h1>
                            <p className="mt-8 mb-2">
                                <span className="font-thin dark:text-gray-50">Enter your name {action === "join" ? '& dial id to join' : action === "set_name" ? 'to join' : 'to start'} the call</span>
                            </p>
                            <form onSubmit={e => submitAction(e)} className="self-stretch space-y-3">
                                <div>
                                    <label htmlFor="name" className="text-sm sr-only">Your name</label>
                                    <input id="name" type="text" placeholder="Your name" className="w-full rounded-md focus:ring focus:ri dark:border-gray-700 p-3" value={myName} onChange={e => setMyName(e.target.value)} required />
                                </div>
                                {action === "join" &&
                                    <div>
                                        <label htmlFor="lastname" className="text-sm sr-only">Email address</label>
                                        <input id="lastname" type="text" placeholder="Enter dial id" className="w-full rounded-md focus:ring focus:ri dark:border-gray-700 p-3" value={dialId} onChange={e => setDialId(e.target.value)} required />
                                    </div>
                                }
                                <div className='flex flex-wrap gap-2 pt-4 justify-end'>
                                    <button type="button" className="py-2 px-6 font-semibold rounded  border border-red-400 text-red-400" onClick={(e) => dialogRef.current.close()}>Cancel</button>
                                    <button type="submit" className="py-2 px-10 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">{action === "join" ? 'Join' : action === "set_name" ? 'Proceed' : 'Start'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Modal