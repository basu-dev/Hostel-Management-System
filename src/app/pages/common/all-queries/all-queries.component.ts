import { Component, OnInit, Query } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NoticeService } from 'src/app/services/app.service';

@Component({
  selector: 'app-all-queries',
  templateUrl: './all-queries.component.html',
  styleUrls: ['./all-queries.component.scss']
})
export class AllQueriesComponent implements OnInit {

  constructor(private noticeService:NoticeService,private alertify:AlertifyService) { }
  queries :Query[];
  ngOnInit() {
    this.noticeService.getAllQueries().subscribe(
      (data:any)=>{
        console.log(data)
        this.queries= data.data
      },
      (err:any)=>this.alertify.error(err)
    )
  }

}
