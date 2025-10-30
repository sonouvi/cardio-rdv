import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe((isLoggedIn) => {
        if (!isLoggedIn) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
          return;
        }
        console.log('LOGGIN DATA', this.loginForm.value);
        this.router.navigate(['/appointments']);
      });
    }
  }
}