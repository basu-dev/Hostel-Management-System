import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.blockName = this.route.snapshot.paramMap.get('id')!;
    this.keys = Object.keys(this.faculties).filter(String);
  }
  blockName:String;
  startSearch = false;
  totalBottomTabs:Number;
  keys: any[];
  faculties = Faculty;
  students: Student[] = [];
  selectedFaculty = 'BCE';
  studentsSub: Subscription;
  currentStudents:Student[];
  ngOnInit(): void {
    this.studentsSub = this.studentService.studentSub.subscribe(
      data =>{ this.students = data,
        this.totalBottomTabs = (data.length / 10);
        this.currentStudents = this.studentService.give10items(0,this.students);
     
      },
      (err: any) => console.log(err)
    )
    this.studentService.getStudentsListByBlock(this.blockName);
    this.studentService.give10items(1,this.students);
  }

  searchByUsername(e:any) {
    let value = e.target.value;
    if (value.trim() == '') {
      this.studentService.getStudentsList();
      return;
    }
    console.log(value);
    this.studentService.getStudentByUsername(value).subscribe(
      (data:any) => this.students = [data]
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
    this.studentService.getStudentByFaculty(this.selectedFaculty).subscribe(
      (data:any) => this.students = data,
      err => this.alertify.error(err)
    );
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
