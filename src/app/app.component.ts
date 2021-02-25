import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IsAuthenticated } from 'src/ngrx/auth/auth.action';
import { authReducer, State } from 'src/ngrx/auth/auth.reducer';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(
    private store: Store<{ auth: State }>,
    private router:Router,
    private authService:AuthService

    

    ){}

  isAuthenticated=false;
  ngOnInit(): void {
    this.authService.startupAuthenticate();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.store.pipe(
      map(data=>data.auth.IsAuthenticated)
    ).subscribe(
      data=>{this.isAuthenticated=data;
        console.log(data);
        if(data==false){
          this.router.navigateByUrl('/auth/login');
        }
        else{
         
        }
      }
    )
  }

}
