import { RoomService } from "../services/room.service";
import { Student } from "./student";

export interface Room{
    _id:String,
    roomName:String,
    students:Student[],
    assets:Asset,
    block:Block
}
export interface RoomStudent{
    _id:String,
    fullName:String,


}
export interface Asset{
    table:Number,
    chair:Number,
    wardrobe:Number,
    bed:Number
}

export enum Block{
    A='A',
    B='B',
    C='C',
    D='D',
    E='E'
}