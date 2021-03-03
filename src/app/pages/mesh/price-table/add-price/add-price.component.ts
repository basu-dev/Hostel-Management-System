import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MessService } from 'src/app/services/mess.service';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.scss']
})
export class AddPriceComponent implements OnInit {
   item:any;
  constructor(private fb:FormBuilder,private messService:MessService,
    private alertify:AlertifyService
    ) { }
  priceForm:FormGroup;
  showForm=false;
  title="Add Food Item";
  ngOnInit() {
    this.messService.foodItemSub.subscribe(
      data=>{
        this.item=data;
        this.initForm();
        this.showForm=true;
        if(data){
          this.title="Update Food Item"
        }
      }
    )
  }
  initForm(){
    this.priceForm=this.fb.group({
      foodName:[this.item?.foodName,Validators.required],
      price:[this.item?.price,Validators.required]
    })
  }
  submit():void{
    if(!this.item){
      this.messService.addFoodItem(this.priceForm.value).subscribe(
        (data:any)=>{
          console.log(data.data),
          this.alertify.success("Food Item Added Successfully")
          this.messService.refreshPriceTable.next(true)
        },
        (err:any)=>this.alertify.error(err)
      )
    }else{
      this.messService.editFoodItem(this.item._id,this.priceForm.value).subscribe(
        (data:any)=>{
          console.log(data),
          this.alertify.success("Food Item Updated Successfully")
          this.messService.refreshPriceTable.next(true)
        },
        (err:any)=>this.alertify.error(err)
      )
    }
  }
  get foodName(){
    return this.priceForm.get("foodName")
  }
  get price(){
    return this.priceForm.get("price")
  }

}
