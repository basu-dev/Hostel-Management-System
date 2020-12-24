import { Observable } from 'rxjs';
import { Url } from './../urls';
import { Admin } from './../model/admin';
import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Student } from '../model/student';


@Injectable({
    providedIn:'root'
})
export class AuthService{

    constructor(private http: HttpClient){}

    registerAdmin(admin:Admin):Observable<any>{
        console.log(admin);
        return this.http.post(Url.rootUrl+Url.registerAdmin,admin)
    }
    registerStudent(student:Student):Observable<any>{
        console.log(student);
        return this.http.post(Url.rootUrl+Url.registerStudent,student)
    }
}