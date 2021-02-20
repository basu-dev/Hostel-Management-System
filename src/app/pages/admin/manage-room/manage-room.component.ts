import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      private router:Router,
      private route:ActivatedRoute
    ) { 

      this.blockName = this.route.snapshot.paramMap.get('id')!;
    }
blockName:String;
  roomList:Room[]=[];
  roomSub:Subscription;
  ngOnInit(): void {
    this.roomSub = this.roomService.roomSub.subscribe(
      rooms=>this.roomList=rooms,
      err=>this.alertify.error(err)
    )
    this.roomService.getAllRoomsByBlock(this.blockName);
  }
  editRoom(roomName:String):void{
    this.router.navigate(["/admin/editRoom",roomName]);
  }
  ngOnDestroy(): void {
    this.roomSub.unsubscribe();
  }
  
}
