import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { StudentsService } from 'src/app/services/student.service';
import { Student } from 'src/app/model/student';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Subscription } from 'rxjs';
import { Faculty } from 'src/app/model/faculties';
import { stringify } from '@angular/compiler/src/util';

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
      this.id = this.route.snapshot.paramMap.get('username')!;
      console.log(this.id);
    }
    
  id:String;
  keys:any[];
  faculties=Faculty;
  selectedFaculty:Faculty;
  adminForm: any;
  isEditform=false;
  student:Student = new Student();
  componentName='Student Registration';
  private studentSub: Subscription;

  ngOnInit() {
    this.studentSub = this.studentService.getStudentById(this.id).subscribe(
      data=>{
        console.log(data);
        this.student=data;
        console.log(this.student)
        this.selectedFaculty = this.student.faculty;
      },
      err=>console.log(err)
    );
    if(this.id){
      this.isEditform=true;
      this.componentName='Edit Student';
      this.editStudentForm();
    }
    else{
      this.initStudentForm();
      this.selectedFaculty=Faculty.ElectronicsAndCommunication;

    }


  }

  initStudentForm() {
    
    this.adminForm = new FormGroup({
      email: new FormControl('a@a.com', [Validators.required, Validators.email]),
      username: new FormControl('073BEX473',[Validators.required]),
      faculty: new FormControl('',[Validators.required]),
      batch: new FormControl('073',[Validators.required]),
      fullName: new FormControl('New User',[Validators.required]),
      address: new FormControl('Chitwan',[Validators.required]),
      dob: new FormControl('2054-3-12',[Validators.required]),
      contact: new FormControl('5646546546546',[Validators.required,Validators.minLength(10)]),
      
      // department: new FormControl('',Validators.required)
    });
  }
  editStudentForm() {
    console.log("sdaf");
    // let {email,username,faculty,batch,fullName,address,dob,contact} = student;
    this.adminForm = new FormGroup({
      email: new FormControl(this.student.email, [Validators.required, Validators.email]),
      username: new FormControl(this.student.username,[Validators.required]),
      faculty: new FormControl(this.student.faculty,[Validators.required]),
      batch: new FormControl(this.student.batch,[Validators.required]),
      fullName: new FormControl(this.student.fullName,[Validators.required]),
      address: new FormControl(this.student.address,[Validators.required]),
      dob: new FormControl(this.student.dob,[Validators.required]),
      contact: new FormControl(this.student.contact,[Validators.required,Validators.minLength(10)]),
      
      // department: new FormControl('',Validators.required)
    });
  }

  deleteStudent(){
    this.studentService.deleteStudent(this.student._id).subscribe(
      data=>this.alertify.success("User Deleted Successfully"),
      err=>this.alertify.error(err)
    )
  }

  onSubmit() {
    console.log(this.adminForm);
    if(this.isEditform){
      console.log(this.adminForm.value);
   
      this.studentService.editStudent(this.student._id,this.adminForm.value).subscribe(
        data=>this.alertify.success("Student Updated Successfully"),
        err=>this.alertify.error(err)
      );
     return; 
    }
    this.studentService.registerStudent(this.adminForm.value)
    .subscribe(
      data=>{
        // this.router.navigateByUrl("/admin/manageUsers"); 
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
    // this.studentSub.unsubscribe();
  }

}
