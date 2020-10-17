import { AlertifyService } from './../../_services/alertify.service';
import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  showLoader = false;
  userList: User[] = [];
  detailedUser: User;
  constructor(private router: Router, private userService: UsersService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.showLoader = true;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsersList().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.userList.push(x as User);
        });
      }),
      ((err) => {
        this.showLoader = false;
        console.log(err);
        this.alertify.error('Oops some error occured');
      })
    );
  }

  onCreateUser() {
    this.router.navigate(['/createUser']);
  }

  onUserEdit(key) {
    this.router.navigate(['/editUser', key]);
  }

  onDeleteUser(key) {
    this.userService.deleteUser(key).then(() => {
      this.alertify.success('User deleted successfully');
      this.userList = [];
      this.loadUsers();
    }).catch(() => {
      this.alertify.error('Oops some error occured');
    });
  }

  onDetails(item: User) {
    this.detailedUser = item;
  }

}
