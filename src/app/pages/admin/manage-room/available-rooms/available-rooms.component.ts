import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/model/room';
import { AlertifyService } from 'src/app/services/alertify.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.scss']
})
export class AvailableRoomsComponent implements OnInit {

  constructor(public roomService:RoomService,
    public alertify:AlertifyService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
    
  
showSkeleton=true;
blockName:String;
roomList:Room[]=[];
page:number = 1;
totalRooms:number = 0;
roomSub:Subscription;
ngOnInit(): void {
  this.roomSub = this.roomService.getAvailableRooms().subscribe(
    (rooms:any)=>{this.roomList=rooms.data;
            this.showSkeleton = false;
            console.log(rooms.data);
    },
    (err:any)=>this.alertify.error(err)
  )
}
fetchRooms(){
  this.roomList=[];
  this.showSkeleton= true;
  this.roomService.getAllRoomsByBlock(this.blockName);
}
editRoom(roomName:String):void{
  this.router.navigate(["/admin/editRoom",roomName]);
}
ngOnDestroy(): void {
  this.roomSub.unsubscribe();
}
}
