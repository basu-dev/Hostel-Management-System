
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { authEnum } from '../model/auth.enum';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate  {
  constructor(private authSerivce: AuthService, private router: Router,
              private alertify: AlertifyService) {}
  canActivate(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot) {
                     console.log("student guard" )

    return (this.authSerivce.currentUser == authEnum.IsStudent);
    }
}
