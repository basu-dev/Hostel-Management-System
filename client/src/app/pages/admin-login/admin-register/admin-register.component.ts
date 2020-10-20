import { Router } from '@angular/router';
import { AlertifyService } from './../../../_services/alertify.service';
import { AdminService } from './../../../_services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  showLoader = false;
  adminForm: FormGroup;
  constructor(private adminService: AdminService, private alerify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.adminService.getAllAdmins();
    this.initAdminForm();
  }

  initAdminForm() {
    this.adminForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {

    this.showLoader = true;
    this.adminService.insertAllAdmin(this.adminForm.value).subscribe(
      res=>{
        this.showLoader=false,
        this.alerify.success("Admin Account Creation Successful");
        this.router.navigate(['/adminLogin'])
      },
      err=>{
        this.showLoader = false;
        this.alerify.error('Oops some error occured');
      }
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
