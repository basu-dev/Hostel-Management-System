import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import * as alertify from "alertify";

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
constructor(private toastr:ToastrService) { }

confirm(title: string, message: string, funC: () => any, funCan: () => any) {
  alertify.confirm( title, message, funC(), funCan());
}

success(message: string) {
  this.toastr.success(message);
}

error(message: string) {
  this.toastr.error(message);
}

warning(message: string) {
  alertify.warning(message);
}

message(message: string) {
  console.log(message);
  alertify.message(message);
}
}
