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
public refreshPriceTable = new Subject<boolean>();
public foodItemSub = new Subject<any>();
enrollStudent(rollNo:String,enroll:boolean):Observable<any>{
  return this.http.put(Url.enrollStudentMess+"/"+rollNo+"?mess="+enroll,{});
}

getPriceTable():Observable<any>{
  return this.http.get(Url.mess+"/getallitems");
}
addFoodItem(item:any):Observable<any>{
  return this.http.post(Url.mess+"/addfooditem",item);
}
editFoodItem(id:String,item:any):Observable<any>{
  return this.http.put(Url.mess+"/updateItem/"+id,item);
}
deleteFoodItem(id:String):Observable<any>{
  return this.http.delete(Url.mess+"/deleteItem/"+id);
}
getAllMessStudents():Observable<any>{
  return this.http.get(Url.mess+"/enrolledmembers/all")
}

registerDailyConsumption(data:any):Observable<any>{
  return this.http.post(Url.mess+"/dailyconsumption",data)
}
makePayment(data:any):Observable<any>{
  return this.http.put(Url.mess+"/payment/makepayment",data)

}
getDueAmount(id:String):Observable<any>{
  return this.http.get(Url.mess+"/payment/currentStatus/"+id);
  
}

getPaymentHistory(id:String):Observable<any>{
  return this.http.get(Url.mess+"/payment/findhistory?std_id="+id);
  
}
}
