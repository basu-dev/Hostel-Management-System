import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Faculty } from '../model/faculties';
import { Student } from '../model/student';
import { Url } from '../urls';
import { AlertifyService } from './alertify.service';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  studentList: any = [
    {
      id: 1,
      userame: "073bex412",
      contact: "234324",
      email: "a@a.com",
      password: "Nice@123",
      dob: "2054/06/18",
      faculty: Faculty.ElectronicsAndCommunication,
      fullName: "Basu Dev Adhikari",
      address: "Kathmandu",
      batch: 73,
      roomNo: "301"
    },
    {
      id: 2,
      username: "073bce123",
      contact: "234324",
      email: "b@a.com",
      password: "Nice@123",
      dob: "2054/06/18",
      faculty: Faculty.CivilEngineering,
      fullName: "James Domain",
      address: "Pokhara",
      batch: 73,
      roomNo: "320"
    },
  ];
  public studentSub = new Subject<Student[]>();
  singleStudentUrl(username: String) {
    return `${Url.students}/${username.trim()}`;
  }
  constructor(private http: HttpClient,
    private alertify: AlertifyService,
  ) { };
  getStudentsList(): void {
    console.log("students");
    this.http.get(Url.students).pipe(
    ).subscribe((data:any) => {
      this.studentList = data.data;
      this.notifyStudentsChange();
    },
      err => console.error(err)
    )
  }
  notifyStudentsChange() {
    this.studentSub.next(this.studentList);
  }
  insertStudents(student: Student) {

    return this.studentList.push(student);
  }

  getStudentByUsername(username: String): Observable<Student> {

    return this.http.get<any>(this.singleStudentUrl(username))
  }
  getStudentByBatch(batch: String): Observable<Student[]> {

    return this.http.get<any>(`${Url.filterStudent}?batch=${batch}`);
  }
  getStudentByFaculty(fac: String): Observable<Student[]> {

    return this.http.get<any>(`${Url.filterStudent}?faculty=${fac}`)

  }

  getStudentById(id: String): Observable<Student> {
    return of(this.studentList.filter((e: Student) => e._id == id)[0]);
  }
  editStudent(id: any, student: Student): Observable<Student> {
    return this.http.put<Student>(this.singleStudentUrl(id), student);
  }

  deleteStudent(id: any) {
    return this.http.delete(this.singleStudentUrl(id), id);
  }
  registerStudent(student: Student): Observable<any> {
    this.http.post(`${Url.students}`, student)
    .subscribe(
      res => console.log(res),
      err => this.alertify.error(err)
    )
    return of(true);
    // return this.http.post(Url.rootUrl+Url.registerStudent,student);
  }
  give10items(index:number,totalItems:any[]):any[]{
    var startIndex = index * 10;
    var endIndex = startIndex + 10;
    console.log(startIndex,endIndex,totalItems.length)
    return totalItems.filter((x,i)=>  (i>=startIndex && i<endIndex))
   }


}