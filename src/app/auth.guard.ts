import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
