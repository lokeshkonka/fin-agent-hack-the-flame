import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Auth from './pages/Auth'
import Dashboard from './pages/dashboard/Dashboard'
import LandingPage from './pages/landing/LandingPage'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={< Auth/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
