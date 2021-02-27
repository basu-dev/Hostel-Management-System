import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { Faculty } from '../model/faculties';
import { StaffType ,Staff} from '../model/staff';
import { Url } from '../urls';
import { AlertifyService } from './alertify.service';
@Injectable({
    providedIn: 'root'
})
export class StaffService {
  constructor(private http:HttpClient,
      private alertify:AlertifyService
    ){}
    staffList:Staff[]=[
    ];
    public StaffSub = new Subject<Staff[]>();
    getStaffList():void{
        this.http.get(Url.allStaffs).subscribe
        (
          (res:any)=>{this.StaffSub.next(res.data)
          console.log(res.data);
          },
          err=>this.alertify.error(err)
        )
      }
    
      insertStaff(staff: Staff) {
        // if (!staff.roomNo) {
        //   staff.roomNo = 'Not Allocated';
        // }
        return this.staffList.push(staff);
      }
      
      getStaffById(id:any):Observable<Staff> {
       return of(this.staffList.filter((x:any)=>x.id==id)[0]);
      }
      
      editStaff(id:any, staff:any) {
        
       return false;
      }
      
      deleteStaff(id:any) {
        return this.staffList.filter(id);
      }
      registerStaff(staff:Staff):Observable<any>{
      //   this.staffList.push(staff);
      //   this.StaffSub.next(this.staffList);
      //  return of(true);
        return this.http.post(Url.registerStaff,staff);
    }


}