import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MessService } from 'src/app/services/mess.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.scss']
})
export class PriceTableComponent implements OnInit {

  constructor(private messService:MessService,
    private alertify:AlertifyService,
    private modalService:ModalService
    ) { }
  prices:{_id:String,foodName:String,price:String}[];
  ngOnInit() {
    this.messService.getPriceTable().subscribe(
      (data:any)=>{
        this.prices=data.data,
        console.log(data.data)
      },
      (err:any)=>this.alertify.error(err)
    )
  }

  editMenu(id:String){

  }
  openModal(id:string){
    this.modalService.open(id);
  }

}
