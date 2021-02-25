import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-skeleton-loader',
  templateUrl: './table-skeleton-loader.component.html',
  styleUrls: ['./table-skeleton-loader.component.css']
})
export class TableSkeletonLoaderComponent implements OnInit{

  constructor() { }
  @Input() rows="3";
  @Input() cols="4";
  rowArr:any[] ;
  colArr:any[];
  ngOnInit() {
    this.rowArr = new Array(parseInt(this.rows));
    this.colArr = new Array(parseInt(this.cols));
  }

}
