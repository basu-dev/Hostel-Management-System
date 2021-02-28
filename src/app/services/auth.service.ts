import { Observable, of, Subject } from 'rxjs';
import { Url } from './../urls';
import { Admin } from './../model/admin';
import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Student } from '../model/student';
import { LoginModel } from '../model/login';
import jwt_decode from "jwt-decode";
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { authEnum } from '../model/auth.enum';
import { AuthCredentials } from '../model/authCredentials';
@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http: HttpClient,
    //   private  store:Store<{auth:fromAuth.State}>,
      private router:Router,
      private alerfity:AlertifyService
        ){}
    isiAuthenticated = false;
    authCredentials:AuthCredentials;
     setAuthCredential(credential:AuthCredentials){
        this.authCredentials = credential;
        console.log(this.authCredentials);
        this.authCredentialSub.next(this.authCredentials);
    }
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
    public authSub = new Subject<{role:authEnum,user:AuthCredentials}>();
    public authCredentialSub = new Subject<AuthCredentials>();
     authUser:any;
    login(credentials:LoginModel):any{
        this.http.post<{token:any}>(Url.login,credentials).subscribe(
          (data:any)=>{
              this.authUser = data.user;
              let decoded:any = jwt_decode(data.data.token)
              this.savedata(data.data)
              this.setAuthCredential(decoded);
                 this.authenticate(decoded.role);
              if(!decoded.isPasswordChanged){
                  this.router.navigateByUrl("/auth/resetpassword");
                  return
                }
                else{
                  this.navigate();
           }
        },
        err=>this.alerfity.error(err)
       )
    
    }
    changePasswordByUser(password:String):Observable<any>{
        return this.http.put(Url.resetPasswordUser,{newpassword:password});
    }
    assignRole(role:authEnum){
        this.currentUser = role;
        console.log("pushing",role);
        this.authSub.next({role,user:this.authCredentials});
    }
    authenticate(role:String){
        switch(role){
            case "admin":
                this.assignRole(authEnum.IsAdmin);
                // this.store.dispatch({type:ActionTypes.ActionTypes.IS_ADMIN});
                break;
            case "student":
                this.assignRole(authEnum.IsStudent);
                // this.store.dispatch({type:ActionTypes.ActionTypes.IS_STUDENT})
                break;
            case "hostelstaff":
                this.assignRole(authEnum.IsHostelStaff);
                // this.store.dispatch({type:ActionTypes.ActionTypes.IS_HOSTEL_STAFF})
                break;
                case "messstaff":
                    this.assignRole(authEnum.IsMeshStaff);
                    // this.store.dispatch({type:ActionTypes.ActionTypes.IS_MESH_STAFF})
                    break;
                default :
                
                this.logout();

          }    }
    savedata(data:any){
        console.log(data);
        localStorage.setItem('token',data.token);

    }
    getLoginDetails(role:String):Observable<any>{
        return this.http.get(Url.loginCredentials+`?role=${role}`)
    }
    getLoginDetailUser(userName:String):Observable<any>{
        return this.http.get(Url.loginCredentialSingle+`/${userName}`)
    }
    get getIsStudent(){
        return this.currentUser == authEnum.IsStudent
      }
     get  getIsAdmin(){
        return this.currentUser == authEnum.IsAdmin
      }
     get getIsHostelStaff(){
        return this.currentUser == authEnum.IsHostelStaff
      }
     get getIsMessStaff(){
        return this.currentUser == authEnum.IsMeshStaff
      }
    startupAuthenticate(){
        try{
             let decoded:AuthCredentials = jwt_decode(localStorage.getItem('token')!);
             this.setAuthCredential(decoded);
             this.authCredentials = decoded;
            this.authenticate(decoded.role);
            this.navigate();
        }catch(e){
            this.logout();
        }
    };
    logout(){
        localStorage.clear();
        // this.store.dispatch({type:ActionTypes.ActionTypes.IS_UNAUTHENTICATED});
        this.assignRole(authEnum.IsUnauthenticated);
    }
    navigate():void{
        // if(this.currentUser == authEnum.IsStudent){
        //     this.router.navigateByUrl("/student")
        // }
        // else{
        //     this.router.navigateByUrl('/admin');
        // }
    }

}