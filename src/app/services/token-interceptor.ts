import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { UiServiceService } from './ui-service.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor(private uiService:UiServiceService) { }
intercept(req:HttpRequest<any>,next:HttpHandler){
  this.uiService.startLoading();
  var newreq=req.clone({
    setHeaders:{
      "x-auth-token":`${localStorage.getItem("token")}`
    }
  })
  return next.handle(newreq)
  .pipe(
    tap((res:any)=>{
      if(res?.body){
        this.uiService.stopLoading();
      }
    }),
    catchError((error: HttpErrorResponse) => {
      this.uiService.stopLoading();
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
        // else if (error.status==404){
        //   errorMessage=="Page Not Found"
        // }
        else{

          errorMessage = error.error.msg;
        }
        // server-side error
      }
      return throwError(errorMessage);
    })
  )

}


}
