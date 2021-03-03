import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-student-notices',
  templateUrl: './student-notices.component.html',
  styleUrls: ['./student-notices.component.scss']
})
export class StudentNoticesComponent implements OnInit {

  constructor(private modalService:ModalService,private auth:AuthService) { }
isInMesh=false;
  ngOnInit() {
    this.isInMesh = this.auth.authCredentials.isInMess;
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  openModal(id: string) {
    console.log("opening modal")
    this.modalService.open(id);
}

}
