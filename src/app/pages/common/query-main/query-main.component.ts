import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { iif } from 'rxjs';
import { Query } from 'src/app/model/query';
import { NoticeService } from 'src/app/services/app.service';

@Component({
  selector: 'app-query-main',
  templateUrl: './query-main.component.html',
  styleUrls: ['./query-main.component.scss']
})
export class QueryMainComponent implements OnInit {
 status="pending";
  constructor(private noticeService:NoticeService) { }
  queries:Query[];
  error:String;
  ngOnInit() {
    this.showPending();
    this.noticeService.refreshQuerySub.subscribe(
      data=>{
        if(data==true){
          this.reloadQueries();
        }
      }
    )
  }
  get pending(){
    return this.status=="pending";
  }
  get resolved(){
    return this.status == "resolved";
  }
  get all(){
    return this.status=="all";
  }
  reloadQueries(){
    if(this.status=="pending"){
      this.showPending()
    }else if(this.status=="resolved"){
      this.showResolved()
    }else{
      this.showResolved();
    }
  }
    showPending(){
      this.queries=[];
      this.status="pending";
      this.noticeService.getSpecificQueries("pending").subscribe(
        (data:any)=>this.queries=data.data,
        (err:any)=>this.error=err
      )
    }
  showResolved(){
    this.queries=[]
    this.status="resolved";
    this.noticeService.getSpecificQueries("resolved").subscribe(
      (data:any)=>this.queries=data.data,
      (err:any)=>this.error=err
    )
  }
  showAll(){
    this.queries=[]
    this.status="all";
    this.noticeService.getAllQueries().subscribe(
      (data:any)=>{
        console.log(data)
        this.queries= data.data;
      },
      (err:any)=>this.error=err
    )
  }

}
