import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService:MessageService) { }
messages:any;
currentMessages:any;
title:String;
messageStatus = "student";
selectedMessage:String = ''
showReplyBox = false;
  ngOnInit() {
    this.messages = this.messageService.adminMesseges;
    this.loadStudentMessages();
  }
  loadStudentMessages(){
    this.currentMessages = this.messages.filter((x:any)=>x.senderType == "student");
    this.title="Student Messagses";
    this.messageStatus =  "student";
  }
  loadMeshMessages(){
    this.currentMessages = this.messages.filter((x:any)=>x.senderType == "meshstaff")
    this.title="Mesh Messagses";
    this.messageStatus =  "meshstaff";

  }
  loadStaffMessages(){
    this.currentMessages = this.messages.filter((x:any)=>x.senderType == "hostelstaff")
    this.title="Staff Messagses";
    this.messageStatus =  "hostelstaff";


  }
  get isStudentMsg():boolean{
      return this.messageStatus === "student";
  } 
  get isStaffMsg():boolean{
    return this.messageStatus ==="hostelstaff";
} 
get isMeshMsg():boolean{
  return this.messageStatus ==="meshstaff";
} 
sendMessage(e:any){
  console.log(e.target.value);
  this.messageService.replyMessage(this.selectedMessage,e?.target?.value,this.messageStatus);
}
_showReplyBox(id:String){
  console.log('clcied')
    this.showReplyBox = true;
    this.selectedMessage = id;
}
}
