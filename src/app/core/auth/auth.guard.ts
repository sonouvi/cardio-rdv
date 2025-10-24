
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const AuthGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
  if(!authService.isLoggedIn()){
    router.navigate(['/login'])
    return false;
  }

  return true;

}
