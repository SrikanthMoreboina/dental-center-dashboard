import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './data/AuthProvider';
import { ClinicDataProvider } from './data/ClinicDataProvider';
import RouteGuard from './ui/auth/RouteGuard';
import Login from './pages/Login';
import Home from './pages/Home';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Calendar from './pages/Calendar';
import MyProfile from './pages/MyProfile';
import SideMenu from './ui/layout/SideMenu';
import TopNav from './ui/layout/TopNav';

// Main app with layout
function App() {
  return (
    <AuthProvider>
      <ClinicDataProvider>
        <div className="flex min-h-screen bg-softGray">
          <RouteGuard allowedRoles={['Admin', 'Patient']}>
            <SideMenu />
          </RouteGuard>
          <div className="flex-1 flex flex-col">
            <TopNav />
            <main className="flex-1 p-6 md:p-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <RouteGuard allowedRoles={['Admin', 'Patient']}>
                      <Home />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/patients"
                  element={
                    <RouteGuard allowedRoles={['Admin']}>
                      <Patients />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/appointments"
                  element={
                    <RouteGuard allowedRoles={['Admin']}>
                      <Appointments />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <RouteGuard allowedRoles={['Admin']}>
                      <Calendar />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/my-profile"
                  element={
                    <RouteGuard allowedRoles={['Patient']}>
                      <MyProfile />
                    </RouteGuard>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </ClinicDataProvider>
    </AuthProvider>
  );
}

export default App;