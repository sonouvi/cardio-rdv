import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AuthGuard } from './core/auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  {
    path: 'appointments',
    component: AppointmentListComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/booking', pathMatch: 'full' },
  { path: '**', redirectTo: '/booking' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
