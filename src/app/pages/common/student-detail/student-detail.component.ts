import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { AlertifyService } from 'src/app/services/alertify.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  constructor(private studentService:StudentsService,
      private route:ActivatedRoute,
      private alertify:AlertifyService
    ) { }
  student: Student;
  id:String | null = '0';
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentByUsername(this.id!).subscribe(
      data=>this.student = data,
      err=>this.alertify.error(err)
    )
    this.student.imageUrl = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80';
  }

}
