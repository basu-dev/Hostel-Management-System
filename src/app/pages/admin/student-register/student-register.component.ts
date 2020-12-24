import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  showLoader = false;
  constructor(private router: Router,private authService:AuthService,private builder: FormBuilder) { }
  
  adminForm: any;
  ngOnInit() {

    this.initStudentForm();
  }

  initStudentForm() {
    this.adminForm = new FormGroup({
      email: new FormControl('a@a.com', [Validators.required, Validators.email]),
      username: new FormControl('animal32',[Validators.required]),
      faculty: new FormControl('bex',[Validators.required]),
      batch: new FormControl('073',[Validators.required]),
      fullName: new FormControl('New User',[Validators.required]),
      address: new FormControl('Chitwan',[Validators.required]),
      dob: new FormControl('2054-3-12',[Validators.required]),
      contact: new FormControl('5646546546546',[Validators.required,Validators.minLength(10)]),
      
      // department: new FormControl('',Validators.required)
    });
  }

  onSubmit() {
    console.log(this.adminForm.value);
    this.authService.registerStudent(this.adminForm.value)
    .subscribe(
      data=>console.log(data),
      err=>console.error(err)
    )
    
    
    // this.adminService.insertAllAdmin(this.adminForm.value).then(() => {
    //   this.showLoader = false;
    //   this.alerify.success('Admin account creation successful');
    //   this.router.navigate(['/adminLogin']);
    // }).catch((err) => {
    //   console.log(err);
    //   this.showLoader = false;
    //   this.alerify.error('Oops some error occured');
    // }).finally(() => {
    //   this.showLoader = false;
    // });
  }

}
