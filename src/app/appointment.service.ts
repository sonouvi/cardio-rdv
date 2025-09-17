import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Appointment {
  id?: string;
  consultationType: string;
  appointmentDate: Date;
  appointmentTime: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private firestore: Firestore = inject(Firestore);
  private appointmentsCollection = collection(this.firestore, 'appointments');

  constructor() { }

  getAppointments(): Observable<Appointment[]> {
    return collectionData(this.appointmentsCollection, { idField: 'id' }) as Observable<Appointment[]>;
  }

  addAppointment(appointment: Appointment): Promise<any> {
    return addDoc(this.appointmentsCollection, appointment);
  }

  createAppointment(formData: any): Appointment {
    return {
      consultationType: formData.firstFormGroup.consultationType,
      appointmentDate: formData.secondFormGroup.appointmentDate,
      appointmentTime: formData.secondFormGroup.appointmentTime,
      patientName: formData.thirdFormGroup.patientName,
      patientEmail: formData.thirdFormGroup.patientEmail,
      patientPhone: formData.thirdFormGroup.patientPhone,
    };
  }
}
