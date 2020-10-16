import { Room } from './../../../_models/room.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../../_services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/_services/rooms.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  showLoader = false;
  roomsForm: FormGroup;
  allRooms: Room[];
  constructor(private router: Router, private roomsService: RoomsService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.roomsService.getRoomsList();
    this.getAllRooms();
    this.initRoomForm();
  }

  getAllRooms() {
    this.roomsService.getRoomsList().valueChanges().subscribe((list: Room[]) => {
      this.allRooms = list;
    }, err => {
      console.log(err);
    })
  }

  initRoomForm() {
    this.roomsForm = new FormGroup({
      roomNo: new FormControl('', Validators.required),
      totalCapacity: new FormControl('', [Validators.required]),
      remainingCapacity: new FormControl('', Validators.required)
    });
  }

  onCancel() {
    this.router.navigate(['/roomsList']);
  }

  onSubmit() {
    this.showLoader = true;
    const formValue = this.roomsForm.value;
    let isRoomValid = true;
    this.allRooms.forEach(element => {
      if (formValue.roomNo.toLowerCase().trim() === element.roomNo.toLowerCase().trim()) {
        isRoomValid = false;
        this.alertify.error('Room with this number already exists.');
      }
    });

    if (isRoomValid) {
      this.roomsService.insertRooms(formValue).then(() => {
        this.showLoader = false;
        this.alertify.success('Room creation successful');
        this.router.navigate(['/roomsList']);
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
