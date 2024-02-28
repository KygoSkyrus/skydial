import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { SocketProvider } from './SocketContext';

const Homepage = () => {
 

  return (
    <>
         {/* <SocketProvider> */}
      <div>Homepage</div>
      <h3>Join or Start a call</h3>

      <Link to={`/dial/${uuidv4()}`}>Start</Link>
      {/* </SocketProvider> */}
    </>
  )
}

export default Homepage