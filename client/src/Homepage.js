import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { SocketProvider } from './SocketContext';

const Homepage = () => {

  const [dialId, setDialId] = useState(null)

  return (
    <>
      {/* <SocketProvider> */}
      <h3>Join or Start a call</h3>

      <Link to={`/dial/${uuidv4()}`}>Start</Link>
      <hr />

      <input type='text' onChange={e => setDialId(e.target.value)} placeholder='enter dial id' />
      {dialId && <Link to={`/dial/${dialId}`}>Join</Link>}
      {/* </SocketProvider> */}
    </>
  )
}

export default Homepage