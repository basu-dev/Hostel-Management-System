import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidenav-item',
    template: `
    <a  (click)="clicked()" routerLinkActive="active"
    class="list-group-item list-group-item-action ">
    <div class="flex">
      <i [class]="'fas mr-2 fa-home'"></i>
      <div>
        {{item.name}}
      </div>
    </div>
    <!-- <i class="fas fa-arrow-left" aria-hidden="true"></i> -->
    <i *ngIf="item.directory" class="fa fa-chevron-left" aria-hidden="true"></i>
  </a>
  <div *ngIf="item.direcotr">
  <a  (click)="clicked()" routerLinkActive="active"
    class="list-group-item list-group-item-action ">
    <div class="flex">
      <i [class]="'fas mr-2 fa-home'"></i>
      <div>
        {{item.name}}
      </div>
    <!-- <i class="fas fa-arrow-left" aria-hidden="true"></i> -->
    <i *ngIf="item.directory" class="fa fa-chevron-left" aria-hidden="true"></i>
  </div>
    `,
    styleUrls: ['./sidenav.component.css']
  })

  export class SidenavItem {

    @Input('item') item :{link:String,icon:String,directory:boolean,items?:any,name:String};
   
    clicked(){
        if(this.item.directory){
            
        }
    }

  }