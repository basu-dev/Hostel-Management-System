import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      username:['073BEX400',Validators.required],
      password:['$2b$10$ItxbI/5Gdwcf3DOIGhSE4eH0F4CEPNxiRgP8madznpy70Fv6t9FeK',[Validators.required,Validators.minLength(5)]],
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
