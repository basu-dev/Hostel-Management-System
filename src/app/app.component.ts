import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { authEnum } from './model/auth.enum';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(
    private router:Router,
    private authService:AuthService

    

    ){}
    private authSub = new Subscription();
  isAuthenticated=false;
  ngOnInit(): void {
    console.log("listenning");
   this.authSub =  this.authService.authSub.subscribe(
      data=>{if(data.role == authEnum.IsUnauthenticated){
        this.isAuthenticated=false;
        this.router.navigateByUrl("/auth/login")
      }else{
        this.isAuthenticated = true;
      }}
    )
    this.authService.startupAuthenticate();
  }
  ngOnDestroy():void{
this.authSub.unsubscribe();
  }

}
