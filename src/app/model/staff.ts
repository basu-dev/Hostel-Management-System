export interface Staff{
    _id?:any,
    username:String,
    fullName:String,
    role:String,
    password?:String,
    imageUrl?:String,
    contact:String,
    email:String,
    address:String

}
export enum StaffType{
    GeneralStaff = 'Hostel',
    MeshStaff ='Mess'
}