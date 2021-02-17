import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import * as alertify from "alertify";

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
constructor() { }

confirm(title: string, message: string, funC: () => any, funCan: () => any) {
  alertify.confirm( title, message, funC(), funCan());
}

success(message: string) {
  alert(message);
}

error(message: string) {
  alert(message);
}

warning(message: string) {
  alertify.warning(message);
}

message(message: string) {
  console.log(message);
  alertify.message(message);
}
}
