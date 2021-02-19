import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent implements OnInit {

  constructor() { }
 @Input('totalItems') public totalItems:any[];
 length:Number;
  rowsInTable=10;
  totalPages:Number;
  currentData:any[];
  ngOnInit() {
    length= this.totalItems.length;
    this.totalPages=length/this.rowsInTable;
  }
  give10items(index:number):any{
   var startIndex = index * 10;
   var endIndex = startIndex + 10;
   console.log(startIndex,endIndex);
    this.totalItems.filter((x,i)=>{
      return (i>startIndex && i<endIndex)
    })
  }

}
