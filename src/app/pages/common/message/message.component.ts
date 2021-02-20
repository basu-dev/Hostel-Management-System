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
messageStatus = 1;
  ngOnInit() {
    this.messages = this.messageService.adminMesseges;
    this.loadStudentMessages();
  }
  loadStudentMessages(){
    this.currentMessages = this.messages.filter((x:any)=>x.senderType == "student");
    this.title="Student Messagses";
    this.messageStatus =  1;
  }
  loadMeshMessages(){
    this.currentMessages = this.messages.filter((x:any)=>x.senderType == "meshstaff")
    this.title="Mesh Messagses";
    this.messageStatus =  2;

  }
  loadStaffMessages(){
    this.currentMessages = this.messages.filter((x:any)=>x.senderType == "hostelstaff")
    this.title="Staff Messagses";
    this.messageStatus =  3;


  }
  get isStudentMsg():boolean{
      return this.messageStatus === 1;
  } 
  get isStaffMsg():boolean{
    return this.messageStatus ===3;
} 
get isMeshMsg():boolean{
  return this.messageStatus ===2;
} 
sendMessage(){
  
}
}
