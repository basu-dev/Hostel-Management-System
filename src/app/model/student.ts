import { Faculty } from "./faculties";

export interface Student{
    userName:String,
    contactNo:String,
    email:String,
    password?:String,
    dob:String,
    faculty:Faculty,
    fullName:String,
    address:String,
    batch:any,
    roomNo?:any,
    id?:any,
    imageUrl?:String,
}