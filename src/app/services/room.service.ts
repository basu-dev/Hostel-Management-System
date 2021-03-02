import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  Subject } from 'rxjs';
import {  Room } from '../model/room';
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
            },
            err=>{this.alertify.error(err);
            this.roomList=[];
            this.sendAllRooms();
            }
        );
    }
    registerRoom(room:Room):Observable<any>{
        return this.http.post(`${Url.rooms}`,room);
    }

    getAllRoomsByBlock(blocK:String):void{
        this.http.get(`${Url.rooms}/blocksearch/${blocK}`).subscribe(
            (data:any)=>{this.roomList = data.data,
                this.sendAllRooms();
            },
            err=>{this.alertify.error(err);
            this.roomList=[];
            this.sendAllRooms();}
        );
    }
    getAvailableRooms():Observable<any>{
        return this.http.get(Url.availableRooms);
    }
    sendAllRooms():void{
        this.roomSub.next(this.roomList);
    }
    getRoomByName(roomName:String):Observable<Room>{
        return this.http.get<Room>(`${Url.rooms}/namesearch/${roomName}`);
    }
    updateRoom(roomName:String,room:Room):any{
        return this.http.put(`${Url.rooms}/${roomName}`,room);
    }
    deleteRoom(roomName:String):any{
        return this.http.delete(`${Url.rooms}/${roomName}`);
    }
    // getRoomsByBlock(blockName:Block):Observable<Room[]>{
    //     // return this.http.get()
    // }

}