import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/model/room';
import { AlertifyService } from 'src/app/services/alertify.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.css']
})
export class ManageRoomComponent implements OnInit {

  constructor(public roomService:RoomService,
      public alertify:AlertifyService,
      private router:Router
    ) { }
    // settings = {
    //   columns: {
    //     roomName: {
    //       title: 'Room Name'
    //     },
    //     students: {
    //       title: 'Students'
    //     },
    //     block: {
    //       title: 'Block'
    //     },
    //     table: {
    //       title: 'Tables'
    //     },chair:{
    //       title:"Chairs"
    //     },
    //     wardrobe:{
    //       title:"Wardrobe"
    //     },
    //     bed:{
    //       title:"Bed"
    //     }
    //   }
    // };
  roomList:Room[]=[];
  roomSub:Subscription;
  ngOnInit(): void {
    this.roomSub = this.roomService.roomSub.subscribe(
      rooms=>this.roomList=rooms,
      err=>this.alertify.error(err)
    )
    this.roomService.getAllRooms();
  }
  editRoom(roomName:String):void{
    this.router.navigate(["/admin/editRoom",roomName]);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.roomSub.unsubscribe();
  }
  
}
