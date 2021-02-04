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
    // this.roomForm = new FormGroup({
    //   roomName: new FormControl('301'),
    //   username: new FormControl('animal32',[Validators.required]),
    //   student: new FormGroup({
    //     student1: new FormControl('bex073'),
    //     student2: new FormControl('bex073'),
    //   }),
    //   assets: new FormGroup({
    //     table: new FormControl('2',[Validators.required]),
    //     chair: new FormControl('2',[Validators.required]),
    //     wordrobe: new FormControl('2',[Validators.required]),
    //     bed: new FormControl('2',[Validators.required])
    //   }),
    //   block: new FormControl('A')
    // });

    this.roomForm= this.builder.group({
        roomName: ['301'],
        block:'A',
        student:this.builder.group({
          student1:['bex073'],
          student2:['bex073']
        }),
        assets: this.builder.group({
          table:['2'],
          chair:['3'],
          wardrobe:['2'],
          bed:['2']
        })
    })
  }

  get table():any{
    return this.roomForm.get('assets.room')
  }
  get chair():any{
    return this.roomForm.get('assets.chi')
  }
  get wordrobe():any{
    return this.roomForm.get('assets.wordrobe')
  }
  get bed():any{
    return this.roomForm.get('assets.bed')
  }
  get student1():any{
    return this.roomForm.get('student.student1')
  }
  get student2():any{
    return this.roomForm.get('student.student2')
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
