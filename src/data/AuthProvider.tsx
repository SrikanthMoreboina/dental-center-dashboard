import { createContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { ClinicUser } from '../types/clinic';
import { fetchUsers } from '../helpers/storage';

// Context for authentication state
interface AuthState {
  currentUser: ClinicUser | null;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthState>({
  currentUser: null,
  loginUser: () => {},
  logoutUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<ClinicUser | null>(null);
  const navigate = useNavigate();

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle login with email/password
  const loginUser = (email: string, password: string) => {
    const users = fetchUsers();
    const user = users.find(u => u.userEmail === email && u.userPass === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success(`Welcome, ${user.userRole}!`);
      navigate(user.userRole === 'Admin' ? '/' : '/my-profile');
    } else {
      toast.error('Oops! Wrong email or password.');
    }
  };

  // Handle logout
  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.info('You have been logged out.');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};