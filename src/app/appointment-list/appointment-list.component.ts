import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment, AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit, OnDestroy {

  appointments: Appointment[] = [];
  private appointmentSubscription: Subscription | undefined;
  displayedColumns: string[] = ['patientName', 'appointmentDate', 'appointmentTime', 'consultationType', 'patientEmail', 'patientPhone'];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentSubscription = this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
    });
  }

  ngOnDestroy(): void {
    if (this.appointmentSubscription) {
      this.appointmentSubscription.unsubscribe();
    }
  }

}
