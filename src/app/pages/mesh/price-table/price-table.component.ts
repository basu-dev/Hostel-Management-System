import { Component, Input, OnInit } from '@angular/core';
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
    @Input() from:String;
  prices:{_id:String,foodName:String,price:String}[];
  foodItem:any;
  editForm=false;
  showPopup=false;

  ngOnInit() {


this.getPriceTable();
    this.messService.refreshPriceTable.subscribe(
      data=>{
        this.editForm=false;
        this.getPriceTable()
      }
    )
  }
getPriceTable(){
  this.messService.getPriceTable().subscribe(
    (data:any)=>{
      this.prices=data.data,
      console.log(data.data)
      
    },
    (err:any)=>this.alertify.error(err)
  )
}
  editMenu(item:any){
    this.editForm=true;
    this.foodItem=item;
    this.pushItem(item);
    this.showPopup=true;
    this.openModal()
  }
  addMenu(){
    this.editForm=false;
    this.pushItem(undefined);
    this.showPopup=true;
    this.openModal()
  }
  pushItem(item:any){
    this.messService.foodItemSub.next(item);
  }
  openModal(){
    this.modalService.open('custom-modal-priceTable');
    
  }
  deleteMenu(id:String){
    if(confirm("Are you sure you want to delete")){

      this.messService.deleteFoodItem(id).subscribe(
        (data:any)=>{
          this.alertify.success("Food Item Deleted Successfully")
          this.getPriceTable();
        },
        (err:any)=>this.alertify.error(err)
      )
    }
    }

}
