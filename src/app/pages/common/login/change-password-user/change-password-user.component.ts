import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/validators/mustmatch.validator';

@Component({
  selector: 'app-change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.scss']
})
export class ChangePasswordUserComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  passwordForm:any;
  ngOnInit() {
    this.passwordForm = this.fb.group({
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmPassword:['',[]]
    },{
      validator: MustMatch('password', 'confirmPassword')
    })
  }
  get password(){
   return this.passwordForm.controls.get('password');
  }
  get confirmPassword(){
   return this.passwordForm.controls.get('confirmPassword');
  }
  resetPassword(){
    console.log("reset");
  }
  

}
