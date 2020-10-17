import { MessagesService } from './../../_services/messages.service';
import { Message } from './../../_models/message.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-message',
  templateUrl: './contact-message.component.html',
  styleUrls: ['./contact-message.component.css']
})
export class ContactMessageComponent implements OnInit {
  allMessages: Message[] = [];
  showLoader = false;
  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.showLoader = true;
    this.messageService.getAllMessages().valueChanges().subscribe(
      ((message: any) => {
        this.showLoader = false;
        this.allMessages = message;
        console.log(this.allMessages);
      }),
      ((Err) => {
        this.showLoader = false;
        console.log(Err);
      })
    );
  }
}
