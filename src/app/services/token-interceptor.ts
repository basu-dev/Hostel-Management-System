import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
intercept(req:HttpRequest<any>,next:HttpHandler){
  var newreq=req.clone({
    setHeaders:{
      Authorization:`Bearer ${localStorage.getItem("userToken")}`
    }
  })
  return next.handle(newreq)

}

  constructor() { }
}
