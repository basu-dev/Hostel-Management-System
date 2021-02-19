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
        {
            id:1,
            username:"jeevan",
            contact:"2343241323",
            email:"a@a.com",
            password:"Nice@123",
            staffType:StaffType.GeneralStaff,
            fullName:"Jeevan Poudel",
            address:"Pokhara",
            imageUrl:"asdf.jpg", 
        },
        {
            id:1,
            username:"manoj",
            contact:"2343545158",
            email:"ab@asa.com",
            password:"Nice@123",
            staffType:StaffType.MeshStaff,
            fullName:"Manoj Yadav",
            address:"Sarlahi",
            imageUrl:"asdf.jpg", 
        },
    ];
    public StaffSub = new Subject<Staff[]>();
    getStaffList():void{
        this.http.get(Url.staffs).subscribe
        (
          (res:any)=>this.staffList = res.data,
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
        this.staffList.push(staff);
        this.StaffSub.next(this.staffList);
       return of(true);
        // return this.http.post(Url.rootUrl+Url.registerStaff,staff);
    }


}