import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Appointment, APPOINTMENT_LIST } from './appointment-list/appointment.model';



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentsCollection = APPOINTMENT_LIST;

  constructor() { }

  getAppointments(): Observable<Appointment[]> {
    return of(this.appointmentsCollection)
  }

  addAppointment(appointment: Appointment) {
    this.appointmentsCollection.push(appointment);
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
