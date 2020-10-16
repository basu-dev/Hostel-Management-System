import { AlertifyService } from './../../_services/alertify.service';
import { RoomsService } from './../../_services/rooms.service';
import { Room } from './../../_models/room.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
  showLoader = false;
  roomsList: Room[] = [];
  constructor(private router: Router, private roomsService: RoomsService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.showLoader = true;
    this.getRoomsList();
  }

  getRoomsList() {
    this.roomsService.getRoomsList().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.roomsList.push(x as Room);
        });
      }),((err) => {
        console.log(err);
        this.showLoader = false;
        this.alertify.error('Oops some error occured');
      })
    );
  }

  onCreateRoom() {
    this.router.navigate(['/createRoom']);
  }

  onDeleteRoom(key) {
    this.roomsService.deleteRoom(key).then(() => {
      this.alertify.success('Room deleted successfully');
      this.roomsList = [];
      this.getRoomsList();
    }).catch((err) => {
      console.log(err);
      this.alertify.error('Oops some error occured');
    });
  }

}
