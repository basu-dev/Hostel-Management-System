import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
intercept(req:HttpRequest<any>,next:HttpHandler){
  var newreq=req.clone({
    setHeaders:{
      "x-auth-token":`${localStorage.getItem("token")}`
    }
  })
  return next.handle(newreq)
  .pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        console.log("asdflksdjaflkasdjflksdajf;l")
        // client-side error
        errorMessage = `Error: ${error.statusText}`;
      } else {
        console.log(error);
        if(error.status == 0){
          errorMessage = "Check your connection";
          
        }
        else{

          errorMessage = error.error.msg;
        }
        // server-side error
      }
      return throwError(errorMessage);
    })
  )

}

  constructor() { }
}
