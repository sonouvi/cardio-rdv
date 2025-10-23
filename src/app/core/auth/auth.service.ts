import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  readonly #isLoggedIn = signal(false);
  readonly router = inject(Router);

  readonly isLoggedIn = this.#isLoggedIn.asReadonly();

  login(email: string, password: string): Observable<Boolean> {
    const isLoggedIn = email === 'azerty@azerty.com' && password === '123456!';
    this.#isLoggedIn.set(isLoggedIn);
    return of(isLoggedIn);
  }

  logout(): void {
    this.#isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
