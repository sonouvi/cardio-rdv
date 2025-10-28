import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';

type TypeConsultation = {
  code: string;
  label: string;
};

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  currentStep = 1;

  TypesConsultation: Record<string, TypeConsultation> = {
    PREMIERE_CONSULTATION: { code: 'PC', label: 'Première consultation' },
    CONSULTATION_SUIVI: { code: 'CS', label: 'Consultation de suivi' },
    URGENCE: { code: 'UR', label: 'Urgence' },
  };

  firstFormGroup = new FormGroup({
    consultationType: new FormControl('', Validators.required),
  });

  secondFormGroup = new FormGroup({
    appointmentDate: new FormControl(new Date(), Validators.required),
    appointmentTime: new FormControl('', Validators.required),
  });

  thirdFormGroup = new FormGroup({
    patientName: new FormControl('', Validators.required),
    patientEmail: new FormControl('', [Validators.required, Validators.email]),
    patientPhone: new FormControl('', Validators.required),
  });

  availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  constructor(
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
      console.log('NEW APPOINTMENT DATA:', appointmentData);
      const newAppointment =
        this.appointmentService.createAppointment(appointmentData);
      this.appointmentService.addAppointment(newAppointment);
      this.router.navigate(['/confirmation']);
    }
  }
  get consultationTypesArray() {
    return Object.values(this.TypesConsultation);
  }
}