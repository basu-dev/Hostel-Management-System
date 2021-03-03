import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Subscription } from 'rxjs';
import { Faculty } from 'src/app/model/faculties';
import { Student } from 'src/app/model/student';
import { AlertifyService } from 'src/app/services/alertify.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  constructor(private studentService: StudentsService,
    private alertify: AlertifyService,
    private router: Router,
    private route:ActivatedRoute
  ) {
 this.route.paramMap.subscribe(
     ( paramMap:ParamMap) => {
      this.faculty = paramMap.get('id')!;
      this.fetchStduents();
    }
    )
  }

  //for pagination
  totalStudents:number = 0;
  page:number = 1;
  students: Student[];
  //endfor pagniation
  faculty:String;
  startSearch = false;
  faculties = this.studentService.faculites;
  selectedFaculty = 'BCE';
  showSkeleton=true;
  studentsSub: Subscription;
  ngOnInit(): void {
    this.studentsSub = this.studentService.studentSub.subscribe(
      data =>{
        console.log("data cane",data);
         this.students = data
        this.totalStudents = this.students.length;
        this.showSkeleton = false;
      },

    )
  }
  fetchStduents():void{
    this.students= [];
    this.showSkeleton = true;
    this.studentService.getStudentByFaculty(this.faculty);
  }

  searchByUsername(e:any) {
    let value = e.target.value;
    if (value.trim() == '') {
      this.studentService.getStudentsList();
      return;
    }
    console.log(value);
    this.studentService.getStudentByUsername(value).subscribe(
      (data:any) => this.students = [data],
      (err:any)=>console.log(err)
    )
  }
  searchByBatch(e:any) {
    var value = e.target.value;
    if (value.trim() == '') {
      this.studentService.getStudentsList();
      return;
    }
    console.log(value);
    this.studentService.getStudentByBatch(value).subscribe(
      (data:any) => this.students = data.data
    );
  }
  searchByFaculty() {
    console.log(this.selectedFaculty);
    this.studentService.getStudentByFaculty(this.selectedFaculty);
  }
  toggleSearch() {
    if (!this.startSearch) {
      this.startSearch = true

      return
    }
    this.startSearch = false;
    this.studentService.getStudentsList();
  }
  editStudent(_id: String): void {
    // let student = this.studentService.getStudentByUsername(username).subscribe(data=>console.log(data));

    this.router.navigate(['admin/editStudent', _id]);
  }
  ngOnDestroy(): void {
    this.studentsSub.unsubscribe();

  }

}
