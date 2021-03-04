import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notice } from 'src/app/model/notices';
import { NoticeService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit {
@Input() for:String;
  constructor(public noticeService:NoticeService,
    private modalService:ModalService,
    private authService:AuthService
    ) { }
    componentName:String;
    notices:Notice[];
    error:String;
    noticeSub:Subscription;
    showNoticeModal=false;
    selectedNotice:Notice;
    totalNotices:number=0;
    showPagination=false;
    @Input() dataLenToShow=10;
    showControls = false;
    page:number=1;
    paginationId:string;
    ngOnInit(): void {
      this.componentName = this.for+" Notices";
      this.paginationId="paginate_"+this.for;
      this.fetchNotices();
      var myRole= this.authService.authCredentials.role;
      if(myRole.includes(this.for.toLowerCase())){
        this.refreshNotice();
      }
      else{
        if(this.for=="Hostel" && myRole=="admin"){
          this.refreshNotice()
        }
      }
    
    }
    refreshNotice(){
      // this.showControls=true;
      this.noticeService.refreshNoticeSub.subscribe(
        _=>this.fetchNotices()
      )
    }
    fetchNotices(){
      this.noticeSub= this.noticeService.fetchAllNotices(this.for.toLowerCase()).subscribe(
        (res:any)=>{this.notices=res.data;
          this.totalNotices=this.notices.length;
          console.log(this.notices)
          if(this.totalNotices>this.dataLenToShow){
            this.showPagination=true;
          }
          this.notices.forEach(x=>x.noticeBy=this.for)
        },
        (err:any)=>this.error="No notices yet."
      )
    }
  fullNotice(notice:Notice){
    this.selectedNotice=notice;
    this.showNoticeModal=true;
    this.modalService.open('custom-modal-notice');
  }
   SeeAll(){

   }
  edit(item:Notice){  

  }
  remove(id:String){

  }
    
    ngOnDestroy():void{
// this.noticeSub.unsubscribe();
    }
}
