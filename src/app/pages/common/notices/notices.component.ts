import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  constructor(public noticeService:AppService) { }

  ngOnInit(): void {
    this.noticeService.getNotices().subscribe(
      data=>{
        console.log(data)
      },
      err=>{
        console.log(err)
      }
    )
  }

}
