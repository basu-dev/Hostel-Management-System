export interface Notification{
    title:String,
    contentId:String,
    date:String,
    notificationOf:NotificationType
}
export enum NotificationType{
    notice="notice",
    query="query"
}