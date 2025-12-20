import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";



const LandingPage = lazy(() => import("./pages/landing/LandingPage"));
const Auth = lazy(() => import("./pages/Auth"));
const Docs = lazy(() => import("./pages/Docs"));

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Send = lazy(() => import("./pages/dashboard/Send"));

const Profile = lazy(() => import("./pages/Profile/Profile"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const KycPending = lazy(() => import("./pages/KycPending"));

const ErrorPage = lazy(() => import("./pages/Error/ErrorPage"));
const NotFound = lazy(() => import("./pages/Error/NotFound"));

/* ================= APP ================= */

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/docs" element={<Docs />} />

          {/* User */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/send" element={<Send />} />

          {/* Admin / States */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/pending" element={<KycPending />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
