import { Admin } from './../_models/admin.model';
import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private alertify: AlertifyService, private router: Router) { }

  userLogin(user: User) {
    localStorage.setItem('userId', user.$key);
    localStorage.setItem('userName', user.name);
  }

  adminLogin(admin: Admin) {
    localStorage.setItem('adminId', admin.$key);
    localStorage.setItem('userName', admin.email);
  }

  isUserLoggedIn() {
    return !!localStorage.getItem('userId') && localStorage.getItem('userName');
  }

  isAdminLoggedIn() {
    return !!localStorage.getItem('adminId') && localStorage.getItem('userName');
  }

  logout() {
    if (this.isUserLoggedIn() || this.isAdminLoggedIn()) {
      localStorage.clear();
      this.alertify.success('Logged out');
      this.router.navigate(['/userLogin']);
    } else {
      this.alertify.error('Please login first');
    }
  }
}
