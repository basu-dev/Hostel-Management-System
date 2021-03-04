import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService:AuthService,
      private alertify:AlertifyService  ,
      private builder: FormBuilder,
      private uiService:UiServiceService
    ) { }
    loginForm:FormGroup;
    loading=false;
  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(5)]],
    });
    this.listenLoading();
  }
  btnText="Login";
  listenLoading(){
    this.uiService.loadingSub.subscribe(
      data=>{
        console.log(data);
        if(data){
          this.btnText="Logging In ..."
        }else{
          this.btnText="Login"
        }
        this.loading=data;
      }
    )
  }
  login(){
    this.authService.login(this.loginForm.value);
  }
  get username(){
   return this.loginForm.get('username')
  }
  get password(){
    return this.loginForm.get('password');
  }

}
