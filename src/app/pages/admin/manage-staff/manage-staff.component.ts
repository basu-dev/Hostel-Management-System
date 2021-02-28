import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Staff } from 'src/app/model/staff';
import { AlertifyService } from 'src/app/services/alertify.service';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.css']
})
export class ManageStaffComponent implements OnInit {

  constructor(private staffService :StaffService,
      private alertify:AlertifyService,
      private router: Router
    ) { }
  staffs:Staff[] = [];
  staffsSub:Subscription;
  showSkeleton=true;
  ngOnInit(): void {
   this.staffsSub =  this.staffService.StaffSub.subscribe(
      data=>{this.staffs=data;
        this.showSkeleton = false;
      },
      err=>{console.log(err)
        this.showSkeleton = false;
      }
      )
      this.staffService.getStaffList();
    }
    editStaff(id:any):void{
      let staff = this.staffService.getStaffById(id);
      this.router.navigate(['admin/editStaff',id]);
    } 

ngOnDestroy(): void {
  
  this.staffsSub.unsubscribe();
}
}
