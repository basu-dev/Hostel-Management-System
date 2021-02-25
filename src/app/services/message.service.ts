import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor() {  
   this.adminMesseges=[
  {
    _id:"23432lkjasdlfk",
    senderId:'073BEX412',
    senderType:"student",
    senderfullName:'Basu Dev Adhikari',
    message:'This feature is not working . Please make some changes to it.'
  },
  {
    _id:"23432lkjasdlfk",
    senderId:'073BEX412',
    senderfullName:'Basu Dev Adhikari',
    senderType:"student",
    to:'Admin',
    message:'This feature is not working . Please make some changes to it.'
  },
  {
    _id:"23432lkj3asdlfk",
    senderId:'asrwefawe234g',
    senderType:"student",
    senderfullName:'Nayan Raj Acharya',
    message:"Please add Basu Dev Adhikari to Mesh."

  },
  {
    _id:"23432lk3dgjasdlfk",
    senderId:'073BEX415',
    senderType:"student",
    senderfullName:'Roshan Sharma',
    message:'There are some problems in displaying my image properlty'
  },
  {
    _id:"23432lk3dgjasdlfk",
    senderId:'asdflkjower',
    senderType:"meshstaff",
    senderfullName:'Roshan Sharma',
    message:'This is not nice'
  },
  {
    _id:"23432lk3dgjasdlfk",
    senderId:'asdflkjower',
    senderType:"meshstaff",
    senderfullName:'Hemraj Sharma',
    message:'This is not nice'
  },
  {
    _id:"23432lk3dgjasdlfk",
    senderId:'asdflkjower',
    senderType:"meshstaff",
    senderfullName:'Suntali Pokhrel',
    message:'This is not nice'
  },
  {
    _id:"23432lk3dgjasdfasdlfk",
    senderId:'asdfewqr',
 
    senderType:"hostelstaff",

    senderfullName:'Shiva Sharma',
    message:'This is not nice'
  },
  {
    _id:"23432lk3dgjasdfasdlfk",
    senderId:'asdfewqr',
 
    senderType:"hostelstaff",

    senderfullName:'Shiva Sharma',
    message:'lorem10 sadfa skdlkaj l;kjsd ;lkj ;lkjl; kj'
  },
  {
    _id:"23432lk3dasdfjasdfasdlfk",
    senderId:'asdfewqr',
 
    senderType:"hostelstaff",

    senderfullName:'Shiva Sharma',
    message:'This is not fasdfjlksad'
  },

]}
adminMesseges = new Array<any>();


  replyMessage(msgId:String,msg:String,receiverType:String,studentId?:String,):void{
   let  message:any={
      id:(Math.random()*234234324).toString(),
      senderType:'admin',
      message:msg

    }
    console.log(receiverType);
    switch(receiverType){
      case 'meshstaff':
        this.replyMessageToMesh(msgId,message);
        break;
      case 'student':
       this.replyMessageToStudent(msgId,message,studentId);
        break;
      case 'hostelstaff':
        this.replyMessageToHostelStaff(msgId,message);
        break;
        
    }

  }
  createMessage(msg:String,receiverType:String,studentId?:String){

  }
  replyMessageToMesh(msgId:String,msg:any){
  //  this.adminMesseges.filter((x:any)=>{
  //    if(x._id == msgId){
  //      x.replies.add(msg)
  //    }
  //  });
   this.adminMesseges.forEach((x:any)=>{
    if(x._id == msgId){
      if(x.replies){
        x.replies.push(msg)
      }
      else{
        x.replies = [];
        x.replies.push(msg)
      }
      console.log(x);

    }
  }
    )
  
  }
replyMessageToStudent(msgId:String,message:String,id?:String,){
  
}
replyMessageToHostelStaff(msgId:String,msg:String){

}

}
