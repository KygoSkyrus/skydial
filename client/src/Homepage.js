import React, { useState } from 'react'
import Modal from './Modal';
import GetSVGIcon from './GetSVGIcon';

const Homepage = ({ socket }) => {

  const [action, setAction] = useState(null)

  const handleModal = (val) => {
    document.getElementById('call_dialog').showModal()
    setAction(val)
  }

  return (
    <>
      <div className='dark min-h-dvh dark:bg-gray-800 flex flex-col items-center justify-center'>
        <section className="dark:dark:bg-gray-800 dark:dark:text-gray-100 dark:bg-slate-800 flex flex-grow items-center">
          <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
            <h1 className="text-4xl font-bold leadi sm:text-5xl">SKY
              <span className="dark:dark:text-violet-400">
                <GetSVGIcon name="phone" className='w-12 h-12 inline-block' />
                {/* <GetSVGIcon name="phone-solid" className='w-12 h-12 inline-block'/> */}
              </span>DIAL
            </h1>
            <p className="px-8 mt-8 mb-12 text-lg">
              Bridging distances and Bringing Faces Together, Wherever You Are.
              <br />
              Beyond Boundaries, Beyond Screens – Connect Visually Anytime, Anywhere with SkyDial
            </p>
            <div className="flex flex-wrap justify-center">
              <button className="w-full sm:w-auto px-8 py-3 m-2 text-lg font-semibold rounded dark:dark:bg-violet-400 dark:dark:text-gray-900" onClick={() => handleModal("start")}>Start call</button>
              <button className="w-full sm:w-auto px-8 py-3 m-2 text-lg border rounded dark:dark:text-gray-50 dark:dark:border-gray-700" onClick={() => handleModal("join")}>Join call</button>
            </div>
          </div>
        </section>
        <span className='text-white mb-4'>by <span className='text-violet-400'>dheeraj gupta</span></span>
      </div>
      <Modal action={action} socketId={socket.id} />
    </>
  )
}

export default Homepage