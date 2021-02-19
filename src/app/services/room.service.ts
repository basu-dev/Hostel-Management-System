import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Block, Room } from '../model/room';
import { Url } from '../urls';
import { AlertifyService } from './alertify.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(private alertify:AlertifyService,
        
            private http:HttpClient,
        ){};
    roomList:Room[]=[]
    
    public roomSub = new Subject<Room[]>();

    getAllRooms():void{
         this.http.get(Url.rooms).subscribe(
            (data:any)=>{this.roomList = data.data,
                this.sendAllRooms();
                // console.log(data);
                console.log(this.roomList[0]);
            },
            err=>this.alertify.error(err)
        );
    }

    sendAllRooms():void{
        this.roomSub.next(this.roomList);
    }
    getRoomByName(roomName:String):Observable<Room>{
        return of(this.roomList.filter(x=>x.roomName==roomName)[0]);
    }
    updateRoom(roomName:String,room:Room):any{
        let roomExist:Room;
    this.getRoomByName(roomName).subscribe(
            data=>roomExist = data,
            err=>this.alertify.error(err)
        );
        roomExist=room;
        return true;
    }
    deleteRoom(roomName:String):any{
        let room = this.getRoomByName(roomName);
        // if(room){
        //     this.roomList = this.roomList.filter(function(item) {
        //         return item !== room
        //     })
        // }
    }

}