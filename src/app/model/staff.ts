export interface Staff{
    id?:any,
    userName:String,
    fullName:String,
    staffType:StaffType,
    password?:String,
    imageUrl?:String,
    contactNo:String,
    email:String,
    address:String

}
export enum StaffType{
    GeneralStaff = 'General',
    MeshStaff ='Mesh'
}