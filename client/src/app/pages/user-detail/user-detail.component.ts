import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../_services/alertify.service';
import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  currentUser: User;
  userKey;
  userForm: FormGroup;
  showLoader = false;
  mainLoader = false;
  allUsers: User[] = [];
  constructor(private userService: UsersService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.userService.getUsersList();
    this.getAllUsers();
    this.mainLoader = true;
    this.userKey = localStorage.getItem('userId');
    if (this.userKey) {
      this.userService.getUserById(this.userKey).valueChanges().subscribe(
        ((user: User) => {
          this.mainLoader = false;
          this.currentUser = user;
          this.patchUserForm(this.currentUser);
        }), ((err) => {
          console.log(err);
          this.mainLoader = false;
          this.alertify.error('Oops some error occured');
        })
      );
    }
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      address: new FormControl('', Validators.required),
      contact: new FormControl('', [Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      roomNo: new FormControl({value: '', disabled: true}),
      streamName: new FormControl({value: '', disabled: true}),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  patchUserForm(user: User) {
    this.userForm.patchValue({
      address: (user.address),
      contact: (user.contact),
      email: (user.email),
      name: (user.name),
      roomNo: (user.roomNo),
      streamName: (user.streamName),
      password: (user.password)
    });
  }

  getAllUsers() {
    this.userService.getUsersList().valueChanges().subscribe((users: User[]) => {
      this.allUsers = users;
    }, err => {
      console.log(err);
    });
  }

  onSubmit() {
    this.showLoader = true;
    const password = this.userForm.value.password;
    this.currentUser.password = password;
    const user = this.userForm.value;
    let isValidUser = true;

    this.allUsers.forEach(element => {
      if (user.email === element.email.toLowerCase().trim() && this.userForm.get('email').dirty) {
        isValidUser = false;
        this.alertify.error('User with this email id already exists');
      } else if (user.contact === element.contact && this.userForm.get('contact').dirty) {
        isValidUser = false;
        this.alertify.error('User with this contact already exists');
      }
    });

    if (isValidUser) {
      this.userService.editUser(this.userKey, user).then(() => {
        this.showLoader = false;
        this.alertify.success('Profile updated successfully');
      }).catch((err) => {
        console.log(err);
        this.showLoader = false;
        this.alertify.error('Oops some error occured');
      }).finally(() => {
        this.showLoader = false;
      });
    } else {
      this.showLoader = false;
    }
   }

}
