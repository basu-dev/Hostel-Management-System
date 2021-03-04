import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authEnum } from 'src/app/model/auth.enum';
import { Query } from 'src/app/model/query';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NoticeService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-all-queries',
  templateUrl: './all-queries.component.html',
  styleUrls: ['./all-queries.component.scss']
})
export class AllQueriesComponent implements OnInit {

  constructor(private noticeService:NoticeService,
    private router:Router,
    private authService:AuthService,
    private modalService:ModalService,
    private alertify:AlertifyService) { }
  @Input() queries :Query[];
  @Input() error:String;
  @Input() prop:boolean;
  selectedQuery:Query;
  showQueryModal=false;
  page:number;
  totalQueries:number=0;
  showPagination=false;
  dataLenToShow=9;
  showAddQuery=false;

  ngOnInit() {
    if(

      this.authService.currentUser == authEnum.IsStudent
    ){
      this.showAddQuery=true;
    }

    if(!this.prop){
      this.noticeService.getAllQueries().subscribe(
        (data:any)=>{
          console.log(data)
          this.queries= data.data;
          this.managePagination();
        },
        (err:any)=>this.alertify.error(err)
      )
    }else{
      console.log("This is from prope")
      this.managePagination();
    }
  }
  managePagination(){
    this.totalQueries=this.queries.length;
    this.showPagination=true;
    if(this.totalQueries>this.dataLenToShow){
      this.showPagination=true;
    }
  }

  fullQuery(query:Query){
    console.log(query);
    this.selectedQuery=query;
    this.showQueryModal=true;
    this.openModal("custom-modal-5");
  }
  openModal(id: string) {
    this.modalService.open(id);
}
  SeeAll(){

  }

}
