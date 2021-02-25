import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Notice } from 'src/app/model/notices';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NoticeService } from 'src/app/services/app.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {
@Input() for:String;
  constructor(public noticeService:NoticeService,
    private alertify:AlertifyService,
    private router:Router
    ) { }
    componentName:String;
    notices:Notice[];
    noticeSub:Subscription;
    ngOnInit(): void {
      this.componentName = this.for+" Notices";
      this.startSubscription();
      this.noticeService.fetchAllNotices(this.for.toLocaleLowerCase())}
  fullNotice(id:String){
    this.router.navigate(["noticeDetail",id]);
  }
startSubscription(){
  (this.for=="Hostel")?this.hostelNoticeSubscribe():this.meshoticeSubscribe();
}
    hostelNoticeSubscribe(){
     this.noticeSub = this.noticeService.hostelNoticeSub.subscribe(
        data=>this.notices= data
      )
    }
  meshoticeSubscribe(){
   this.noticeSub =   this.noticeService.meshNoticeSub.subscribe(
        data=>this.notices= data
      )
    }
//     ngOnDestroy():void{
// this.noticeSub.unsubscribe();
//     }
}
