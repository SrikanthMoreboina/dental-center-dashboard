import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../data/AuthProvider';

// Sidebar navigation
const SideMenu = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null;

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-5">
      <h2 className="text-xl mb-6">Clinic Menu</h2>
      <nav>
        {currentUser.userRole === 'Admin' && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-2 rounded mb-2 ${isActive ? 'bg-clinicBlue' : 'hover:bg-gray-700'}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                `block p-2 rounded mb-2 ${isActive ? 'bg-clinicBlue' : 'hover:bg-gray-700'}`
              }
            >
              Patients
            </NavLink>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                `block p-2 rounded mb-2 ${isActive ? 'bg-clinicBlue' : 'hover:bg-gray-700'}`
              }
            >
              Appointments
            </NavLink>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `block p-2 rounded mb-2 ${isActive ? 'bg-clinicBlue' : 'hover:bg-gray-700'}`
              }
            >
              Calendar
            </NavLink>
          </>
        )}
        {currentUser.userRole === 'Patient' && (
          <NavLink
            to="/my-profile"
            className={({ isActive }) =>
              `block p-2 rounded mb-2 ${isActive ? 'bg-clinicBlue' : 'hover:bg-gray-700'}`
            }
          >
            My Profile
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default SideMenu;