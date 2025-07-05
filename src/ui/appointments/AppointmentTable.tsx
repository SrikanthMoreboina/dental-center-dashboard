import { useContext, useState } from 'react';
import { ClinicDataContext } from '../../data/ClinicDataProvider';
import CustomButton from '../shared/CustomButton';
import DialogBox from '../shared/DialogBox';
import AppointmentEditor from './AppointmentEditor';
import type { ClinicAppointment } from '../../types/clinic';

// Table for displaying appointments
interface AppointmentTableProps {
  filterByPatientId?: string;
}

const AppointmentTable = ({ filterByPatientId }: AppointmentTableProps) => {
  const { clinicAppointments, removeAppointment, clinicPatients } = useContext(ClinicDataContext);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<ClinicAppointment | null>(null);

  // Filter appointments if patientId is provided
  const filteredAppts = filterByPatientId
    ? clinicAppointments.filter(a => a.patientId === filterByPatientId)
    : clinicAppointments;

  // Open edit dialog
  const openEditDialog = (appt: ClinicAppointment) => {
    setSelectedAppt(appt);
    setShowDialog(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl">Appointments</h2>
        <CustomButton className="clinic-btn" onClick={() => setShowDialog(true)}>
          Schedule Appointment
        </CustomButton>
      </div>
      <div className="clinic-card overflow-x-auto">
        <table className="clinic-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Files</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppts.map(appt => (
              <tr key={appt.apptId}>
                <td>{clinicPatients.find(p => p.patientId === appt.patientId)?.fullName || 'Unknown'}</td>
                <td>{appt.apptTitle}</td>
                <td>{new Date(appt.apptDateTime).toLocaleString()}</td>
                <td>{appt.apptStatus}</td>
                <td>{appt.apptCost ? `$${appt.apptCost}` : '-'}</td>
                <td>
                  {appt.apptFiles?.map(file => (
                    <a key={file.fileName} href={file.fileUrl} className="text-clinicBlue hover:underline" target="_blank" rel="noopener">
                      {file.fileName}
                    </a>
                  ))}
                </td>
                <td>
                  <CustomButton
                    className="clinic-btn-secondary mr-2"
                    onClick={() => openEditDialog(appt)}
                  >
                    Edit
                  </CustomButton>
                  <CustomButton
                    className="clinic-btn bg-red-500 hover:bg-red-600"
                    onClick={() => removeAppointment(appt.apptId)}
                  >
                    Delete
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DialogBox isVisible={showDialog} onClose={() => {
        setShowDialog(false);
        setSelectedAppt(null);
      }}>
        <AppointmentEditor
          existingAppointment={selectedAppt || undefined}
          patientId={filterByPatientId}
          onCloseDialog={() => {
            setShowDialog(false);
            setSelectedAppt(null);
          }}
        />
      </DialogBox>
    </div>
  );
};

export default AppointmentTable;