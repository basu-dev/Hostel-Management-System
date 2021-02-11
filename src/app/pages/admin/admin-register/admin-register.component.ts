import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  showLoader = false;
  constructor(private router: Router,private authService:AuthService,private builder: FormBuilder) { }
  adminForm: any;
  ngOnInit() {
    this.initAdminForm();
  }

  initAdminForm() {
    this.adminForm = new FormGroup({
      email: new FormControl('a@a.com', [Validators.required, Validators.email]),
      password: new FormControl('asdf234', [Validators.required, Validators.minLength(6)]),
      userName: new FormControl('animal32',[Validators.required]),
      contactNo: new FormControl('5646546546546',[Validators.required,Validators.minLength(10)])
    });
  }

  onSubmit() {
    console.log(this.adminForm.value);
    this.authService.registerAdmin(this.adminForm.value)
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
