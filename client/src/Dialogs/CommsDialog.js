import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const CommsDialog = ({ callAction, caller, answerCall, declineCall }) => {
 console.log('caller in dialog',caller)

    function handleClick(event) {
        const dialog = document.getElementById("comms_dialog");
        // console.log('evee tar', event.target)
        if (event.target === dialog) {
            // if (callAction === "call_incoming" || callAction === "call_declined" || callAction === "call_end" || callAction === "call_terminated") {
                // //declineCall()
                dialog.classList.add('shake')
                setTimeout(() => {
                    dialog.classList.remove('shake')
                }, 500);
                // return;
            // }
            // dialog.close();
        }
    }

    useEffect(() => {
        if (callAction === "call_declined" || callAction === "call_end" || callAction === "call_terminated") {
            // console.log('inside ue')
            document.querySelector('.progress').classList.remove('hidden')
            setTimeout(() => {
                window.location.href = '/';

                // navigate("/")
                // console.log('timeoutt')
                // console.log('redirect to home')
            }, 9000);
        }
    }, [callAction])

    return (
        <dialog id='comms_dialog' className='dark dark:bg-gray-900 dark:text-gray-100 lg:w-1/2 md:w-3/4 rounded-3xl px-6 py-16 sm:px-12 md:px-16 xl:col-span-2' onClick={(e) => handleClick(e)}>

            <div>
                <span className="block dark:text-violet-400">SKYDIAL</span>
                <h1 className="text-5xl font-extrabold dark:text-gray-50">{callAction === "call_incoming" ? 'Incoming Request' : (callAction === "call_end" || callAction === "call_terminated") ? 'Call Terminated' : 'Request Declined'}</h1>
                <div className="w-fit mt-4">
                    <span className="font-thin dark:text-gray-50">
                        {callAction === "call_terminated" ?
                            'You will be redirected to homepage in few seconds'
                            :
                            <>
                                <b className='font-extrabold'>{caller}</b> has{callAction === "call_incoming" ? ' requested to join your call' : callAction === "call_end" ? ' ended the call' : ' declined your request to join the call'}
                            </>
                        }
                    </span>
                </div>
                <div className="progress hidden mb-6">
                    <div className="color"></div>
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

export default CommsDialog