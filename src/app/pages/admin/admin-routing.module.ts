import { NgModule } from '@angular/core';  
import { RouterModule, Routes } from '@angular/router';  
import { AdminGuard } from 'src/app/guard/admin.guard';
import { MessageComponent } from '../common/message/message.component';
import { AdminNoticesComponent } from './admin-notices/admin-notices.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AuthCredentialsComponent } from './auth-credentials/auth-credentials.component';
import { AdminHomeComponent } from './home/home.component';
import { AvailableRoomsComponent } from './manage-room/available-rooms/available-rooms.component';
import { ManageRoomComponent } from './manage-room/manage-room.component';
import { RoomRegisterComponent } from './manage-room/room-register/room-register.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { StaffRegisterComponent } from './manage-staff/staff-register/staff-register.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { StudentRegisterComponent } from './manage-user/student-register/student-register.component';

  
const routes: Routes = [  
    {   
      path: '',children:[
        {path:'',component:AdminHomeComponent},
        {path:"adminRegister",component:AdminRegisterComponent,canActivate:[AdminGuard]},
        {path:"studentRegister",component:StudentRegisterComponent,canActivate:[AdminGuard]},
        {path:"manageRooms",component:ManageRoomComponent},
        {path:"manageRooms/:id",component:ManageRoomComponent},
        {path:"manageStaffs",component:ManageStaffComponent},
        {path:"staffRegister",component:StaffRegisterComponent,canActivate:[AdminGuard]},
        {path:"editStaff/:id",component:StaffRegisterComponent},
        {path:"roomRegister",component:RoomRegisterComponent,canActivate:[AdminGuard]},
        {path:"editStudent/:username",component:StudentRegisterComponent},
        // {path:"manageUsers",component:ManageUserComponent},
        {path:"manageStudents/:id",component:ManageUserComponent},
        {path:"manageStaffs",component:ManageStaffComponent,canActivate:[AdminGuard]},
        {path:"editRoom/:roomName",component:RoomRegisterComponent},
        {path:"availableRooms",component:AvailableRoomsComponent},
        {path:"notices",component:AdminNoticesComponent},
        {path:"authcredentials",component:AuthCredentialsComponent}
      ]
        
    }  
];  
  
@NgModule({  
  imports: [  
    RouterModule.forChild(routes)  
  ],  
  exports: [  
    RouterModule  
  ]  
})  
export class AdminRoutingModule {  
}  