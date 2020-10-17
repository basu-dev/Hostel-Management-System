import { AdminService } from './../../_services/admin.service';
import { Admin } from './../../_models/admin.model';
import { Router } from '@angular/router';
import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  showLoader = false;
  loginForm: FormGroup;
  allAdmins: Admin[] = [];
  constructor(private authService: AuthService, private alertify: AlertifyService,
              private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.getAllUsers();
    this.initLoginForm();
  }

  getAllUsers() {
    this.adminService.getAllAdmins().snapshotChanges().subscribe(
      ((item) => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.allAdmins.push(x as Admin);
        });
      })
    );
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.showLoader = true;
    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;
    for (let item of this.allAdmins) {
      if (item.email === email.trim().toLowerCase() && item.password === password.trim()) {
        this.authService.adminLogin(item);
        if (this.authService.isAdminLoggedIn()) {
          this.alertify.success('Logged in Successfully');
          this.showLoader = false;
          this.router.navigate(['/usersList']);
        } else {
          this.showLoader = false;
          this.alertify.error('Invalid Credentials');
        }
      }
    }
    if (!this.authService.isAdminLoggedIn()) {
      this.alertify.error('Invalid Credentials');
      this.showLoader = false;
    }
  }

}
