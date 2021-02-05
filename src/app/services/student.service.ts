import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { Student } from '../model/student';
@Injectable({
    providedIn: 'root'
})
export class StudentsService {
    studentList:any=[
        {
            id:1,
            username:"073bex412",
            contact:"234324",
            email:"a@a.com",
            password:"Nice@123",
            dob:"2054/06/18",
            faculty:"BEX",
            fullName:"Basu Dev Adhikari",
            address:"Kathmandu",
            batch:73, 
            roomNo:"301"
        },
        {
            id:2,
            username:"073bce123",
            contact:"234324",
            email:"b@a.com",
            password:"Nice@123",
            dob:"2054/06/18",
            faculty:"BCE",
            fullName:"James Domain",
            address:"Pokhara",
            batch:73, 
            roomNo:"320"
        },
    ];
    getStudentsList() {
        return of(this.studentList);
      }
      
      insertStudents(student: Student) {
        // if (!student.roomNo) {
        //   student.roomNo = 'Not Allocated';
        // }
        return this.studentList.push(student);
      }
      
      getStudentById(id:any) {
        return false;
      }
      
      editStudent(id:any, student:any) {
       return false;
      }
      
      deleteStudent(id:any) {
        return this.studentList.remove(id);
      }
}