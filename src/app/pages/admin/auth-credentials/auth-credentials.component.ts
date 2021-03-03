import { Input, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessService } from 'src/app/services/mess.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-auth-credentials',
  templateUrl: './auth-credentials.component.html',
  styleUrls: ['./auth-credentials.component.scss']
})
export class AuthCredentialsComponent implements OnInit {

  constructor(private studentService:StudentsService,
    private messService:MessService,
    private authService:AuthService,
    private alertify:AlertifyService,
    private fb:FormBuilder) { }
  whoseCredentials="student";
  @ViewChild('passwordField') private passwordField: ElementRef;
  passwordShown=false;
  @Input() fromMesh=false;
  @Input() title="Authentication Credentials";

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

    if(this.fromMesh){
      console.log("From Mesh")

    }else{
    }
  }

  getCredentials(){
    if(this.fromMesh){
      this.getCredentialMesh();
      return;
    }
    this.foundUser=null;
    var userName = this.user.get('userName')?.value;
    this.authService.getLoginDetailUser(userName).subscribe(
      (data:any)=>{
        console.log(data.data)
        this.foundUser= data.data;
      },
      (err:any)=>this.alertify.error(err)
    )
  }
  getCredentialMesh(){
    this.messService.showEnroll.next(false)
    this.foundUser=null;
    var userName = this.user.get('userName')?.value;
    this.studentService.getStudentByUsername(userName).subscribe(
      (data:any)=>{
        console.log(data.data)
        this.foundUser= data.data;
        this.messService.showEnroll.next(true)
        this.messService.studentSub.next(data.data)
      },
      (err:any)=>{this.alertify.error(err)
        this.messService.showEnroll.next(false)

      }
    )
  }  
// public  credential(role:string){
//   this.whoseCredentials = role;
//   this.loadCredentials();
// }


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
