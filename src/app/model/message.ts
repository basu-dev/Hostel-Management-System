export interface Message{
    _id:String,
    receiverId:String[],
    senderId:String[],
    replies:any,
    messageContent:String,
    date:String
}