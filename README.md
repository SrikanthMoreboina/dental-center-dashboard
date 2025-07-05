# Dental Clinic Dashboard

A React-based frontend application for managing a dental clinic's patients, appointments, and treatment records, built for the ENTNT technical assignment (Frontend Developer - React).

## Overview
This project is a dental clinic management dashboard with role-based access for Admins and Patients. It uses **React 18**, **TypeScript**, **React Router v6**, **Context API**, **standard TailwindCSS v4**, and **localStorage**. The UI is clean, professional, and responsive.

## Features
- **Authentication**: Simulated login (`admin@entnt.in`/`admin123`, `john@entnt.in`/`patient123`).
- **Patient Management**: Admins can add, edit, delete, and view patients.
- **Appointment Management**: Manage appointments with title, description, comments, datetime, cost, status, treatment, next date, and file uploads (blob URLs).
- **Calendar View**: Monthly/weekly view with clickable days.
- **Dashboard**: KPIs and revenue chart for Admins; Patients see their appointments.
- **Patient View**: Profile and appointment history.
- **Responsive UI**: Mobile, tablet, and desktop support with ultra-compact modals.
- **File Uploads**: Multiple file uploads as blob URLs.
- **Navigation**: Top header with links (Home, Patients, Appointments, Calendar, Profile).

## Mock Data
- **Users**:
  - Admin: `admin@entnt.in`/`admin123` (role: Admin).
  - Patient: `john@entnt.in`/`patient123` (role: Patient, linked to `patient-1`).
- **Patients**:
  - `John Doe` (ID: `patient-1`, email: `john@entnt.in`).
  - `Jane Smith` (ID: `patient-2`, email: `jane@example.com`).
- **Appointments**:
  - `Routine Checkup` (patient: `John Doe`, date: `2025-07-10`, status: `Pending`, cost: $150).
  - `Tooth Filling` (patient: `Jane Smith`, date: `2025-07-15`, status: `Completed`, cost: $200).
- **Storage**: Initialized in `src/data/storage.ts` and stored in localStorage (`clinic_users`, `clinic_patients`, `clinic_appointments`).

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dental-center-dashboard.git
   cd dental-center-dashboard"# Dental-Clinic-Dashboard" 
