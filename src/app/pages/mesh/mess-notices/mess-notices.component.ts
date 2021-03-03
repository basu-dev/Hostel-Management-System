import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-mess-notices',
  templateUrl: './mess-notices.component.html',
  styleUrls: ['./mess-notices.component.scss']
})
export class MessNoticesComponent implements OnInit {

  constructor(private modalService:ModalService) { }

  ngOnInit() {
  }
  openModal(id: string) {
    console.log("opening modal")
    this.modalService.open(id);
}

}
