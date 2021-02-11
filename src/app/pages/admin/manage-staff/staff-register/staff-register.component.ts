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
    const id = this.route.snapshot.paramMap.get('id');
    this.staffSub = this.staffService.getStaffById(id).subscribe(data=>{
      this.staff=data,
      (err:any)=>this.alertify.error(err)
    });
    console.log(this.staff);
    if(this.staff){
      if (typeof(this.staff)){
        this.isEditform=true;
        this.componentName='Edit Staff ';
      }
      else{
        console.log("In between")
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
      userName: new FormControl('animal32',[Validators.required]),
      staffType: new FormControl('bex',[Validators.required]),
      fullName: new FormControl('New User',[Validators.required]),
      address: new FormControl('Chitwan',[Validators.required]),
      contactNo: new FormControl('5646546546546',[Validators.required,Validators.minLength(10)]),
      // department: new FormControl('',Validators.required)
    });
  }
  editStaffForm(staff:Staff) {
    let {email,userName,staffType,fullName,address,contactNo} = staff;
    this.adminForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      userName: new FormControl(userName,[Validators.required]),
      staffType: new FormControl(staffType,[Validators.required]),
      fullName: new FormControl(fullName,[Validators.required]),
      address: new FormControl(address,[Validators.required]),
      contactNo: new FormControl(contactNo,[Validators.required,Validators.minLength(10)]),
      // department: new FormControl('',Validators.required)
    });
  }

  onSubmit() {
    console.log(this.adminForm.value);
    if(this.isEditform){
      this.staffService.editStaff(this.staff.userName,this.staff);
     return; 
    }
    this.staffService.registerStaff(this.adminForm.value)
    .subscribe(
      data=>{
        this.router.navigateByUrl("/admin/manageStaffs"); 
      },
      err=>this.alertify.error(err)
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
