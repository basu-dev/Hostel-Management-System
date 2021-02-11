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

  constructor(private studentService :StudentsService,
      private alertify:AlertifyService,
      private router: Router
    ) { 
      
    }

  students:Student[] = [];
  studentsSub:Subscription;
  ngOnInit(): void {
   this.studentsSub =  this.studentService.studentSub.subscribe(
      data=>this.students=data,
      err=>console.log(err)
      )
      this.studentService.getStudentsList();
    }
    editStudent(id:any):void{
      let student = this.studentService.getStudentById(id);
      this.router.navigate(['admin/editStudent',id]);
    } 
    ngOnDestroy(): void {
     this.studentsSub.unsubscribe();
      
    }

}
