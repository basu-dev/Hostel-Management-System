import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {

  constructor() { }
@Input() paymentHistory:any[];
page:number=1;
historyLength=0;
  ngOnInit() {
    this.historyLength=this.paymentHistory.length;
  }

}
