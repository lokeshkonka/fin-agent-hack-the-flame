import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landing/LandingPage";
import Profile from "./pages/Profile/Profile";
import Docs from "./pages/Docs";
import NotFound from "./pages/Error/NotFound";
import ErrorPage from "./pages/Error/ErrorPage";
import Send from "./pages/dashboard/Send";
import Admin from "./pages/Admin/Admin";

// Error pages


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/docs" element={<Docs />} />

        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/send" element={<Send />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/error" element={<ErrorPage />} />

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
