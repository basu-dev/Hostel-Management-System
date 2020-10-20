import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from './../../_services/alertify.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  showLoader = false;
  loginForm: FormGroup;
  allUsers: User[] = [];
  constructor(private router: Router, private alertify: AlertifyService,
              private userService: UsersService, private authService: AuthService) { }

  ngOnInit() {
    this.getAllUsers();
    this.initLoginForm();
  }

  getAllUsers() {
    this.userService.getUsersList().snapshotChanges().subscribe(
      ((item) => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['_id'] = element.key;
          this.allUsers.push(x as User);
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
    for (let item of this.allUsers) {
      if (item.email === email.trim().toLowerCase() && item.password === password.trim()) {
        this.authService.userLogin(item);
        if (this.authService.isUserLoggedIn()) {
          this.alertify.success('Logged in Successfully');
          this.showLoader = false;
          this.router.navigate(['/userDetails']);
        } else {
          this.showLoader = false;
          this.alertify.error('Invalid Credentials');
        }
      }
    }
    if (!this.authService.isUserLoggedIn()) {
      this.alertify.error('Invalid Credentials');
      this.showLoader = false;
    }
  }

}
