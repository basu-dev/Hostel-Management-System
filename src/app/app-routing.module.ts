import { UserGuard } from './guard/user.guard';
import { AdminGuard } from './guard/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { AdminRegisterComponent } from './pages/admin-login/admin-register/admin-register.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { CreateStaffComponent } from './pages/staff-list/create-staff/create-staff.component';
import { AllocateUserComponent } from './pages/room-allocation/allocate-user/allocate-user.component';
import { RoomAllocationComponent } from './pages/room-allocation/room-allocation.component';
import { RoomsListComponent } from './pages/rooms-list/rooms-list.component';
import { CreateUserComponent } from './pages/users-list/create-user/create-user.component';

import { UsersListComponent } from './pages/users-list/users-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamListComponent } from './pages/stream-list/stream-list.component';
import { CreateStreamComponent } from './pages/stream-list/create-stream/create-stream.component';
import { CreateRoomComponent } from './pages/rooms-list/create-room/create-room.component';
import { StaffListComponent } from './pages/staff-list/staff-list.component';
import { ContactMessageComponent } from './pages/contact-message/contact-message.component';
import { CreateMessageComponent } from './pages/contact-message/create-message/create-message.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'userLogin', component: UserLoginComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {path: 'adminRegister', component: AdminRegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'createMessage', component: CreateMessageComponent},
  {
    path: '',
    canActivateChild: [AdminGuard],
    children: [
      {path: 'usersList', component: UsersListComponent},
      {path: 'createUser', component: CreateUserComponent},
      {path: 'editUser/:id', component: CreateUserComponent},
      {path: 'streamList', component: StreamListComponent},
      {path: 'createStream', component: CreateStreamComponent},
      {path: 'roomsList', component: RoomsListComponent},
      {path: 'createRoom', component: CreateRoomComponent},
      {path: 'unallocatedUsers', component: RoomAllocationComponent},
      {path: 'editAllocations', component: AllocateUserComponent},
      {path: 'staffList', component: StaffListComponent},
      {path: 'createStaff', component: CreateStaffComponent},
      {path: 'editStaff/:id', component: CreateStaffComponent},
      {path: 'messages', component: ContactMessageComponent},
    ]
  },
  {
    path: '',
    canActivateChild: [UserGuard],
    children: [
      {path: 'userDetails', component: UserDetailComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
