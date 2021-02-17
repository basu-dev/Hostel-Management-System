import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notice } from 'src/app/model/notices';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  constructor(public noticeService:AppService,
    private alertify:AlertifyService,
    private router:Router
    ) { }
notices:Notice[];
  ngOnInit(): void {
    this.noticeService.getNotices().subscribe(
      data=>{
        this.notices = data;
      },
      err=>{
        this.alertify.error(err)
      }
    )
  }
  fullNotice(id:String){
    this.router.navigate(["noticeDetail",id]);
  }

}
