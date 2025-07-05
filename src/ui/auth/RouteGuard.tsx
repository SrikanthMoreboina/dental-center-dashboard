import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../data/AuthProvider';

// Protect routes based on user role
interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RouteGuard = ({ children, allowedRoles }: RouteGuardProps) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(currentUser.userRole)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RouteGuard;