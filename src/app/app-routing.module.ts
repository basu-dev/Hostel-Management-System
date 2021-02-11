import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { ManageRoomComponent } from './pages/admin/manage-room/manage-room.component';
import { ManageUserComponent } from './pages/admin/manage-user/manage-user.component';
import { RoomRegisterComponent } from './pages/admin/manage-room/room-register/room-register.component';
import { StudentRegisterComponent } from './pages/admin/manage-user/student-register/student-register.component';
import { AdminLoginComponent } from './pages/common/admin-login/admin-login.component';
import { ContactAdminComponent } from './pages/common/contact-admin/contact-admin.component';
import { NoticesComponent } from './pages/common/notices/notices.component';
import { StudentLoginComponent } from './pages/common/student-login/student-login.component';
import { ManageStaffComponent } from './pages/admin/manage-staff/manage-staff.component';
import { StudentDetailComponent } from './pages/common/student-detail/student-detail.component';
import { StaffRegisterComponent } from './pages/admin/manage-staff/staff-register/staff-register.component';

const routes: Routes = [
  {path:"admin",children:[
    {path:"adminRegister",component:AdminRegisterComponent},
    {path:"studentRegister",component:StudentRegisterComponent},
    {path:"manageRooms",component:ManageRoomComponent},
    {path:"manageStaffs",component:ManageStaffComponent},
    {path:"staffRegister",component:StaffRegisterComponent},
    {path:"editStaff/:id",component:RoomRegisterComponent},
    {path:"roomRegister",component:RoomRegisterComponent},
    {path:"editStudent/:id",component:StudentRegisterComponent},
    {path:"manageUsers",component:ManageUserComponent},
    {path:"manageStaffs",component:ManageStaffComponent},
    {path:"editRoom/:roomName",component:RoomRegisterComponent}
  ]},
  {path:"studentDetail/:id",component:StudentDetailComponent},
  {path:"adminLogin",component:AdminLoginComponent},
  {path:"studentLogin",component:StudentLoginComponent},
  {path:"home",component:NoticesComponent},
  {path:"createMessage",component:ContactAdminComponent},
  {path:"",redirectTo:"/home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
