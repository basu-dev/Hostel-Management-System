import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { authEnum } from 'src/app/model/auth.enum';
import { Message } from 'src/app/model/message';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService:MessageService,private alertify:AlertifyService,public authService:AuthService) { }
messages:any;
@ViewChild('scrollMe') private myScrollContainer: ElementRef;
currentMessages:Message[];
receiver:string;
title:String;
messageStatus = "student";
selectedMessage:String = ''
showReplyBox = false;
public enum:authEnum;
  ngOnInit() {
    console.log(this.authService.getIsStudent);
    this.messages = this.messageService.adminMesseges;
    this.loadStudentMessages();
    this.scrollToBottom();
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
  loadStudentMessages(){
    this.currentMessages=[];
    this.receiver = "603bb5d8ef17980015c7a5f9";
    this.messageService.getMessages("603bb5d8ef17980015c7a5f9").subscribe(
      data=>console.log(data),
      (err:any)=>this.alertify.error(err)
    )
    this.title="Student Messagses";
    this.messageStatus =  "student";
  }
  loadMeshMessages(){
    this.currentMessages=[];
    this.receiver = "messstaff";
    this.messageService.getMessages("messstaff").subscribe(
      data=>this.currentMessages = data,
      (err:any)=>this.alertify.error(err)
    )
    this.title="Mess Messagses";
    this.messageStatus =  "messstaff";
  }
  loadStaffMessages(){
    this.currentMessages=[];
    this.receiver = "hostelstaff";
    this.messageService.getMessages("hostelstaff").subscribe(
      data=>this.currentMessages = data,
      (err:any)=>this.alertify.error(err)
    )
    this.title="Staff Messagses";
    this.messageStatus =  "hostelstaff";
  }
  loadAdminMessages(){
    this.currentMessages=[];
    this.receiver = "admin";
    this.messageService.getMessages("admin").subscribe(
      data=>this.currentMessages = data,
      (err:any)=>this.alertify.error(err)
    )
    this.title="Admin Messagses";
    this.messageStatus =  "admin";
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
get isAdminMsg():boolean{
  return this.messageStatus ==="admin";
} 
sendMessage(e:any){
  if(e.target.value.trim() !=""){
    console.log(this.receiver);
    this.messageService.setMessage(this.receiver,e?.target?.value).subscribe(
      data=>console.log(data),
      (err:any)=>this.alertify.error(err)
    )
  }
  e.target.value="";
}
amISender(receiverId:String):boolean{

  return (receiverId != this.authService.authCredentials._id)
}
_showReplyBox(){
    // this.showReplyBox = true;
    // this.selectedMessage = receiver;
}
}
