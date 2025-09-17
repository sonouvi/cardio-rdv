import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  currentStep = 1;

  firstFormGroup = this._formBuilder.group({
    consultationType: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    appointmentDate: ['', Validators.required],
    appointmentTime: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    patientName: ['', Validators.required],
    patientEmail: ['', [Validators.required, Validators.email]],
    patientPhone: ['', Validators.required],
  });

  availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  constructor(
    private _formBuilder: FormBuilder, 
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {}

  nextStep() {
    if (this.currentStep === 1 && this.firstFormGroup.valid) {
      this.currentStep++;
    } else if (this.currentStep === 2 && this.secondFormGroup.valid) {
      this.currentStep++;
    }
  }

  prevStep() {
    this.currentStep--;
  }

  submit() {
    if (this.thirdFormGroup.valid) {
      const appointmentData = {
        firstFormGroup: this.firstFormGroup.value,
        secondFormGroup: this.secondFormGroup.value,
        thirdFormGroup: this.thirdFormGroup.value,
      };
      const newAppointment = this.appointmentService.createAppointment(appointmentData);
      this.appointmentService.addAppointment(newAppointment);
      this.router.navigate(['/confirmation']);
    }
  }
}