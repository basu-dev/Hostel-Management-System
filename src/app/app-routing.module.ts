import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { ManageRoomComponent } from './pages/admin/manage-room/manage-room.component';
import { ManageUserComponent } from './pages/admin/manage-user/manage-user.component';
import { RoomRegisterComponent } from './pages/admin/manage-room/room-register/room-register.component';
import { StudentRegisterComponent } from './pages/admin/manage-user/student-register/student-register.component';
import { NoticesComponent } from './pages/common/notices/notices.component';
import { ManageStaffComponent } from './pages/admin/manage-staff/manage-staff.component';
import { StudentDetailComponent } from './pages/common/student-detail/student-detail.component';
import { StaffRegisterComponent } from './pages/admin/manage-staff/staff-register/staff-register.component';
import { LoginComponent } from './pages/common/login/login.component';
import { AdminGuard } from './guard/admin.guard';
import { ContactAdminComponent } from './pages/common/contact-admin/contact-admin.component';
import { NoticeDetailComponent } from './pages/common/notices/notice-detail/notice-detail.component';
import { TableFooterComponent } from './components/table-footer/table-footer.component';

const routes: Routes = [
  {path:"admin", children:[
    {path:"adminRegister",component:AdminRegisterComponent},
    {path:"studentRegister",component:StudentRegisterComponent},
    {path:"manageRooms",component:ManageRoomComponent},
    {path:"manageStaffs",component:ManageStaffComponent},
    {path:"staffRegister",component:StaffRegisterComponent},
    {path:"editStaff/:id",component:RoomRegisterComponent},
    {path:"roomRegister",component:RoomRegisterComponent},
    {path:"editStudent/:username",component:StudentRegisterComponent},
    {path:"manageUsers",component:ManageUserComponent},
    {path:"manageStaffs",component:ManageStaffComponent},
    {path:"editRoom/:roomName",component:RoomRegisterComponent},
    {path:"ngbhai",component:TableFooterComponent}
  ]},
  {path:"studentDetail/:username",component:StudentDetailComponent},
  {path:"auth/login",component:LoginComponent},
  {path:"home",component:NoticesComponent},
  {path:'noticeDetail/:id',component:NoticeDetailComponent},
  {path:"createMessage",component:ContactAdminComponent},
  {path:"",redirectTo:"/home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
