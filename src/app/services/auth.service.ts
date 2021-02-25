import { Observable, of, Subject, throwError } from 'rxjs';
import { Url } from './../urls';
import { Admin } from './../model/admin';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Student } from '../model/student';
import { LoginModel } from '../model/login';
import {catchError, map, tap} from "rxjs/operators";
import { Store } from '@ngrx/store';
import * as ActionTypes from '../../ngrx/auth/auth.action';
import * as fromAuth from '../../ngrx/auth/auth.reducer';
import jwt_decode from "jwt-decode";
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { authEnum } from '../model/auth.enum';
@Injectable({
    providedIn:'root'
})
export class AuthService{

    constructor(private http: HttpClient,
      private  store:Store<{auth:fromAuth.State}>,
      private router:Router,
      private alerfity:AlertifyService
        ){}
    isAdmin=false;
    isStudent=false;
    isStaff=false;

    currentUser = authEnum.IsUnauthenticated;
    registerAdmin(admin:Admin):Observable<any>{
        console.log(admin);
        return this.http.post(Url.rootUrl+Url.registerAdmin,admin)
    }
    studentLogin(student:Student):Observable<any>{  
        return of(true);
    }
    // registerStudent(student:Student):Observable<any>{
    //     console.log(student);
    //     return this.http.post(Url.rootUrl+Url.registerStudent,student)
    // }
    public authSub = new Subject<authEnum>();
    get isStudentLoggedIn():boolean{
        return false;
    }
    get isAdminLoggedIn():boolean{
        return true;
    }
    login(credentials:LoginModel):any{
        this.http.post<{token:any}>(Url.login,credentials).subscribe(
          (data:any)=>{
              console.log(data)
           this.savedata(data.data)
           let decoded:any = jwt_decode(data.data.token)
           console.log(decoded);
              this.authenticate(decoded.role);
              this.router.navigateByUrl('/');
        },
        err=>this.alerfity.error(err)
       )
    
    }
    assignRole(role:authEnum){
        this.currentUser = role;
        this.authSub.next(this.currentUser);
    }
    authenticate(role:String){
        console.log(role)
        switch(role){
            case "admin":
                this.isAdmin=true;
                this.assignRole(authEnum.IsAdmin);
                this.store.dispatch({type:ActionTypes.ActionTypes.IS_ADMIN});
                break;
            case "student":
                this.store.dispatch({type:ActionTypes.ActionTypes.IS_STUDENT})
                this.assignRole(authEnum.IsStudent);
                break;
            case "hostelstaff":
                this.store.dispatch({type:ActionTypes.ActionTypes.IS_HOSTEL_STAFF})
                this.assignRole(authEnum.IsHostelStaff);
                break;
                case "meshstaff":
                    this.store.dispatch({type:ActionTypes.ActionTypes.IS_MESH_STAFF})
                    this.assignRole(authEnum.IsMeshStaff);
                    break;
                default :
                this.logout();

          }    }
    savedata(data:any){
        console.log(data);
        localStorage.setItem('token',data.token);

    }
    
    startupAuthenticate(){
        try{
             let token:{role:String} = jwt_decode(localStorage.getItem('token')!);
            this.authenticate(token.role);

        }catch(e){
            this.logout();
        }
    };
    logout(){
        this.isAdmin=false;
        localStorage.clear();
        this.store.dispatch({type:ActionTypes.ActionTypes.IS_UNAUTHENTICATED});
        this.assignRole(authEnum.IsUnauthenticated);
    }

}