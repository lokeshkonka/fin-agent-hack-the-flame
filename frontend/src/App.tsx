import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Auth from './pages/Auth'
import Dashboard from './pages/dashboard/Dashboard'
import LandingPage from './pages/landing/LandingPage'
import Profile from './pages/Profile/Profile'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={< Auth/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
