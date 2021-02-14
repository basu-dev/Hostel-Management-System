import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IsAuthenticated } from 'src/ngrx/auth/auth.action';
import { authReducer, State } from 'src/ngrx/auth/auth.reducer';
import { AppService } from './services/app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private appService: AppService,
    private store: Store<{ auth: State }>
    ){}
  student  = this.appService.student;
  isAuthenticated=false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.store.pipe(
      map(data=>data.auth.IsAuthenticated)
    ).subscribe(
      data=>this.isAuthenticated=data
    )
  }

}
