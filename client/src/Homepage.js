import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import DialPage from './DialPage';
import Example from './Example';
import Modal from './Modal';

const Homepage = ({ socket }) => {

  const [dialId, setDialId] = useState(null)
  const [action, setAction] = useState(null)
  console.log('socket homeoae', socket)

  const handleModal = (val) => {
    document.querySelector('dialog').showModal()
    setAction(val)
  }

  return (
    <>
      {/* <h3>Join or Start a call</h3>

      <Link to={`/dial/${uuidv4()}`}>Start</Link>
      <hr />

      <input type='text' onChange={e => setDialId(e.target.value)} placeholder='enter dial id' />
      {dialId && <Link to={`/dial/${dialId}`}>Join</Link>} */}
      <div className='dark min-h-dvh dark:bg-gray-800 flex items-center justify-center'>
        <section className="dark:dark:bg-gray-800 dark:dark:text-gray-100 dark:bg-slate-800">
          <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
            <h1 className="text-4xl font-bold leadi sm:text-5xl">SKY
              <span className="dark:dark:text-violet-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 inline-block">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg> */}
              </span>DIAL
            </h1>
            <p className="px-8 mt-8 mb-12 text-lg">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
            <div className="flex flex-wrap justify-center">
              <button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:dark:bg-violet-400 dark:dark:text-gray-900" onClick={() => handleModal("start")}>Start call</button>
              <button className="px-8 py-3 m-2 text-lg border rounded dark:dark:text-gray-50 dark:dark:border-gray-700" onClick={() => handleModal("join")}>Join call</button>
              {/* <Link to={`/dial/${uuidv4()}`} state={{ hasUserJoined: false }} className="px-8 py-3 m-2 text-lg font-semibold rounded dark:dark:bg-violet-400 dark:dark:text-gray-900">Start call</Link>
              <Link to={`/dial/${uuidv4()}`} state={{ hasUserJoined: true }} className="px-8 py-3 m-2 text-lg border rounded dark:dark:text-gray-50 dark:dark:border-gray-700">Join call</Link> */}
            </div>
          </div>
        </section>
      </div>
      <Modal action={action} socketId={socket.id} />
    </>
  )
}

export default Homepage