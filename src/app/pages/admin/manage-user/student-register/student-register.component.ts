import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { StudentsService } from 'src/app/services/student.service';
import { Student } from 'src/app/model/student';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Subscription } from 'rxjs';
import { Faculty } from 'src/app/model/faculties';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  showLoader = false;
  constructor(private router: Router,
    private authService:AuthService,
    private studentService:StudentsService,
    private route :ActivatedRoute,
    private alertify: AlertifyService,
    private builder: FormBuilder) { 
      this.keys = Object.keys(this.faculties).filter(String);
    }
  keys:any[];
  faculties=Faculty;
  selectedFaculty:Faculty;
  adminForm: any;
  isEditform=false;
  student:Student;
  componentName='Student Registration';
  private studentSub: Subscription;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentSub = this.studentService.getStudentById(id).subscribe(data=>{
      this.student=data,
      (err:any)=>this.alertify.error(err)
    });
    console.log(this.student);
    if(this.student){
      if (typeof(this.student)){
        this.selectedFaculty = this.student.faculty;
        this.isEditform=true;
        this.componentName='Edit Student';
      }
      else{
        console.log("In between")
      }
    }
    else{
      this.componentName='Student Registration';

      this.isEditform=false;
    }
    if(this.isEditform){
      this.editStudentForm(this.student);

    }else{
      this.initStudentForm();
      this.selectedFaculty=Faculty.ElectronicsAndCommunication;
    }
  }

  initStudentForm() {
    
    this.adminForm = new FormGroup({
      email: new FormControl('a@a.com', [Validators.required, Validators.email]),
      userName: new FormControl('animal32',[Validators.required]),
      faculty: new FormControl('073',[Validators.required]),
      batch: new FormControl('073',[Validators.required]),
      fullName: new FormControl('New User',[Validators.required]),
      address: new FormControl('Chitwan',[Validators.required]),
      dob: new FormControl('2054-3-12',[Validators.required]),
      contactNo: new FormControl('5646546546546',[Validators.required,Validators.minLength(10)]),
      
      // department: new FormControl('',Validators.required)
    });
  }
  editStudentForm(student:Student) {
    let {email,userName,faculty,batch,fullName,address,dob,contactNo} = student;
    this.adminForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      userName: new FormControl(userName,[Validators.required]),
      faculty: new FormControl(faculty,[Validators.required]),
      batch: new FormControl(batch,[Validators.required]),
      fullName: new FormControl(fullName,[Validators.required]),
      address: new FormControl(address,[Validators.required]),
      dob: new FormControl(dob,[Validators.required]),
      contactNo: new FormControl(contactNo,[Validators.required,Validators.minLength(10)]),
      
      // department: new FormControl('',Validators.required)
    });
  }

  onSubmit() {
    console.log(this.adminForm.value);
    if(this.isEditform){
      this.studentService.editStudent(this.student.userName,this.student);
     return; 
    }
    this.studentService.registerStudent(this.adminForm.value)
    .subscribe(
      data=>{
        this.router.navigateByUrl("/admin/manageUsers"); 
      },
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
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.studentSub.unsubscribe();
  }

}
