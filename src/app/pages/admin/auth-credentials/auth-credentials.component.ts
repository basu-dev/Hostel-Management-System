import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-credentials',
  templateUrl: './auth-credentials.component.html',
  styleUrls: ['./auth-credentials.component.scss']
})
export class AuthCredentialsComponent implements OnInit {

  constructor(private authService:AuthService,private alertify:AlertifyService,private fb:FormBuilder) { }
  whoseCredentials="student";
  @ViewChild('passwordField') private passwordField: ElementRef;
  passwordShown=false;

  get isStudent(){return this.whoseCredentials == "student"};
 get isMesh(){return this.whoseCredentials == "messstaff"};
  get isHostel(){return this.whoseCredentials == "hostelstaff"};
   user:FormGroup;
   foundUser:any;
  credentials:any[];
  ngOnInit() {
    this.user = this.fb.group({
      userName:['073BEX422',Validators.required]
    })
    this.authService.getLoginDetails("student").subscribe(
      (data:any)=>{
        this.credentials = data.data;
      },
      (err:any)=>{
        this.alertify.error(err)
      }
    )
    this.loadCredentials();
  }
  loadCredentials():void{
    this.authService.getLoginDetails(this.whoseCredentials).subscribe(
      data=>console.log(data),
      err=>this.alertify.error(err)
    )
  }
  getCredentials(){
    this.foundUser=null;
    var userName = this.user.get('userName')?.value;
    this.authService.getLoginDetailUser(userName).subscribe(
      (data:any)=>{
        this.foundUser= data.data;
      },
      (err:any)=>this.alertify.error(err)
    )
    // var credential = this.credentials.filter((e:any)=>e.username==userName || e.rollNo==userName)[0];
    // console.log(credential);
    // this.foundUser= credential;
  }  
public  credential(role:string){
  this.whoseCredentials = role;
  this.loadCredentials();
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

}
}
