import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import DialPage from './DialPage'
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";


const socket = io('http://localhost:3006', { autoConnect: false }); // getting this out of the compoments bvcz when it was in,,it used to create a new seocket on every rerender

//listens to every socket events
socket.onAny((event, ...args) => {
    // console.log('triggered event :- ', event, args);
});

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Homepage socket={socket}/>} />
          <Route path='/dial/:dialId' exact element={<DialPage socket={socket} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
