import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-admin-notices',
  templateUrl: './admin-notices.component.html',
  styleUrls: ['./admin-notices.component.scss']
})
export class AdminNoticesComponent implements OnInit {

  constructor(    private modalService:ModalService,) { }

  ngOnInit() {
  }
  openModal(id: string) {
    console.log("opening modal")
    this.modalService.open(id);
}
closeModal(id: string) {
  this.modalService.close(id);
}

}
