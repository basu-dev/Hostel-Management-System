import { Injectable } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { Faculty } from '../model/faculties';
import { Student } from '../model/student';
@Injectable({
    providedIn: 'root'
})
export class StudentsService {
    studentList:any=[
        {
            id:1,
            userName:"073bex412",
            contactNo:"234324",
            email:"a@a.com",
            password:"Nice@123",
            dob:"2054/06/18",
            faculty:Faculty.ElectronicsAndCommunication,
            fullName:"Basu Dev Adhikari",
            address:"Kathmandu",
            batch:73, 
            roomNo:"301"
        },
        {
            id:2,
            userName:"073bce123",
            contactNo:"234324",
            email:"b@a.com",
            password:"Nice@123",
            dob:"2054/06/18",
            faculty:Faculty.CivilEngineering,
            fullName:"James Domain",
            address:"Pokhara",
            batch:73, 
            roomNo:"320"
        },
    ];
    public studentSub = new Subject<Student[]>();
    getStudentsList():void{
        return this.studentSub.next(this.studentList);
      }
    
      insertStudents(student: Student) {
        // if (!student.roomNo) {
        //   student.roomNo = 'Not Allocated';
        // }
        return this.studentList.push(student);
      }
      
      getStudentById(id:any):Observable<Student> {
       return of(this.studentList.filter((x:any)=>x.id==id)[0]);
      }
      
      editStudent(id:any, student:any) {
        
       return false;
      }
      
      deleteStudent(id:any) {
        return this.studentList.remove(id);
      }
      registerStudent(student:Student):Observable<any>{
        this.studentList.push(student);
        this.studentSub.next(this.studentList);
       return of(true);
        // return this.http.post(Url.rootUrl+Url.registerStudent,student);
    }

    getStaffList():boolean{
      return false;
    }
    getStaffById():any{
      return false;
    }
    updateStaff():any{

    }
}