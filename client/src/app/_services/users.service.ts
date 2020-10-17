import { User } from './../_models/user.model';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
usersList: AngularFireList<any>;
constructor(private db: AngularFireDatabase) { }

getUsersList() {
  this.usersList = this.db.list('/userList');
  return this.usersList;
}

insertUsers(user: User) {
  if (!user.roomNo) {
    user.roomNo = 'Not Allocated';
  }
  return this.usersList.push(user);
}

getUserById(id) {
  return this.db.object('userList/' + id);
}

editUser(id, user) {
  return this.usersList.update(id, user);
}

deleteUser(id) {
  return this.usersList.remove(id);
}
}
