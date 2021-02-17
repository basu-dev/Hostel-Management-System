import { Faculty } from "./faculties";

export class Student{
    username:String='';
    contact:String='';
    email:String='';
    password?:String='';
    dob:String='';
    faculty:Faculty=Faculty.ElectronicsAndCommunication;
    fullName:String='';
    address:String='';
    batch:any='';
    roomNo?:any='';
    _id?:any;
    imageUrl?:String='';
}