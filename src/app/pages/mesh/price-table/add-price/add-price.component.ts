import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.scss']
})
export class AddPriceComponent implements OnInit {
  @Input() item:any;
  constructor(private fb:FormBuilder) { }
  priceForm:FormGroup;
  ngOnInit() {
    this.priceForm=this.fb.group({
      foodName:['',Validators.required],
      price:['',Validators.required]
    })
  }
  submit():void{

  }
  get foodName(){
    return this.priceForm.get("foodName")
  }
  get price(){
    return this.priceForm.get("price")
  }

}
