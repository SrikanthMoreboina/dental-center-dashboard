import { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import { ClinicDataContext } from '../../data/ClinicDataProvider';
import 'react-calendar/dist/Calendar.css';

// Calendar for viewing appointments
const ClinicCalendar = () => {
  const { clinicAppointments } = useContext(ClinicDataContext);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Filter appointments for selected date
  const apptsOnDate = clinicAppointments.filter(
    a => new Date(a.apptDateTime).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="clinic-card">
      <h2 className="text-xl mb-5">Clinic Schedule</h2>
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            setSelectedDate(value);
          } else if (Array.isArray(value) && value[0] instanceof Date) {
            setSelectedDate(value[0]);
          }
        }}
        value={selectedDate}
        tileContent={({ date }: { date: Date }) => {
          const hasAppts = clinicAppointments.some(
            a => new Date(a.apptDateTime).toDateString() === date.toDateString()
          );
          return hasAppts ? <span className="text-red-500">•</span> : null;
        }}
        className="border border-gray-200 rounded-lg p-4 w-full"
      />
      <div className="mt-5">
        <h3 className="text-lg font-bold text-clinicBlue">
          Schedule for {selectedDate.toDateString()}
        </h3>
        {apptsOnDate.length ? (
          <ul className="list-disc pl-6 text-gray-700">
            {apptsOnDate.map(appt => (
              <li key={appt.apptId} className="mb-2">
                {appt.apptTitle} - {new Date(appt.apptDateTime).toLocaleTimeString()} - {appt.apptStatus}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No appointments scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default ClinicCalendar;