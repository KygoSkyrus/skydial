import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import DialPage from './DialPage';

const Homepage = () => {

  const [dialId, setDialId] = useState(null)

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
            <h1 className="text-4xl font-bold leadi sm:text-5xl">Quisquam necessita vel
              <span className="dark:dark:text-violet-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 inline-block">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </span>delectus
            </h1>
            <p className="px-8 mt-8 mb-12 text-lg">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
            <div className="flex flex-wrap justify-center">
              <Link to={`/dial/${uuidv4()}`} className="px-8 py-3 m-2 text-lg font-semibold rounded dark:dark:bg-violet-400 dark:dark:text-gray-900">Start call</Link>
              <button className="px-8 py-3 m-2 text-lg border rounded dark:dark:text-gray-50 dark:dark:border-gray-700">Join call</button>
            </div>
          </div>
        </section>


      </div>
    </>
  )
}

export default Homepage