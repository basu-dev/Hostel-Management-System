import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-credentials',
  templateUrl: './student-credentials.component.html',
  styleUrls: ['./student-credentials.component.scss']
})
export class StudentCredentialsComponent implements OnInit {

  constructor() { }
@Input() foundUser:any;
passwordShown=false;
@ViewChild('passwordField') private passwordField: ElementRef;

  ngOnInit() {
    console.log(this.foundUser);
  }
  togglePasswordShow():void{
    console.log(this.passwordShown);
   var  inputType= this.passwordField.nativeElement;
    if(this.passwordShown){
      inputType.type="password";
      this.passwordShown=false;
    }else{
      inputType.type="text";
      this.passwordShown=true;
    }

}}
