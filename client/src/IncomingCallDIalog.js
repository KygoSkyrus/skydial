import React from 'react'

const IncomingCallDIalog = ({ caller, answerCall }) => {

    function handleClick(event) {
        const dialog = document.getElementById("incomingCall_dialog");
        if (event.target === dialog) {
            dialog.close();
        }
    }

    return (
        <dialog id='incomingCall_dialog' className='dark dark:bg-gray-900 dark:text-gray-100 lg:w-1/2 md:w-3/4 rounded-3xl px-6 py-16 sm:px-12 md:px-16 xl:col-span-2' onClick={(e) => handleClick(e)}>
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2 text-gray-500">✕</button>
            </form>

            <div>
                <span className="block dark:text-violet-400">SKYDIAL</span>
                <h1 className="text-5xl font-extrabold dark:text-gray-50">Incoming Request</h1>
                <p className="mt-4 mb-6">
                    <span className="font-thin dark:text-gray-50">
                        <b className='font-extrabold'>{caller}</b> has requested to join your call
                    </span>
                </p>

            </div>

            <div className='flex flex-wrap gap-2 pt-4 justify-end'>
                <button type="button" className="py-2 px-6 font-semibold rounded  border border-red-400 text-red-400"
                // onClick={(e) => dialogRef.current.close()}
                >Decline</button>
                <button type="submit" className="py-2 px-10 font-semibold rounded dark:bg-green-400 dark:text-gray-900" onClick={answerCall}>Accept</button>
            </div>

        </dialog>
    )
}

export default IncomingCallDIalog