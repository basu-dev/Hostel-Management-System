import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomsService } from 'src/app/_services/rooms.service';
import { Room } from './../../../_models/room.model';
import { AlertifyService } from './../../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { UsersService } from 'src/app/_services/users.service';
declare const $: any;

@Component({
  selector: 'app-allocate-user',
  templateUrl: './allocate-user.component.html',
  styleUrls: ['./allocate-user.component.css']
})
export class AllocateUserComponent implements OnInit {
  showLoader = false;
  showModalLoader = false;
  allocatedUsers: User[] = [];
  availableRooms: Room[] = [];
  allocationForm: FormGroup;
  previousAllocatedRoom = '';
  previousRoom: Room;
  allocatedUserKey;
  previousAllocatedRoomKey;

  constructor(private userService: UsersService, private alertify: AlertifyService,
              private roomsService: RoomsService) { }

  ngOnInit() {
    this.showLoader = true;
    this.getAllocatedUsers();
    this.getAllRooms();
    this.initAllocationForm();
  }

  getAllocatedUsers() {
    this.userService.getUsersList().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['_id'] = element.key;
          if (x['roomNo'] !== 'Not Allocated') {
            this.allocatedUsers.push(x as User);
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
            this.availableRooms.push(x as Room);
          }
        });
      })
    );
  }

  initAllocationForm() {
    this.allocationForm = new FormGroup({
      roomNo: new FormControl(this.previousAllocatedRoom, Validators.required)
    });
  }

  initEdit(item: User) {
    this.previousAllocatedRoom = item.roomNo;
    this.allocatedUserKey = item._id;
    for (let ob of this.availableRooms) {
      if(ob.roomNo === this.previousAllocatedRoom) {
        this.previousAllocatedRoomKey = ob._id;
        this.previousRoom = ob;
        const index = this.availableRooms.indexOf(ob);
        this.availableRooms.splice(index, 1);
      }
    }
  }

  onSubmit() {
    this.showModalLoader = true;
    const newRoom = this.allocationForm.value.roomNo;
    this.roomsService.allocateUser(this.allocatedUserKey, newRoom).then(() => {
      this.showModalLoader = false;
      $('#exampleModal').modal('toggle');

      if (newRoom !== 'Not Allocated') {
        for (let item of this.availableRooms) {
          if(item.roomNo === newRoom) {
            item.remainingCapacity = item.remainingCapacity - 1;
            this.roomsService.updateRoom(item).then(() => {
              console.log('new room updated');
            }).catch((err) => {
              console.log(err);
            });
          }
        }
      }

      this.previousRoom.remainingCapacity = this.previousRoom.remainingCapacity + 1;
      this.roomsService.updateRoom(this.previousRoom).then(() => {
        console.log('old room updated');
      }).catch((err) => {
        console.log(err);
      });

      this.alertify.success('Room allocation successful');
      this.availableRooms = [];
      this.allocatedUsers = [];
      this.getAllocatedUsers();
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

}
