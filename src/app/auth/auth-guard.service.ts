import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    return this.authService.isAuthenticated();
  }

  canLoad() {
    return this.authService.isAuthenticated().pipe(take(1));
  }
}
