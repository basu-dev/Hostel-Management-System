import { Component, Input, OnInit } from '@angular/core';
import { Query } from 'src/app/model/query';

@Component({
  selector: 'app-show-query',
  templateUrl: './show-query.component.html',
  styleUrls: ['./show-query.component.scss']
})
export class ShowQueryComponent implements OnInit {

  constructor() { }
  @Input() query:Query | any;
  ngOnInit() {
  }


}
