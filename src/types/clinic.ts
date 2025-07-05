// Type definitions for clinic data
export interface ClinicUser {
  userId: string;
  userRole: 'Admin' | 'Patient';
  userEmail: string;
  userPass: string;
  linkedPatientId?: string;
}

export interface ClinicPatient {
  patientId: string;
  fullName: string;
  birthDate: string;
  contactNumber: string;
  healthNotes: string;
}

export interface ClinicAppointment {
  apptId: string;
  patientId: string;
  apptTitle: string;
  apptDesc: string;
  apptComments: string;
  apptDateTime: string;
  apptCost?: number;
  apptStatus?: 'Pending' | 'Completed';
  apptTreatment?: string;
  apptNextDate?: string;
  apptFiles?: { fileName: string; fileUrl: string }[];
}