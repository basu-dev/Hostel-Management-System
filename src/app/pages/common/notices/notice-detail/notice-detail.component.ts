import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notice } from 'src/app/model/notices';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.css']
})
export class NoticeDetailComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private noticeService:AppService,
    private alertify:AlertifyService

  ) { 
    this.id = this.route.snapshot.paramMap.get('id')!;
    

  }
  id:String;
  notice:Notice;
  ngOnInit() {

    this.noticeService.getNoticeById(this.id).subscribe(
      data=>this.notice=data,
      err=>this.alertify.error(err)
    )
  }

}
