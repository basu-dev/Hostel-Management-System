import { Admin } from './../_models/admin.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  allAdmins: AngularFireList<any>;

constructor(private db: AngularFireDatabase) { }

getAllAdmins() {
  this.allAdmins = this.db.list('College/adminList');
  return this.allAdmins;
}

insertAllAdmin(admin: Admin) {
  return this.allAdmins.push(admin);
}

}
