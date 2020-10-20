import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Room } from './../../_models/room.model';
import { RoomsService } from './../../_services/rooms.service';
import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user.model';
declare const $: any;

@Component({
  selector: 'app-room-allocation',
  templateUrl: './room-allocation.component.html',
  styleUrls: ['./room-allocation.component.css']
})
export class RoomAllocationComponent implements OnInit {
  showLoader = false;
  unallocatedUsers: User[] = [];
  availaibleRooms: Room[] = [];
  allocationKey;
  allocationForm: FormGroup;
  showModalLoader = false;
  constructor(private router: Router, private userService: UsersService,
              private alertify: AlertifyService, private roomsService: RoomsService) { }

  ngOnInit() {
    this.showLoader = true;
    this.getUnallocatedUsers();
    this.getAllRooms();
    this.initAllocationForm();
  }

  initAllocationForm() {
    this.allocationForm = new FormGroup({
      roomNo: new FormControl(null, Validators.required)
    });
  }

  getUnallocatedUsers() {
    this.userService.getUsersList().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['_id'] = element.key;
          if (x['roomNo'] === 'Not Allocated') {
            this.unallocatedUsers.push(x as User);
          }
        });
      }),
      ((err) => {
        console.log(err);
        this.alertify.error('Oops some error occured');
      })
    );
  }

  getAllRooms() {
    this.roomsService.getRoomsList().snapshotChanges().subscribe(
      ((item) => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['_id'] = element.key;
          if(x['remainingCapacity'] > 0) {
            this.availaibleRooms.push(x as Room);
          }
        });
      })
    );
  }

  initAllocate(key) {
    this.allocationKey = key;
  }

  onSubmit() {
    this.showModalLoader = true;
    const roomNo = this.allocationForm.value.roomNo;
    this.roomsService.allocateUser(this.allocationKey, roomNo).then(() => {
      this.showModalLoader = false;
      $('#exampleModal').modal('toggle');

      for (let item of this.availaibleRooms) {
        if(item.roomNo === roomNo) {
          item.remainingCapacity = item.remainingCapacity - 1;
          this.roomsService.updateRoom(item).then(() => {
            console.log('room updated');
          }).catch((err) => {
            console.log(err);
          });
        }
      }
      this.alertify.success('Room allocation successful');
      this.availaibleRooms = [];
      this.unallocatedUsers = [];
      this.getUnallocatedUsers();
      this.getAllRooms();
    }).catch((err) => {
      this.showModalLoader = false;
      $('#exampleModal').modal('toggle');
      console.log(err);
      this.alertify.error('Oops some error occured');
    }).finally(() => {
      this.showModalLoader = false;
      $('#exampleModal').modal('toggle');
    });
  }

  onEditAllocation() {
    this.router.navigate(['/editAllocations']);
  }

}
