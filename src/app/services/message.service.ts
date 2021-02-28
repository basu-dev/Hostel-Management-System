import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Message } from '../model/message';
import { Url } from '../urls';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor(private http:HttpClient,private alertify:AlertifyService,private authService:AuthService) {  
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
    senderType:"messstaff",
    senderfullName:'Roshan Sharma',
    message:'This is not nice'
  },
  {
    _id:"23432lk3dgjasdlfk",
    senderId:'asdflkjower',
    senderType:"messstaff",
    senderfullName:'Hemraj Sharma',
    message:'This is not nice'
  },
  {
    _id:"23432lk3dgjasdlfk",
    senderId:'asdflkjower',
    senderType:"messstaff",
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
      case 'messstaff':
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
   getCurrentUserId():String{
     var id;
     var  credentials  = this.authService.authCredentials;
     console.log(credentials);
    if(credentials.role=="student"){
     id=credentials._id;
    }else{
      id=credentials.role;
    }
    return id;

  }
  getMessages(receiver:String):Observable<Message[]>{

    var id = this.getCurrentUserId();
    console.log(id);
    return this.http.get(Url.getMessages+`?sender=${id}&receiver=${receiver}`).pipe(
      tap((res:any)=>console.log(res)),
      map((res:any)=>res.data),
    );
  }
  setMessage(receiver:String,msg:StringConstructor):Observable<any>{
    var message={messageContent:msg}
   
    var id = this.getCurrentUserId();
    console.log(id);
    return this.http.post(Url.setMessages+`?sender=${id}&receiver=${receiver}`,message);
  }
  replyMessageToMesh(msgId:String,msg:any){
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
