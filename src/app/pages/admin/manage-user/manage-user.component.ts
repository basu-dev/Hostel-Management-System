import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.keys = Object.keys(this.faculties).filter(String);
  }
  startSearch = false;
  keys: any[];
  faculties = Faculty;
  students: Student[] = [];
  selectedFaculty = 'BCE';
  studentsSub: Subscription;
  ngOnInit(): void {
    this.studentsSub = this.studentService.studentSub.subscribe(
      data => this.students = data,
      (err: any) => console.log(err)
    )
    this.studentService.getStudentsList();
  }
  searchByUsername(e:any) {
    let value = e.target.value;
    if (value.trim() == '') {
      this.studentService.getStudentsList();
      return;
    }
    console.log(value);
    this.studentService.getStudentByUsername(value).subscribe(
      (data:any) => this.students = [data.data]
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
