import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import DialPage from './DialPage'
import { useEffect, useState } from 'react';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path='/dial/:dialId' exact element={<DialPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
