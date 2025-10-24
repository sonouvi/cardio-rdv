import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../appointment.service';
import { Appointment } from './appointment.model';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit, OnDestroy {

  appointments: Appointment[] = [];
  private appointmentSubscription: Subscription | undefined;
  displayedColumns: string[] = ['patientName', 'appointmentDate', 'appointmentTime', 'consultationType', 'patientEmail', 'patientPhone'];
  visible: boolean = false;
  dataToUpdate: Appointment = {} as Appointment;

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

  onDelete(appointment: Appointment): void {
    // console.log("COMMENT", comment)
    // this.supabaseService.removeComment(comment.id).subscribe(()=>{
    //   console.log("DELETE OKAY")
    //   this.getData()
    // })
  }

  showDialog(appointment: Appointment): void {
    this.visible = true;

    // this.dataToUpdate = {
    //   id: 0,
    //   email: '',
    //   message: '',
    //   name: ''
    // }

    // this.dataToUpdate.id = id

    // this.updateCommentForm.patchValue({
    //   name: nameUpdate,
    //   email: emailUpdate,
    //   message: messageUpdate
    // })
  }

  onUpdate(): void {
    // this.dataToUpdate.name = this.updateCommentForm.value.name
    // this.dataToUpdate.email = this.updateCommentForm.value.email
    // this.dataToUpdate.message = this.updateCommentForm.value.message

    // this.supabaseService.updateComment(this.dataToUpdate).subscribe(()=>{
    //   console.log("UPDATE OKAY!!!!")
    //   this.getData()
    //   this.visible = false
    // })

  }

}
