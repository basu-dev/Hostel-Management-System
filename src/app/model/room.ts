export interface Room{
    roomName:String,
    students:String[],
    assets:Asset,
    block:Block
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