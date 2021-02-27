import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-credentials',
  templateUrl: './auth-credentials.component.html',
  styleUrls: ['./auth-credentials.component.scss']
})
export class AuthCredentialsComponent implements OnInit {

  constructor(private authService:AuthService,private alertify:AlertifyService) { }
  whoseCredentials="student";
  get isStudent(){return this.whoseCredentials == "student"};
 get isMesh(){return this.whoseCredentials == "messstaff"};
  get isHostel(){return this.whoseCredentials == "hostelstaff"};
  ngOnInit() {
    this.authService.getLoginDetails("student").subscribe(
      (data:any)=>{
        console.log(data)
      },
      (err:any)=>{
        this.alertify.error(err)
      }
    )
  }
  loadCredentials():void{
    this.authService.getLoginDetails(this.whoseCredentials).subscribe(
      data=>console.log(data),
      err=>this.alertify.error(err)
    )
  }
public  credential(role:string){
  this.whoseCredentials = role;
  this.loadCredentials();
}
}
