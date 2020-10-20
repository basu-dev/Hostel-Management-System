import { Admin } from './../_models/admin.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URL} from "./urls";
import { Subject } from 'rxjs';
// import {catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  allAdmins: any;

constructor(private http:HttpClient) { }
public adminSub = new Subject<Admin[]>();
getAllAdmins() {
  this.http.get(`${URL.base}${URL.adminList}`).subscribe(
   res=>{this.allAdmins=res,
          this.adminSub.next(this.allAdmins);
  },
   err=>console.log(err)
  )
}
handleError(){
  
}

insertAllAdmin(admin: Admin) {
  return this.http.post("/register",admin);
}

}
