import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const IncomingCallDIalog = ({ callAction, caller, answerCall, declineCall }) => {

    const navigate=useNavigate()
    function handleClick(event) {
        const dialog = document.getElementById("comms_dialog");
        console.log('evee tar', event.target)
        if (event.target === dialog) {
            if (callAction === "call_incoming" || callAction === "call_declined") {
                // declineCall()
                dialog.classList.add('shake')
                setTimeout(() => {
                    dialog.classList.remove('shake')
                }, 500);
                return;
            }
            dialog.close();
        }
    }

    useEffect(() => {
        // this should run when the event is fired ,, as being inside effect it runs at the very beginning
        if (callAction === "call_declined") {
            console.log('insite ueee')
            document.querySelector('.progress').classList.remove('hidden')
            setTimeout(() => {
                navigate("/")
                console.log('timeoutt')
                console.log('redirect to home')
            }, 8000);
        }

    }, [])

    return (
        <dialog id='comms_dialog' className='dark dark:bg-gray-900 dark:text-gray-100 lg:w-1/2 md:w-3/4 rounded-3xl px-6 py-16 sm:px-12 md:px-16 xl:col-span-2' onClick={(e) => handleClick(e)}>

            {/* delete this button maybe */}
            {callAction !== "call_incoming" && callAction !== "call_declined" &&
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2 text-gray-500">✕</button>
                </form>
            }

            <div>
                <span className="block dark:text-violet-400">SKYDIAL</span>
                <h1 className="text-5xl font-extrabold dark:text-gray-50">{callAction === "call_incoming" ? 'Incoming Request' : 'Request Declined'}</h1>
                <div className="w-fit mt-4 mb-6">
                    <span className="font-thin dark:text-gray-50">
                        <b className='font-extrabold'>{caller}</b> has{callAction === "call_incoming" ? ' requested to join your call' : ' declined your request to join the call'}
                    </span>
                    <div className="progress hidden">
                        <div className="color"></div>
                    </div>
                </div>

            </div>

            <div className='flex flex-wrap gap-2 pt-4 justify-end'>
                {callAction === "call_incoming" ?
                    <>
                        <button type="button" className="py-2 px-6 font-semibold rounded  border border-red-400 text-red-400" onClick={declineCall} >Decline</button>
                        <button type="submit" className="py-2 px-10 font-semibold rounded dark:bg-green-400 dark:text-gray-900" onClick={answerCall}>Accept</button>
                    </>
                    :
                    <Link className="py-2 px-6 font-semibold rounded  border border-gray-400 text-violet-500" to="/">Go home</Link>
                }
            </div>

        </dialog>
    )
}

export default IncomingCallDIalog