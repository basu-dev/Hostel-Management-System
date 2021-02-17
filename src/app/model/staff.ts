export interface Staff{
    id?:any,
    username:String,
    fullName:String,
    staffType:StaffType,
    password?:String,
    imageUrl?:String,
    contact:String,
    email:String,
    address:String

}
export enum StaffType{
    GeneralStaff = 'General',
    MeshStaff ='Mesh'
}