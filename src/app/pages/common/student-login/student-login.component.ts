import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  showLoader = false;
  loginForm: FormGroup | any;
  allStudents: Student[] = [];
  constructor(private router: Router, private alertify: AlertifyService,
              private studentService: StudentsService  ,
              private builder: FormBuilder,
               private authService: AuthService) { }

  ngOnInit() {
    this.initLoginForm();
  }


  initLoginForm() {
    this.loginForm = this.builder.group({
      username:['073bex412',[Validators.required]],
      password:['Nice at nice',[Validators.required]]
    })
  }

  onSubmit() {
    this.showLoader = true;
    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;
    // for (let item of this.allStudents) {
    //   if (item.email === email.trim().toLowerCase() && item.password === password.trim()) {
    //     this.authService.studentLogin(item);
    //     if (this.authService.isStudentLoggedIn) {
    //       this.alertify.success('Logged in Successfully');
    //       this.showLoader = false;
    //       this.router.navigate(['/studentDetails']);
    //     } else {
    //       this.showLoader = false;
    //       this.alertify.error('Invalid Credentials');
    //     }
    //   }
    // }
    if (!this.authService.isStudentLoggedIn) {
      this.alertify.error('Invalid Credentials');
      this.showLoader = false;
    }
  }

}
