import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

constructor() { 

}
public notificationSub = new Subject<boolean>();
public loadingSub = new Subject<boolean>();
public startLoading(){
  this.loadingSub.next(true);
}
public stopLoading(){
  this.loadingSub.next(false)
}

}
