import { useContext } from 'react';
import { AuthContext } from '../../data/AuthProvider';
import CustomButton from '../shared/CustomButton';

// Top navigation bar
const TopNav = () => {
  const { currentUser, logoutUser } = useContext(AuthContext);

  return (
    <header className="bg-clinicBlue text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl">Dental Clinic Dashboard</h1>
        {currentUser && (
          <div className="flex items-center gap-4">
            <span>{currentUser.userEmail} ({currentUser.userRole})</span>
            <CustomButton className="clinic-btn-secondary" onClick={logoutUser}>
              Sign Out
            </CustomButton>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNav;