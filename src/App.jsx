import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import DashboardPage from './pages/Dashboard/DashboardPage'
import DeparturePage from './pages/Departure/DeparturePage'
import ArrivalPage from './pages/Arrival/ArrivalPage'
import LoginPage from './pages/Login/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="departures" element={<DeparturePage />} />
        <Route path="arrivals" element={<ArrivalPage />} />
      </Route>
    </Routes>
  )
}

export default App