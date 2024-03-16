import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io } from "socket.io-client";

import './assets/App.css';
import Homepage from './Homepage';
import DialPage from './DialPage'
import PageNotFound from './PageNotFound'

const socket = io('https://skydial.onrender.com', { autoConnect: false }); // production
// const socket = io('http://localhost:3006', { autoConnect: false }); // is no inside the component as it used to create a new socket connection on every render

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Homepage socket={socket} />} />
          <Route path='/dial/:dialId' exact element={<DialPage socket={socket} />} />
          <Route path='*' exact element={<PageNotFound socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;