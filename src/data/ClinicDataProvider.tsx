import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { ClinicPatient, ClinicAppointment } from '../types/clinic';
import { fetchPatients, storePatients, fetchAppointments, storeAppointments } from '../helpers/storage';

// Context for clinic data management
interface ClinicData {
  clinicPatients: ClinicPatient[];
  clinicAppointments: ClinicAppointment[];
  addNewPatient: (patient: Omit<ClinicPatient, 'patientId'>) => void;
  updateExistingPatient: (id: string, patient: Omit<ClinicPatient, 'patientId'>) => void;
  removePatient: (id: string) => void;
  addNewAppointment: (appointment: Omit<ClinicAppointment, 'apptId'>) => void;
  updateExistingAppointment: (id: string, appointment: Omit<ClinicAppointment, 'apptId'>) => void;
  removeAppointment: (id: string) => void;
}

export const ClinicDataContext = createContext<ClinicData>({
  clinicPatients: [],
  clinicAppointments: [],
  addNewPatient: () => {},
  updateExistingPatient: () => {},
  removePatient: () => {},
  addNewAppointment: () => {},
  updateExistingAppointment: () => {},
  removeAppointment: () => {},
});

export const ClinicDataProvider = ({ children }: { children: ReactNode }) => {
  const [clinicPatients, setClinicPatients] = useState<ClinicPatient[]>(fetchPatients());
  const [clinicAppointments, setClinicAppointments] = useState<ClinicAppointment[]>(fetchAppointments());

  // Persist patients to localStorage
  useEffect(() => {
    storePatients(clinicPatients);
  }, [clinicPatients]);

  // Persist appointments to localStorage
  useEffect(() => {
    storeAppointments(clinicAppointments);
  }, [clinicAppointments]);

  // Add a new patient
  const addNewPatient = (patient: Omit<ClinicPatient, 'patientId'>) => {
    const newPatient = { ...patient, patientId: crypto.randomUUID() };
    setClinicPatients([...clinicPatients, newPatient]);
  };

  // Update an existing patient
  const updateExistingPatient = (id: string, updatedPatient: Omit<ClinicPatient, 'patientId'>) => {
    setClinicPatients(clinicPatients.map(p => (p.patientId === id ? { ...p, ...updatedPatient } : p)));
  };

  // Remove a patient and their appointments
  const removePatient = (id: string) => {
    setClinicPatients(clinicPatients.filter(p => p.patientId !== id));
    setClinicAppointments(clinicAppointments.filter(a => a.patientId !== id));
  };

  // Add a new appointment
  const addNewAppointment = (appointment: Omit<ClinicAppointment, 'apptId'>) => {
    const newAppointment = { ...appointment, apptId: crypto.randomUUID() };
    setClinicAppointments([...clinicAppointments, newAppointment]);
  };

  // Update an existing appointment
  const updateExistingAppointment = (id: string, updatedAppointment: Omit<ClinicAppointment, 'apptId'>) => {
    setClinicAppointments(clinicAppointments.map(a => (a.apptId === id ? { ...a, ...updatedAppointment } : a)));
  };

  // Remove an appointment
  const removeAppointment = (id: string) => {
    setClinicAppointments(clinicAppointments.filter(a => a.apptId !== id));
  };

  return (
    <ClinicDataContext.Provider
      value={{
        clinicPatients,
        clinicAppointments,
        addNewPatient,
        updateExistingPatient,
        removePatient,
        addNewAppointment,
        updateExistingAppointment,
        removeAppointment,
      }}
    >
      {children}
    </ClinicDataContext.Provider>
  );
};