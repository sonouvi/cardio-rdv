import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

  logout() {
    this.authService.logout();
  }

  
}