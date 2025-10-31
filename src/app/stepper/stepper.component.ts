import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { NAME_PATTERN, PHONE_PATTERN } from './stepper.model';

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

  existingAppointments = [
    { appointmentDate: '28/10/2025', appointmentTime: '09:00' },
    { appointmentDate: '28/10/2025', appointmentTime: '10:00' },
    { appointmentDate: '28/10/2025', appointmentTime: '11:00' },
    { appointmentDate: '28/10/2025', appointmentTime: '14:00' },
    { appointmentDate: '28/10/2025', appointmentTime: '15:00' },
    { appointmentDate: '30/10/2025', appointmentTime: '15:00' },
  ];

  firstFormGroup = new FormGroup({
    consultationType: new FormControl('', Validators.required),
  });

  secondFormGroup = new FormGroup({
    appointmentDate: new FormControl(new Date(), Validators.required),
    appointmentTime: new FormControl('', Validators.required),
  });

  thirdFormGroup = new FormGroup({
    patientName: new FormControl('', [
      Validators.required,
      Validators.pattern(NAME_PATTERN.PATTERN),
    ]),
    patientEmail: new FormControl('', [Validators.required, Validators.email]),
    patientPhone: new FormControl('', [Validators.required, Validators.pattern(PHONE_PATTERN.PATTERN)]),
    age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(120)]),
    observation: new FormControl(''),
    diagnostic: new FormControl(''),
    traitement: new FormControl(''),
    gender: new FormControl('', Validators.required),
  });

  availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    // Mettre à jour automatiquement si une date est déjà présente
    const date = this.secondFormGroup.controls.appointmentDate.value;
    if (date) {
      this.updateSelectedTime(date);
    }

    // Observer le changement de date
    this.secondFormGroup.controls.appointmentDate.valueChanges.subscribe(
      (date) => {
        this.updateSelectedTime(date);
      }
    );
  }

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

  // Fonction pour réinitialiser l'heure si elle est déjà réservée
  updateSelectedTime(selectedDate: Date | null) {
    if (!selectedDate) return;

    const day = selectedDate.getDate().toString().padStart(2, '0');
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = selectedDate.getFullYear();
    const dateStr = `${day}/${month}/${year}`;

    const selectedTime = this.secondFormGroup.controls.appointmentTime.value;
    const isTaken = this.existingAppointments.some(
      (appt) =>
        appt.appointmentDate === dateStr &&
        appt.appointmentTime === selectedTime
    );

    if (isTaken) {
      this.secondFormGroup.controls.appointmentTime.disable();
      this.secondFormGroup.controls.appointmentTime.reset();
    } 
  }

  // Fonction utilitaire pour savoir si un horaire est déjà réservé
  isTimeTaken(time: string): boolean {
    const date: Date | null =
      this.secondFormGroup.controls.appointmentDate.value;
    if (!date) return false;

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const dateStr = `${day}/${month}/${year}`;

    let isTimeTaken = this.existingAppointments.some(
      (appt) =>
        appt.appointmentDate === dateStr && appt.appointmentTime === time
    );
    return isTimeTaken;
  }

  get patientName() {
    return this.thirdFormGroup.get('patientName') as FormControl;
  }

  get patientEmail() {
    return this.thirdFormGroup.get('patientEmail') as FormControl;
  }

  get patientPhone() {
    return this.thirdFormGroup.get('patientPhone') as FormControl;
  }

get patientAge() { return this.thirdFormGroup.get('age')!; }
get patientObservation() { return this.thirdFormGroup.get('observation')!; }
get patientDiagnostic() { return this.thirdFormGroup.get('diagnostic')!; }
get patientTraitement() { return this.thirdFormGroup.get('traitement')!; }
get patientGender() { return this.thirdFormGroup.get('gender')!; }
}