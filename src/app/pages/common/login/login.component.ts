import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/model/login';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,
      private alertify:AlertifyService  ,
      private builder: FormBuilder,
    ) { }
    loginForm:FormGroup;
  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username:['santosh549',Validators.required],
      password:['hostel123',[Validators.required,Validators.minLength(5)]],
    });
  }
  login(){
    console.log("loggin in")
    this.authService.login(this.loginForm.value);
  }
  get username(){
   return this.loginForm.get('username')
  }
  get password(){
    return this.loginForm.get('password');
  }

}
