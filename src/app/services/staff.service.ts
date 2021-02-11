import { Injectable } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { Faculty } from '../model/faculties';
import { StaffType ,Staff} from '../model/staff';
@Injectable({
    providedIn: 'root'
})
export class StaffService {
    staffList:Staff[]=[
        {
            id:1,
            userName:"jeevan",
            contactNo:"2343241323",
            email:"a@a.com",
            password:"Nice@123",
            staffType:StaffType.GeneralStaff,
            fullName:"Jeevan Poudel",
            address:"Pokhara",
            imageUrl:"asdf.jpg", 
        },
        {
            id:1,
            userName:"manoj",
            contactNo:"2343545158",
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
        return this.StaffSub.next(this.staffList);
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