import { useContext } from 'react';
import { AuthContext } from '../data/AuthProvider';
import { ClinicDataContext } from '../data/ClinicDataProvider';
import AppointmentTable from '../ui/appointments/AppointmentTable';

// Patient profile page
const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const { clinicPatients } = useContext(ClinicDataContext);

  if (!currentUser || !currentUser.linkedPatientId) return null;

  const patient = clinicPatients.find(p => p.patientId === currentUser.linkedPatientId);

  return (
    <div>
      <h2 className="text-2xl mb-6">My Profile</h2>
      <div className="clinic-card mb-6">
        <h3 className="text-lg">Patient Information</h3>
        <p><strong>Name:</strong> {patient?.fullName}</p>
        <p><strong>DOB:</strong> {patient?.birthDate}</p>
        <p><strong>Contact:</strong> {patient?.contactNumber}</p>
        <p><strong>Health Notes:</strong> {patient?.healthNotes}</p>
      </div>
      <AppointmentTable filterByPatientId={currentUser.linkedPatientId} />
    </div>
  );
};

export default MyProfile;