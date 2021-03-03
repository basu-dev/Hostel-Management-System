import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { Student } from '../model/student';
import { Url } from '../urls';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  studentList: any = [];
  public myProfile:Student;
  public studentSub = new Subject<Student[]>();
  singleStudentUrl(username: String) {
    return `${Url.students}/${username.trim()}`;
  }
  faculites:{id:String,name:String}[]=[
    {
      id:"BEX",
      name:"ElectronicsAndCommunication"
    },{
      id:"BCT",
      name:"ComputerEngineering"
    },
    {
      id:"BCE",
      name:"CivilEngineering"
    },
    {
      id:"BME",
      name:"MechanicalEngineering"
    },
    {
      id:"BGE",
      name:"GeomaticsEngineering"
    },
    {
      id:"BAE",
      name:"AutomobileEngineering"
    },
    {
      id:"BEE",
      name:"ElectricalEngineering"
    }
  ]
  constructor(private http: HttpClient,
    private alertify: AlertifyService,
    private authService:AuthService,
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
  getStudentsListByBlock(block:String): void {
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
    console.log(this.singleStudentUrl(username));
    return this.http.get<any>(this.singleStudentUrl(username))
  }
  getStudentByBatch(batch: String): Observable<Student[]> {
    
    return this.http.get<any>(`${Url.filterStudent}?batch=${batch}`);
  }
  getStudentByFaculty(fac: String): void {
    

     this.http.get<any>(`${Url.filterStudent}?faculty=${fac}`).subscribe(
      (res:any)=>{
        this.studentList = res.data;
        this.notifyStudentsChange();
      },
      err=>
      
      {this.alertify.error(err);
        this.studentList =[];
      this.notifyStudentsChange();
      }
    )

  }

  getStudentById(id: String): Observable<Student> {
    return of(this.studentList.filter((e: Student) => e._id == id)[0]);
  }
  editStudent(id: any, student: Student): Observable<Student> {
    console.log("edit student called")
    return this.http.put<Student>(this.singleStudentUrl(id), student);
  }

  deleteStudent(id: any) {
    return this.http.delete(this.singleStudentUrl(id), id);
  }
  registerStudent(student: Student): void{
    console.log(student);
    this.http.post(`${Url.students}`, student)
    .subscribe(
      res => console.log(res),
      err => this.alertify.error(err)
    )
    // return this.http.post(Url.rootUrl+Url.registerStudent,student);
  }
  give10items(index:number,totalItems:any[]):any[]{
    var startIndex = index * 10;
    var endIndex = startIndex + 10;
    console.log(startIndex,endIndex,totalItems.length)
    return totalItems.filter((x,i)=>  (i>=startIndex && i<endIndex))
   }

   addPost(post:any):Observable<any>{
     return this.http.post(Url.studentquery+"/add",post);
   }
   editPost(id:String,post:any):Observable<any>{
    return this.http.put(Url.studentquery+"/update/"+id,post);
  }
getMyPosts():Observable<any>{
  return this.http.get(Url.studentquery+"/search/myqueries");
}
getMyProfile():Observable<any>{
  if(!this.myProfile){
    var username = this.authService.authCredentials.rollNo as String;
   return this.getStudentByUsername(username).pipe(
     map((res:any)=>res.data),
     tap((res:any)=>this.myProfile = res)
   );
  }
  return of(this.myProfile)
}

}