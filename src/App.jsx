import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CountryProvider } from './context/CountryContext'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'

import LoginPage from './pages/auth/LoginPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import LeadsPage from './pages/sales/LeadsPage'
import TrialsPage from './pages/sales/TrialsPage'
import EnrolmentsPage from './pages/sales/EnrolmentsPage'
import StudentsPage from './pages/enrolled/StudentsPage'
import AttendancePage from './pages/enrolled/AttendancePage'
import MakeupsPage from './pages/enrolled/MakeupsPage'
import CoverPage from './pages/enrolled/CoverPage'
import SchedulePage from './pages/enrolled/SchedulePage'
import MyClassesPage from './pages/tutor/MyClassesPage'
import ReportsPage from './pages/management/ReportsPage'

const SALES = ['sales_admin', 'super_admin']
const ENROLLED = ['enrolled_admin', 'super_admin']
const TUTOR = ['tutor', 'super_admin']
const MANAGEMENT = ['management', 'super_admin']
const ALL = ['sales_admin', 'enrolled_admin', 'tutor', 'management', 'super_admin']

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CountryProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={ALL}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Sales Admin */}
              <Route path="/leads" element={
                <ProtectedRoute allowedRoles={SALES}><LeadsPage /></ProtectedRoute>
              } />
              <Route path="/trials" element={
                <ProtectedRoute allowedRoles={SALES}><TrialsPage /></ProtectedRoute>
              } />
              <Route path="/enrolments" element={
                <ProtectedRoute allowedRoles={SALES}><EnrolmentsPage /></ProtectedRoute>
              } />

              {/* Enrolled Admin */}
              <Route path="/students" element={
                <ProtectedRoute allowedRoles={[...ENROLLED, ...MANAGEMENT]}><StudentsPage /></ProtectedRoute>
              } />
              <Route path="/attendance" element={
                <ProtectedRoute allowedRoles={[...ENROLLED, ...TUTOR]}><AttendancePage /></ProtectedRoute>
              } />
              <Route path="/makeups" element={
                <ProtectedRoute allowedRoles={ENROLLED}><MakeupsPage /></ProtectedRoute>
              } />
              <Route path="/cover" element={
                <ProtectedRoute allowedRoles={ENROLLED}><CoverPage /></ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute allowedRoles={ENROLLED}><SchedulePage /></ProtectedRoute>
              } />

              {/* Tutor */}
              <Route path="/my-classes" element={
                <ProtectedRoute allowedRoles={TUTOR}><MyClassesPage /></ProtectedRoute>
              } />

              {/* Management */}
              <Route path="/reports" element={
                <ProtectedRoute allowedRoles={MANAGEMENT}><ReportsPage /></ProtectedRoute>
              } />
            </Route>

            {/* Redirect root to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </CountryProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
