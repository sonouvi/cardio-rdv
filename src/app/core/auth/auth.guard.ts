import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';


export const AuthGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
  if(!authService.isLoggedIn()){
    router.navigate(['/login'])
    return false;
  }

  return true;

}
