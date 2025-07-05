import { v4 as uuidv4 } from 'uuid';
import type { ClinicUser, ClinicPatient, ClinicAppointment } from '../types/clinic';

// Initialize users with sample data if not present
export const fetchUsers = (): ClinicUser[] => {
  const users = localStorage.getItem('clinicUsers');
  if (!users) {
    const initialUsers: ClinicUser[] = [
      { userId: uuidv4(), userRole: 'Admin', userEmail: 'admin@entnt.in', userPass: 'admin123' },
      { userId: uuidv4(), userRole: 'Patient', userEmail: 'john@entnt.in', userPass: 'patient123', linkedPatientId: 'p1' },
    ];
    localStorage.setItem('clinicUsers', JSON.stringify(initialUsers));
    return initialUsers;
  }
  return JSON.parse(users);
};

// Save users to localStorage
export const storeUsers = (users: ClinicUser[]) => {
  localStorage.setItem('clinicUsers', JSON.stringify(users));
};

// Initialize patients with sample data
export const fetchPatients = (): ClinicPatient[] => {
  const patients = localStorage.getItem('clinicPatients');
  if (!patients) {
    const initialPatients: ClinicPatient[] = [
      {
        patientId: 'p1',
        fullName: 'John Doe',
        birthDate: '1990-05-10',
        contactNumber: '1234567890',
        healthNotes: 'No allergies',
      },
    ];
    localStorage.setItem('clinicPatients', JSON.stringify(initialPatients));
    return initialPatients;
  }
  return JSON.parse(patients);
};

// Save patients to localStorage
export const storePatients = (patients: ClinicPatient[]) => {
  localStorage.setItem('clinicPatients', JSON.stringify(patients));
};

// Initialize appointments with sample data
export const fetchAppointments = (): ClinicAppointment[] => {
  const appointments = localStorage.getItem('clinicAppointments');
  if (!appointments) {
    const initialAppointments: ClinicAppointment[] = [
      {
        apptId: 'i1',
        patientId: 'p1',
        apptTitle: 'Toothache',
        apptDesc: 'Upper molar pain',
        apptComments: 'Sensitive to cold',
        apptDateTime: '2025-07-01T10:00:00',
        apptCost: 80,
        apptStatus: 'Completed',
        apptFiles: [{ fileName: 'invoice.pdf', fileUrl: 'data:application/pdf;base64,...' }],
      },
    ];
    localStorage.setItem('clinicAppointments', JSON.stringify(initialAppointments));
    return initialAppointments;
  }
  return JSON.parse(appointments);
};

// Save appointments to localStorage
export const storeAppointments = (appointments: ClinicAppointment[]) => {
  localStorage.setItem('clinicAppointments', JSON.stringify(appointments));
};