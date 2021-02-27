import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService:MessageService,private alertify:AlertifyService) { }
messages:any;
currentMessages:any;
receiver:string;
title:String;
messageStatus = "student";
selectedMessage:String = ''
showReplyBox = false;
  ngOnInit() {
    this.messages = this.messageService.adminMesseges;
    this.loadStudentMessages();
  }
  loadStudentMessages(){
    this.receiver = "6033b88c141f97001569b537";
    this.messageService.getMessages("6033b88c141f97001569b537").subscribe(
      data=>console.log(data),
      (err:any)=>this.alertify.error(err)
    )
    this.title="Student Messagses";
    this.messageStatus =  "student";
  }
  loadMeshMessages(){
    this.receiver = "messstaff";
    this.messageService.getMessages("messstaff").subscribe(
      data=>this.currentMessages = data,
      (err:any)=>this.alertify.error(err)
    )
    this.title="Mess Messagses";
    this.messageStatus =  "messstaff";
  }
  loadStaffMessages(){
    this.receiver = "hostelstaff";
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
  return this.messageStatus ==="messstaff";
} 
sendMessage(e:any){
  console.log(e.target.value);
  console.log(this.receiver);
  this.messageService.setMessage(this.receiver,e?.target?.value).subscribe(
    data=>console.log(data),
    (err:any)=>this.alertify.error(err)
  )
}
_showReplyBox(){
    // this.showReplyBox = true;
    // this.selectedMessage = receiver;
}
}
