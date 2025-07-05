// KPI card for dashboard metrics
interface MetricCardProps {
  metricTitle: string;
  metricValue: string | number;
}

const MetricCard = ({ metricTitle, metricValue }: MetricCardProps) => {
  return (
    <div className="clinic-card">
      <h3 className="text-lg">{metricTitle}</h3>
      <p className="text-2xl text-clinicBlue font-semibold mt-2">{metricValue}</p>
    </div>
  );
};

export default MetricCard;