import { useState, type FormEvent, useContext } from 'react';
import { ClinicDataContext } from '../../data/ClinicDataProvider';
import TextInput from '../shared/TextInput';
import CustomButton from '../shared/CustomButton';
import type { ClinicAppointment } from '../../types/clinic';

interface AppointmentEditorProps {
  existingAppointment?: ClinicAppointment;
  patientId?: string;
  onCloseDialog: () => void;
}

const AppointmentEditor = ({
  existingAppointment,
  patientId,
  onCloseDialog,
}: AppointmentEditorProps) => {
  const { addNewAppointment, updateExistingAppointment, clinicPatients } =
    useContext(ClinicDataContext);

  const [apptData, setApptData] = useState({
    patientId: existingAppointment?.patientId || patientId || '',
    apptTitle: existingAppointment?.apptTitle || '',
    apptDesc: existingAppointment?.apptDesc || '',
    apptComments: existingAppointment?.apptComments || '',
    apptDateTime: existingAppointment?.apptDateTime || '',
    apptCost: existingAppointment?.apptCost || '',
    apptStatus: existingAppointment?.apptStatus || 'Pending',
    apptTreatment: existingAppointment?.apptTreatment || '',
    apptNextDate: existingAppointment?.apptNextDate || '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);

  const handleApptSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!apptData.patientId || !apptData.apptTitle || !apptData.apptDateTime) {
      alert('Patient, title, and date required!');
      return;
    }

    const fileList = uploadedFiles
      ? Array.from(uploadedFiles).map((file) => ({
          fileName: file.name,
          fileUrl: URL.createObjectURL(file),
        }))
      : existingAppointment?.apptFiles || [];

    const newAppt = {
      ...apptData,
      apptCost: apptData.apptCost ? Number(apptData.apptCost) : undefined,
      apptFiles: fileList,
    };

    if (existingAppointment) {
      updateExistingAppointment(existingAppointment.apptId, newAppt);
    } else {
      addNewAppointment(newAppt);
    }
    onCloseDialog();
  };

  return (
    <div className="flex flex-col max-h-[70vh] overflow-y-auto">
      {/* Sticky Header */}
      <h2 className="text-md text-clinicBlue font-medium bg-gray-100 p-2 rounded-sm sticky top-0 z-10">
        {existingAppointment ? 'Edit Appointment' : 'Schedule Appointment'}
      </h2>

      {/* Form Content */}
      <form
        onSubmit={handleApptSubmit}
        className="flex flex-col gap-2 p-1"
      >
        {clinicPatients.length === 0 && (
          <p className="text-xs text-red-500">
            No patients available. Add patients first.
          </p>
        )}
        <select
          className="w-full px-1.5 py-1 border border-gray-400 rounded-sm text-xs bg-white"
          value={apptData.patientId}
          onChange={(e) =>
            setApptData({ ...apptData, patientId: e.target.value })
          }
          disabled={!!patientId}
          required
        >
          <option value="">Pick Patient</option>
          {clinicPatients.map((p) => (
            <option key={p.patientId} value={p.patientId}>
              {p.fullName}
            </option>
          ))}
        </select>

        <TextInput
          label="Title"
          value={apptData.apptTitle}
          onChange={(e) =>
            setApptData({ ...apptData, apptTitle: e.target.value })
          }
          required
          className="text-xs py-1 bg-white border-gray-400"
        />
        <TextInput
          label="Description"
          value={apptData.apptDesc}
          onChange={(e) =>
            setApptData({ ...apptData, apptDesc: e.target.value })
          }
          className="text-xs py-1 bg-white border-gray-400"
        />
        <TextInput
          label="Comments"
          value={apptData.apptComments}
          onChange={(e) =>
            setApptData({ ...apptData, apptComments: e.target.value })
          }
          className="text-xs py-1 bg-white border-gray-400"
        />
        <TextInput
          label="Date & Time"
          type="datetime-local"
          value={apptData.apptDateTime}
          onChange={(e) =>
            setApptData({ ...apptData, apptDateTime: e.target.value })
          }
          required
          className="text-xs py-1 bg-white border-gray-400"
        />
        <TextInput
          label="Cost ($)"
          type="number"
          value={apptData.apptCost}
          onChange={(e) =>
            setApptData({ ...apptData, apptCost: e.target.value })
          }
          className="text-xs py-1 bg-white border-gray-400"
        />
        <select
          className="w-full px-1.5 py-1 border border-gray-400 rounded-sm text-xs bg-white"
          value={apptData.apptStatus}
          onChange={(e) =>
            setApptData({
              ...apptData,
              apptStatus: e.target.value as 'Pending' | 'Completed',
            })
          }
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <TextInput
          label="Treatment"
          value={apptData.apptTreatment}
          onChange={(e) =>
            setApptData({ ...apptData, apptTreatment: e.target.value })
          }
          className="text-xs py-1 bg-white border-gray-400"
        />
        <TextInput
          label="Next Appointment"
          type="date"
          value={apptData.apptNextDate}
          onChange={(e) =>
            setApptData({ ...apptData, apptNextDate: e.target.value })
          }
          className="text-xs py-1 bg-white border-gray-400"
        />
        <TextInput
          label="Files (e.g., Invoice)"
          type="file"
          multiple
          onChange={(e) => setUploadedFiles(e.target.files)}
          className="text-xs bg-white"
        />

        {/* Sticky Footer Buttons */}
        <div className="flex justify-end gap-1.5 sticky bottom-0 bg-white pt-2">
          <CustomButton
            type="button"
            className="clinic-btn-secondary text-xs px-2 py-1 bg-gray-200"
            onClick={onCloseDialog}
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="submit"
            className="clinic-btn text-xs px-2 py-1 bg-clinicBlue text-white"
          >
            Save
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default AppointmentEditor;
