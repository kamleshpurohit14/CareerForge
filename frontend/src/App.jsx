import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Assessment from './pages/Assessment'
import AIGuidance from './pages/AIGuidance'
import ResumeBuilder from './pages/ResumeBuilder'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Routes>

      {/* =========================
          PUBLIC ROUTES
          ========================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* =========================
          PROTECTED ROUTES
          ========================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/assessment"
        element={
          <ProtectedRoute>
            <Assessment />
          </ProtectedRoute>
        }
      />


      {/* =========================
          AI CAREER NAVIGATOR
          ========================= */}

      <Route
        path="/ai-guidance"
        element={
          <ProtectedRoute>
            <AIGuidance />
          </ProtectedRoute>
        }
      />


      {/* =========================
          RESUME BUILDER
          ========================= */}

      <Route
        path="/resume-builder"
        element={
          <ProtectedRoute>
            <ResumeBuilder />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App