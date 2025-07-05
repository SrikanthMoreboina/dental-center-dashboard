import { useState, type FormEvent, useContext } from 'react';
import { ClinicDataContext } from '../../data/ClinicDataProvider';
import TextInput from '../shared/TextInput';
import CustomButton from '../shared/CustomButton';
import type { ClinicPatient } from '../../types/clinic';

// Form for adding/editing patients
interface PatientEditorProps {
  existingPatient?: ClinicPatient;
  onCloseDialog: () => void;
}

const PatientEditor = ({ existingPatient, onCloseDialog }: PatientEditorProps) => {
  const { addNewPatient, updateExistingPatient } = useContext(ClinicDataContext);
  const [patientData, setPatientData] = useState({
    fullName: existingPatient?.fullName || '',
    birthDate: existingPatient?.birthDate || '',
    contactNumber: existingPatient?.contactNumber || '',
    healthNotes: existingPatient?.healthNotes || '',
  });

  // Handle form submission with manual validation
  const handlePatientSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!patientData.fullName || !patientData.birthDate || !patientData.contactNumber) {
      alert('Name, DOB, and contact are required!');
      return;
    }
    if (existingPatient) {
      updateExistingPatient(existingPatient.patientId, patientData);
    } else {
      addNewPatient(patientData);
    }
    onCloseDialog();
  };

  return (
    <form onSubmit={handlePatientSubmit}>
      <h2 className="text-xl mb-5">{existingPatient ? 'Edit Patient Details' : 'Add New Patient'}</h2>
      <TextInput
        label="Full Name"
        value={patientData.fullName}
        onChange={e => setPatientData({ ...patientData, fullName: e.target.value })}
        required
      />
      <TextInput
        label="Date of Birth"
        type="date"
        value={patientData.birthDate}
        onChange={e => setPatientData({ ...patientData, birthDate: e.target.value })}
        required
      />
      <TextInput
        label="Contact Number"
        value={patientData.contactNumber}
        onChange={e => setPatientData({ ...patientData, contactNumber: e.target.value })}
        required
      />
      <TextInput
        label="Health Notes"
        value={patientData.healthNotes}
        onChange={e => setPatientData({ ...patientData, healthNotes: e.target.value })}
      />
      <div className="flex justify-end gap-3 mt-5">
        <CustomButton type="button" className="clinic-btn-secondary" onClick={onCloseDialog}>
          Cancel
        </CustomButton>
        <CustomButton type="submit" className="clinic-btn">
          Save Patient
        </CustomButton>
      </div>
    </form>
  );
};

export default PatientEditor;