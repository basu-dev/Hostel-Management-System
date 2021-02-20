import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidenav-item',
    template: `
    <a *ngIf="!item.directory" (click)="clicked(item)" routerLinkActive="active"
    class="list-group-item list-group-item-action ">
    <div class="flex">
      <i [class]="'fas mr-2'+item.icon"></i>
      <div>
        {{item.name}}
      </div>
    </div>
    <!-- <i class="fas fa-arrow-left" aria-hidden="true"></i> -->
    <i *ngIf="item.directory" class="fa fa-chevron-left" aria-hidden="true"></i>
  </a>
  <div *ngIf="item.directory">
  <a  (click)="clicked(item)" routerLinkActive="active"
    class="list-group-item list-group-item-action ">
    <div class="flex">
      <i [class]="'fas mr-2 fa-home'"></i>
      <div>
        {{item.name}}
      </div>
    <!-- <i class="fas fa-arrow-left" aria-hidden="true"></i> -->
  </div>
  <i *ngIf="item.directory" class="fa fa-chevron-left" aria-hidden="true"></i>
</a>
  <div *ngIf="item.directory &&open" >
  <a *ngFor="let item of item.items" (click)="clicked(item)" routerLinkActive="active"
    class="list-group-item list-group-sub-item list-group-item-action ">
    <div class="flex">
      <i [class]="'fas ml-4 mr-2 fa-home'"></i>
      <div>
        {{item.name}}
      </div>
    </div>
    <!-- <i class="fas fa-arrow-left" aria-hidden="true"></i> -->
    <i  *ngIf="item.directory" class="fa fa-chevron-left" aria-hidden="true"></i>
  </a>
  </div>

    `,
    styleUrls: ['./sidenav.component.css']
  })

  export class SidenavItemComponent {

    @Input('item') item :{link?:string,icon:String,directory:boolean,items?:any,name:String};
   open=false;
   constructor(private router:Router){}
    clicked(item:any){
        if(item.directory){
          console.log("clicked");
            this.open=!this.open;
            return;
        }
        this.router.navigateByUrl(item.link)
    }

  }