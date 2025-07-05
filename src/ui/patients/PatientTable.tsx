import { useContext, useState } from 'react';
import { ClinicDataContext } from '../../data/ClinicDataProvider';
import CustomButton from '../shared/CustomButton';
import DialogBox from '../shared/DialogBox';
import PatientEditor from './PatientEditor';
import type { ClinicPatient } from '../../types/clinic';

// Table for displaying patients
const PatientTable = () => {
  const { clinicPatients, removePatient } = useContext(ClinicDataContext);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<ClinicPatient | null>(null);

  // Open edit dialog
  const openEditDialog = (patient: ClinicPatient) => {
    setSelectedPatient(patient);
    setShowDialog(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl">Patient Records</h2>
        <CustomButton className="clinic-btn" onClick={() => setShowDialog(true)}>
          Add New Patient
        </CustomButton>
      </div>
      <div className="clinic-card overflow-x-auto">
        <table className="clinic-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Contact</th>
              <th>Health Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clinicPatients.map(patient => (
              <tr key={patient.patientId}>
                <td>{patient.fullName}</td>
                <td>{patient.birthDate}</td>
                <td>{patient.contactNumber}</td>
                <td>{patient.healthNotes}</td>
                <td>
                  <CustomButton
                    className="clinic-btn-secondary mr-2"
                    onClick={() => openEditDialog(patient)}
                  >
                    Edit
                  </CustomButton>
                  <CustomButton
                    className="clinic-btn bg-red-500 hover:bg-red-600"
                    onClick={() => removePatient(patient.patientId)}
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
        setSelectedPatient(null);
      }}>
        <PatientEditor
          existingPatient={selectedPatient || undefined}
          onCloseDialog={() => {
            setShowDialog(false);
            setSelectedPatient(null);
          }}
        />
      </DialogBox>
    </div>
  );
};

export default PatientTable;