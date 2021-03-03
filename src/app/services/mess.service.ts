import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Url } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class MessService {

constructor(private http:HttpClient) { }

public showEnroll=new Subject<boolean>();
public studentSub = new Subject<any>();
enrollStudent(rollNo:String,enroll:boolean):Observable<any>{
  return this.http.put(Url.enrollStudentMess+"/"+rollNo+"?mess="+enroll,{});
}

getPriceTable():Observable<any>{
  return this.http.get(Url.mess+"/getallitems");
}

}
