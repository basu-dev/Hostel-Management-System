import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { Block, Room } from 'src/app/model/room';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-room-register',
  templateUrl: './room-register.component.html',
  styleUrls: ['./room-register.component.css']
})
export class RoomRegisterComponent implements OnInit {

  showLoader = false;
  keys:any[] ;//for the index of select list of blocks

  componentName = 'Room Registration';
  blocks  =Block;
  constructor(private router: Router,
    private authService: AuthService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private alertify: AlertifyService
  ) {
    this.keys = Object.keys(this.blocks).filter(String);
    console.log(this.keys);
    
   }
  roomForm: any;
  room: Room;
  roomSub: Subscription;
  isEditform = false;
  ngOnInit() {

    const roomName = this.route.snapshot.paramMap.get('roomName') as String;
    if(roomName){
    this.roomSub = this.roomService.getRoomByName(roomName).subscribe(data => {
      this.room = data,
        (err: any) => this.alertify.error(err)
    });
    console.log(this.room);
    if (this.room) {
      if (typeof (this.room)) {
        this.isEditform = true;
        this.componentName = 'Edit Room';
      }
      else {
        console.log("In between")
      }
    }
    else {
      this.componentName = 'Room Registration';

      this.isEditform = false;
    }
    if (this.isEditform) {
      this.editRoomForm(this.room);

    } 

  }
  else {
    this.initroomForm();
  }
  }

  initroomForm() {

    this.roomForm = this.builder.group({
      roomName: ['A301'],
      block: Block.A,
      students: this.builder.group({
        student1: ['073bex412'],
        student2: ['073bex422']
      }),
      assets: this.builder.group({
        table: ['2'],
        chair: ['3'],
        wardrobe: ['2'],
        bed: ['2']
      })
    })
  }
  editRoomForm(room: Room) {
    const { roomName, block, students, assets } = room;
    console.log(room);
    this.roomForm = this.builder.group({
      roomName: [roomName],
      block: block,
      students: this.builder.group({
        student1: [students[0]],
        student2: [students[1]]
      }),
      assets: this.builder.group({
        table: [assets.table],
        chair: [assets.chair],
        wardrobe: [assets.wardrobe],
        bed: [assets.bed]
      })
    })
  }


  get table(): any {
    return this.roomForm.get('assets.room')
  }
  get chair(): any {
    return this.roomForm.get('assets.chi')
  }
  get wordrobe(): any {
    return this.roomForm.get('assets.wordrobe')
  }
  get bed(): any {
    return this.roomForm.get('assets.bed')
  }
  get room1(): any {
    return this.roomForm.get('room.room1')
  }
  get room2(): any {
    return this.roomForm.get('room.room2')
  }
  onSubmit() {
    console.log(this.roomForm.value);
    this.authService.registerAdmin(this.roomForm.value)
      .subscribe(
        data => console.log(data),
        err => console.error(err)
      )

  }
  ngOnDestroy(): void {

  }

}
