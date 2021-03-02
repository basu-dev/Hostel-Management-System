import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
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
      console.log(roomName);
    this.roomSub = this.roomService.getRoomByName(roomName).subscribe((data:any) => {
      this.room = data.data,
      console.log(this.room);
      this.initializeForm();
    },
      (err:any)=>{this.alertify.error(err)
      console.log("lkdasjflkdsfj")
      this.initroomForm();
      }
    );

  }
  else {
    this.initroomForm();
  }
  }
initializeForm(){
  if(this.room){
    if (typeof(this.room)){
      this.componentName='Edit Room ';
      this.editRoomForm(this.room);
    }
  }
  else{
    this.componentName='Room Registration';
    this.isEditform=false;
    this.initroomForm();
  }}
  initroomForm() {
    this.roomForm = this.builder.group({
      roomName: [''],
      block: Block.A,
      students: this.builder.array([
        new FormControl(''),
        new FormControl('')
      ],
      ),
      assets: this.builder.group({
        table: [],
        chair: [],
        wardrobe: [],
        bed: []
      })
    })
  }
  editRoomForm(room: Room) {
    console.log(room);
    const { roomName, block, students, assets } = room;
    console.log(room);
    this.roomForm = this.builder.group({
      roomName: [roomName],
      block: block,
      students: this.builder.array([
        new FormControl(students[0]),
        new FormControl(students[1])
      ]
      ),
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

 
get students() : FormArray {
  return this.roomForm.get("students") as FormArray
}
  onSubmit() {
    console.log(this.roomForm.value);
    if(this.room){
      this.roomService.updateRoom(this.room._id,this.roomForm.value).subscribe(
        (data:any)=>{
          this.alertify.success("Room Updated Successfully")
        },
        (err:any)=>this.alertify.error(err)
      )
    }
    else{
      this.roomService.registerRoom(this.roomForm.value)
        .subscribe(
          data => this.alertify.success("Room Created Successfully") ,
          err => console.error(err)
        )
    }

  }
  ngOnDestroy(): void {
    this.roomSub.unsubscribe()
  }

}
