import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild  {
  constructor(private authSerivce: AuthService, private router: Router,
              private alertify: AlertifyService) {}
  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
    return true
            if (this.authSerivce.isAdminLoggedIn()) {
              return true;
            } else {
              this.router.navigate(['/']);
              this.alertify.error('Access Denied');
              return false;
            }
    }
}
