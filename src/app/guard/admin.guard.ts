
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild  {
  constructor(private authSerivce: AuthService, private router: Router,
              private alertify: AlertifyService) {}
  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
                     console.log(this.authSerivce.isAdmin)
    return this.authSerivce.isAdmin;
    }
}
