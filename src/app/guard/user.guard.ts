import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return true
    // if (this.authService.isStudentLoggedIn()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/']);
    //   this.alertify.error('Access Denied');
    //   return false;
    // }
  }
}
