import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { ClinicDataContext } from '../../data/ClinicDataProvider';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// Revenue chart for dashboard
const IncomeGraph = () => {
  const { clinicAppointments } = useContext(ClinicDataContext);

  // Aggregate revenue by month
  const monthlyIncome = clinicAppointments
    .filter(a => a.apptStatus === 'Completed' && a.apptCost)
    .reduce((acc, curr) => {
      const month = new Date(curr.apptDateTime).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + curr.apptCost!;
      return acc;
    }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(monthlyIncome),
    datasets: [
      {
        label: 'Monthly Income ($)',
        data: Object.values(monthlyIncome),
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="clinic-card">
      <h3 className="text-lg mb-4">Clinic Income</h3>
      <Line data={chartData} />
    </div>
  );
};

export default IncomeGraph;