import { useContext } from 'react';
import { AuthContext } from '../data/AuthProvider';
import { ClinicDataContext } from '../data/ClinicDataProvider';
import MetricCard from '../ui/dashboard/MetricCard';
import IncomeGraph from '../ui/dashboard/IncomeGraph';
import AppointmentTable from '../ui/appointments/AppointmentTable';

// Dashboard page
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { clinicAppointments, clinicPatients } = useContext(ClinicDataContext);

  if (!currentUser) return null;

  // Calculate KPIs
  const pendingCount = clinicAppointments.filter(a => a.apptStatus === 'Pending').length;
  const completedCount = clinicAppointments.filter(a => a.apptStatus === 'Completed').length;
  const totalIncome = clinicAppointments
    .filter(a => a.apptStatus === 'Completed' && a.apptCost)
    .reduce((sum, a) => sum + a.apptCost!, 0);

  return (
    <div>
      <h2 className="text-2xl mb-6">Clinic Dashboard</h2>
      {currentUser.userRole === 'Admin' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard metricTitle="Total Patients" metricValue={clinicPatients.length} />
            <MetricCard metricTitle="Pending Appointments" metricValue={pendingCount} />
            <MetricCard metricTitle="Completed Appointments" metricValue={completedCount} />
            <MetricCard metricTitle="Total Income" metricValue={`$${totalIncome}`} />
          </div>
          <IncomeGraph />
          <AppointmentTable />
        </div>
      ) : (
        <AppointmentTable filterByPatientId={currentUser.linkedPatientId} />
      )}
    </div>
  );
};

export default Home;

