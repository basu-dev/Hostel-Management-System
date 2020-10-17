import { Message } from './../_models/message.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
private messageList: AngularFireList<any>;
constructor(private db: AngularFireDatabase) { }

getAllMessages() {
  this.messageList = this.db.list('HostelManagementSystem/messageList');
  return this.messageList;
}

insertMessages(message: Message)  {
  return this.messageList.push(message);
}

}
