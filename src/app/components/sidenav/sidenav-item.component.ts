import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidenav-item',
    template: `
    <a *ngIf="!item.directory" (click)="clicked(item)" routerLinkActive="active"
    class="list-group-item list-group-item-action ">
    <div class="flex">
      <i [class]="'fas mr-3 '+item.icon"></i>
      <div>
        {{item.name}}
      </div>
    </div>
  </a>
  <div *ngIf="item.directory">
  <a  (click)="clicked(item)" routerLinkActive="active"
    class="list-group-item list-group-item-action ">
    <div class="flex">
      <i [class]="'fas mr-3 '+item.icon"></i>
      <div>
        {{item.name}}
      </div>
  </div>
  <div *ngIf="item.directory">
    <i class="fas fa" [ngClass]="open?'fa-chevron-down':'fa-chevron-left'"></i>
  </div>
</a>
  <div *ngIf="item.directory &&open" >
  <a *ngFor="let item of item.items" (click)="clicked(item)" routerLinkActive="active"
    class="list-group-item list-group-sub-item list-group-item-action ">
    <div class="flex">
      <i class="fas ml-4 mr-3 fa-caret-right"></i>
      <div>
        {{item.name}}
      </div>
    </div>

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