import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AlertifyService } from 'src/app/services/alertify.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  constructor(private studentService :StudentsService,
      private alertify:AlertifyService
    ) { }
  students:Student[] = [];
  ngOnInit(): void {
      this.studentService.getStudentsList().subscribe(
        data=>this.students=data,
        err=>this.alertify.error(err)
      )
  }

}
