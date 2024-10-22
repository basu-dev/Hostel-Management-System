import { Faculty } from "./faculties";

export class Student{
    username:String='';
    rollNo:String;
    contact:String='';
    email:String='';
    password?:String='';
    dob:String='';
    faculty:Faculty=Faculty.ElectronicsAndCommunication;
    fullName:String='';
    address:String='';
    batch:String='';
    roomNo?:any='';
    _id?:any;
    imageUrl?:String='';
    isInMess?:boolean;
    parentsName:String;
    parentsContact:String;
    resultImages:String[]
}