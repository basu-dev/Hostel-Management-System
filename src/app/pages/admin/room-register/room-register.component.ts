import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-register',
  templateUrl: './room-register.component.html',
  styleUrls: ['./room-register.component.css']
})
export class RoomRegisterComponent implements OnInit {
  showLoader = false;
  constructor(private router: Router,private authService:AuthService,private builder: FormBuilder) { }
  roomForm: any;
  ngOnInit() {
    this.initroomForm();
  }

  initroomForm() {
    this.roomForm = new FormGroup({
      username: new FormControl('animal32',[Validators.required]),
      student: new FormGroup({
        student1: new FormControl('bex073'),
        student2: new FormControl('bex073'),
      }),
      assets: new FormGroup({
        table: new FormControl('2'),
        chair: new FormControl('2'),
        wordrobe: new FormControl('2'),
        bed: new FormControl('2')
      }),
      block: new FormControl('A')
    });
  }

  onSubmit() {
    console.log(this.roomForm.value);
    this.authService.registerAdmin(this.roomForm.value)
    .subscribe(
      data=>console.log(data),
      err=>console.error(err)
    )
    
    
    // this.adminService.insertAllAdmin(this.roomForm.value).then(() => {
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
