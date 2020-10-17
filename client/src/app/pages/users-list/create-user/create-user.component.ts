import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { AlertifyService } from './../../../_services/alertify.service';
import { StreamsService } from './../../../_services/streams.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Stream } from 'src/app/_models/stream.model';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  streamsDD: Stream[] = [];
  userForm: FormGroup;
  showLoader = false;
  mode = 'new';
  editedUser: User;
  editedIndex = '';
  allUsers: User[];

  constructor(private router: Router, private streamService: StreamsService,
              private alertify: AlertifyService, private userService: UsersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllUsers();
    this.streamService.getStreamList().valueChanges().subscribe(
      ((list) => {
        this.streamsDD = list;
      }),
      ((err) => {
        this.alertify.error('Oops some error occured');
      })
    );

    this.userService.getUsersList();

    this.initializeUserForm();

    this.route.paramMap.subscribe(
      ((item) => {
        const id = item.get('id');
        if (!id) {
          this.mode = 'new';
        } else {
          this.mode = 'edit';
          this.editUser(id);
        }
      })
    );
  }

  initializeUserForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      streamName: new FormControl(null, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
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
    if (this.mode === 'new') {

      const user = this.userForm.value;
      let isValidUser = true;
      this.allUsers.forEach(element => {
      if (user.email.toLowerCase().trim() === element.email.toLowerCase().trim()) {
        this.alertify.error('User with this email id already exists');
        isValidUser = false;
      } else if (user.contact === element.contact) {
        this.alertify.error('User with this contact alreadt exists');
        isValidUser = false;
      }
    });

      if (isValidUser) {
        this.userService.insertUsers(this.userForm.value).then(() => {
          this.showLoader = false;
          this.alertify.success('User creation successful');
          this.router.navigate(['/usersList']);
        }).catch((err) => {
          this.showLoader = false;
          console.log(err);
          this.alertify.error('Oops some error occured');
        }).finally(() => {
          this.showLoader = false;
        });
      } else {
        this.showLoader = false;
      }
    } else if (this.mode === 'edit') {

      const user = this.userForm.value;
      let isValidUser = true;
      this.allUsers.forEach(element => {
      if (user.email.toLowerCase().trim() === element.email.toLowerCase().trim() && this.userForm.get('email').dirty) {
        this.alertify.error('User with this email id already exists');
        isValidUser = false;
      } else if (user.contact === element.contact && this.userForm.get('email').dirty) {
        this.alertify.error('User with this contact alreadt exists');
        isValidUser = false;
      }
    });

      if (isValidUser) {
      this.userService.editUser(this.editedIndex, {...this.userForm.value, 'roomNo': this.editedUser.roomNo})
      .then(() => {
        this.showLoader = false;
        this.alertify.success('Changes saved');
        this.router.navigate(['/usersList']);
      }).catch((err) => {
        this.showLoader = false;
        console.log(err);
        this.alertify.error('Oops some error occured');
      }).finally(() => {
        this.showLoader = false;
      });
    } else {
      this.showLoader = false;
    }
    }

  }

  onCancel() {
    this.router.navigate(['/usersList']);
  }

  editUser(id) {
    this.userService.getUserById(id).valueChanges().subscribe(
      ((item: User) => {
        this.editedUser = item;
        this.editedIndex = id;
        this.patchUser(this.editedUser);
      }),
      ((err) => {
        console.log(err);
        this.alertify.error('oops some error occured');
      })
    );
  }

  patchUser(user: User) {
    this.userForm.patchValue({
      name: user.name,
      streamName: user.streamName,
      email: user.email,
      contact: user.contact,
      address: user.address,
      password: user.password
    });
  }

}
