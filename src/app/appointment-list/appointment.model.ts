export interface Appointment {
  id?: string;
  consultationType: string;
  appointmentDate: Date;
  appointmentTime: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
}

export const APPOINTMENT_LIST: Appointment[] = [
  { 
    id: '1', 
    consultationType: 'Cardiology', 
    appointmentDate: new Date('2024-07-01'), 
    appointmentTime: '10:00 AM', 
    patientName: 'John Doe', 
    patientEmail: 'john.doe@example.com',
    patientPhone: '123-456-7890'
  }
]