import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Block, Room } from '../model/room';
import { AlertifyService } from './alertify.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(private alertify:AlertifyService){};
    roomList:Room[]=[
        {
            roomName:'A307',
            students:[
                '073bex412',
                '073bex422'
            ],
            block:Block.A,
            assets:{
                table:2,
                chair:2,
                wardrobe:2,
                bed:2
            }

        },
        {
            roomName:'B102',
            students:[
                '073bex412',
                '073bex422'
            ],
            block:Block.B,
            assets:{
                table:2,
                chair:2,
                wardrobe:2,
                bed:2
            }

        },
        {
            roomName:'C205',
            students:[
                '073bce412',
                '073bce422'
            ],
            block:Block.C,
            assets:{
                table:2,
                chair:2,
                wardrobe:2,
                bed:2
            }

        },
    ]
    public roomSub = new Subject<Room[]>();

    getAllRooms():Observable<Room[]>{
        return of(this.roomList);
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