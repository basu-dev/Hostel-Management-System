import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/validators/mustmatch.validator';

@Component({
  selector: 'app-change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.css']
})
export class ChangePasswordUserComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private alertify:AlertifyService,private router:Router) { }
  passwordForm:FormGroup;
  ngOnInit() {
    this.passwordForm = this.fb.group({
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmPassword:['',[]]
    },{
      validator: MustMatch('password', 'confirmPassword')
    })
  }
  get password(){
   return this.passwordForm.get('password');
  }
  get confirmPassword(){
   return this.passwordForm.get('confirmPassword');
  }
  resetPassword(){
    this.authService.changePasswordByUser(this.passwordForm.get('password')?.value).subscribe(
      data=>{
        console.log(data);
        this.authService.passowrdNotChanged=false;
        this.authService.startupAuthenticate();
      },
      err=>this.alertify.error(err)
    )
  }
  

}
