import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { StaffService } from 'src/app/services/staff.service';
import { Staff } from 'src/app/model/staff';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrls: ['./staff-register.component.css']
})
export class StaffRegisterComponent implements OnInit {

  showLoader = false;
  constructor(private router: Router,
    private authService:AuthService,
    private staffService:StaffService,
    private route :ActivatedRoute,
    private alertify: AlertifyService,
    private builder: FormBuilder) { }
  
  adminForm: any;
  componentName='Staff Registration';
  isEditform=false;
  staff:Staff;
  private staffSub: Subscription;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as String;
    if(id){
      this.staffSub = this.authService.getLoginDetailUser(id).subscribe(data=>{
        this.staff=data.data;
        this.isEditform=true;
        this.initializeForm();
      },
      (err)=>{this.alertify.error(err)
      this.initStaffForm();
      });
    }else{
      this.initStaffForm();
    }
   
  }
initializeForm(){
  if(this.staff){
    if (typeof(this.staff)){
      this.componentName='Edit Staff ';
    }
  }
  else{
    this.componentName='Staff Registration';
    this.isEditform=false;
  }
  if(this.isEditform){
    this.editStaffForm(this.staff);

  }else{
    this.initStaffForm();
  }
}
  initStaffForm() {
    this.adminForm = new FormGroup({
      email: new FormControl('a@a.com', [Validators.required, Validators.email]),
      username: new FormControl('animal32',[Validators.required]),
      role: new FormControl('hostel',[Validators.required]),
      fullName: new FormControl('New User',[Validators.required]),
      address: new FormControl('Chitwan',[Validators.required]),
      contact: new FormControl('5646546546546',[Validators.required,Validators.minLength(10)]),
    });
  }
  editStaffForm(staff:Staff) {
    let {email,username,role,fullName,address,contact} = staff;
    this.adminForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      username: new FormControl(username,[Validators.required]),
      role: new FormControl(role,[Validators.required]),
      fullName: new FormControl(fullName,[Validators.required]),
      address: new FormControl(address,[Validators.required]),
      contact: new FormControl(contact,[Validators.required,Validators.minLength(10)]),
    });
  }

  onSubmit() {
    console.log(this.adminForm.value);
    if(this.isEditform){
      this.staffService.editStaff(this.staff._id,this.staff).subscribe(
        data=>{
          this.alertify.success("Staff Updated Successfully!")
          this.router.navigateByUrl("/admin/manageStaffs"); 
        },
        err=>this.alertify.error(err)
      );
     return; 
    }
    this.staffService.registerStaff(this.adminForm.value)
    .subscribe(
      data=>{
        this.alertify.success("Staff Created Successfully!")
        this.router.navigateByUrl("/admin/manageStaffs"); 
      },
      err=>this.alertify.error(err)
    )

  }

}
