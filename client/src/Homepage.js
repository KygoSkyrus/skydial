import React, { useEffect, useState } from 'react'
import Modal from './Dialogs/Modal';
import logo from "./assets/skydial_logo.png"

const Homepage = ({ socket }) => {

  const [action, setAction] = useState(null)

  useEffect(() => {
    getMediaPermission();
  })

  const getMediaPermission = async () => {
    const cameraPermission = await navigator.permissions.query({ name: "camera" });
    const micPermission = await navigator.permissions.query({ name: 'microphone' });

    if (micPermission.state !== 'granted' && cameraPermission.state !== 'granted') {
      alert('need to allow camera/microphone to continue using skydial')
    }
  }

  const handleModal = (val) => {
    document.getElementById('call_dialog')?.showModal();
    setAction(val);
  }

  return (
    <>
    {/*  h-screen min-h-screen */}
      <div className='homepage bg-gray-900 flex flex-col items-center justify-center font-thin'>
        <section className="bg-gray-900 text-gray-100 flex flex-grow items-center">
          <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-10 lg:px-32 xl:max-w-3xl">
            <img src={logo} alt='' width="200px" />
            <p className="px-8 mt-8 mb-12 text-lg">
              Bridging distances and Bringing Faces Together
              <br />
              <b className='text-violet-400'>Beyond Boundaries, Beyond Screens</b> – Connect Visually Anytime, Anywhere with SkyDial
            </p>
            <div className="flex flex-wrap justify-center">
              <button className="w-full sm:w-auto px-8 py-3 m-2 text-lg font-semibold rounded bg-violet-400 text-gray-900" onClick={() => handleModal("start")}>Start call</button>
              <button className="w-full sm:w-auto px-8 py-3 m-2 text-lg border rounded text-gray-50 border-gray-700" onClick={() => handleModal("join")}>Join call</button>
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