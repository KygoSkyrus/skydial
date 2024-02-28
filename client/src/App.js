import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import DialPage from './DialPage'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(uuidv4())
  }, [])

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path='/dial/:dialId' exact element={<DialPage userId={userId} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
