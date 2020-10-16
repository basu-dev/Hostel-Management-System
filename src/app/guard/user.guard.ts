import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.alertify.error('Access Denied');
      return false;
    }
  }
}
