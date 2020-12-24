export interface Room{
    roomName:String,
    student:String[],
    asset:Asset,
    block:String
}

export interface Asset{
    table:Number,
    chair:Number,
    wardrobe:Number,
    bed:Number
}