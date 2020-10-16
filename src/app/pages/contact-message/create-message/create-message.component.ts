import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {
  messageForm: FormGroup;
  showLoader = false;
  constructor(private messageService: MessagesService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.messageService.getAllMessages();
    this.initMessageForm();
  }

  initMessageForm() {
    this.messageForm = new FormGroup({
      subject: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.showLoader = true;
    this.messageService.insertMessages(this.messageForm.value).then(() => {
      this.alertify.success('Message sent');
      this.showLoader = false;
      this.messageForm.reset();
    }).catch((err) => {
      console.log(err);
      this.alertify.error(err);
    }).finally(() => {
      this.showLoader = false;
    });
  }

}
