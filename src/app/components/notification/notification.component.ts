import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Url } from 'src/app/urls';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private http:HttpClient,
    private alertify:AlertifyService,
    private uiService:UiServiceService,
    private el: ElementRef
    ) { }
    notifications:Notification[];
    showNotification=false;
    private notificationSubscription:Subscription;
  ngOnInit() {

   this.notificationSubscription= this.uiService.notificationSub.subscribe(
      data=>{
        this.showNotification=data;
        if(data==true){ 
          this.getNotification();
          this.el.nativeElement.style.display="block"
        }else{
          this.el.nativeElement.style.display="none"

        }
      }
    )
  }

  getNotification(){
    console.log("Notification Called")
    this.http.get(Url.rootUrl+"/notification").subscribe(
      (data:any)=>{this.notifications=data.data
     console.log(this.notifications)
      },
      (err:any)=>this.alertify.error(err)
    )
  }
  ngOnDestroy(){
    this.notificationSubscription.unsubscribe();
  }

}
