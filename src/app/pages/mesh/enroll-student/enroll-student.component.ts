import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MessService } from 'src/app/services/mess.service';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.scss']
})
export class EnrollStudentComponent implements OnInit {

  constructor(private messService:MessService,private alertify:AlertifyService) { }
  showEnrollBtn=false;
  student:any;
  enroll=true;
  ngOnInit() {
    this.messService.showEnroll.subscribe(
      data=>this.showEnrollBtn=data
    )
    this.messService.studentSub.subscribe(
      data=>{this.student=data
    this.enroll=this.student.isInMess;
      }
    )
  }
  enrollStudent(){
    var rollNo = this.student.rollNo;
    this.messService.enrollStudent(rollNo,true).subscribe(
      data=>{
        this.alertify.success("Student enrolled successfully")
        this.enroll=false;
      },
      err=>this.alertify.error(err)
    )
  }
  removeStudent(){
    var rollNo = this.student.rollNo;
    this.messService.enrollStudent(rollNo,false).subscribe(
      data=>{
        this.alertify.success("Student removed successfully")
        this.enroll=true;
      },
      err=>this.alertify.error(err)
    )
  }

}
