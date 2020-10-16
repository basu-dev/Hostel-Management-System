import { Staff } from './../_models/staff.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
staffList: AngularFireList<any>;

constructor(private db: AngularFireDatabase) { }

getStaffList() {
  this.staffList = this.db.list('College/staffList');
  return this.staffList;
}

insertStaff(staff: Staff) {
  return this.staffList.push(staff);
}

editStaff(key, staff) {
  return this.staffList.update(key, staff);
}

deleteStaff(key) {
  return this.staffList.remove(key);
}

getStaff(key) {
  return this.db.object('College/staffList/' + key).valueChanges();
}
}
