import { Room } from './../_models/room.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomsList: AngularFireList<any>;

constructor(private db: AngularFireDatabase) { }

  getRoomsList() {
    this.roomsList = this.db.list('College/roomsList');
    return this.roomsList;
  }

  insertRooms(room: Room) {
    return this.roomsList.push(room);
  }

  deleteRoom(key) {
    return this.roomsList.remove(key);
  }

  allocateUser(key, roomNO) {
    return this.db.object('College/userList/' + key + '/roomNo').set(roomNO);
  }

  updateRoom(room: Room) {
    const key = room.$key;
    delete room.$key;
    return this.roomsList.update(key, room);
  }



}
