import { Component, OnInit, Query } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ModalService } from 'src/app/services/modal.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private modalService:ModalService,
    private studentService:StudentsService,
    private alertify:AlertifyService
    ) { }
    myPost:Query[];
    profile:Student;
  ngOnInit() {
    this.getMyProfile();
    this.getMyPosts();
    
  }
  openModal(id: string) {
    this.modalService.open(id);
}
getMyProfile(){
  this.studentService.getMyProfile().subscribe(
    (data:any)=>this.profile = data,
    (err:any)=>this.alertify.error(err)
  )
}
getMyPosts(){
  this.studentService.getMyPosts().subscribe(
    (data:{data:Query[]})=>{this.myPost=data.data;
    console.log(data)
    },
    (err:any)=>this.alertify.error(err)

  )
}
closeModal(id: string) {
    this.modalService.close(id);
}

}
