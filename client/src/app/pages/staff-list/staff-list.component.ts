import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/_services/staff.service';
import { Staff } from 'src/app/_models/staff.model';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  showLoader = false;
  staffList: Staff[] = [];
  constructor(private router: Router, private staffService: StaffService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.staffService.getStaffList();
    this.getAllStaff();
  }

  getAllStaff() {
    this.showLoader = true;
    this.staffService.getStaffList().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['_id'] = element.key;
          this.staffList.push(x as Staff);
        });
      }),
      ((err) => {
        console.log(err);
        this.alertify.error('Oops some error occured');
      })
    );
  }

  onAddStaff() {
    this.router.navigate(['/createStaff']);
  }

  onEditStaff(key) {
    this.router.navigate(['/editStaff',key]);
  }

  onDeleteStaff(key) {
    this.staffService.deleteStaff(key).then(() => {
      this.alertify.success('Deletion successful');
      this.staffList = [];
      this.getAllStaff();
    }).catch((err) => {
      console.log(err);
      this.alertify.error('Oops some error occured');
    });
  }
}
