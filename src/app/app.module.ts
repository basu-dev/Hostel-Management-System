import { RoomRegisterComponent } from './pages/admin/manage-room/room-register/room-register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { StudentRegisterComponent } from './pages/admin/manage-user/student-register/student-register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoticesComponent } from './pages/common/notices/notices.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AdminLoginComponent } from './pages/common/admin-login/admin-login.component';
import { StudentLoginComponent } from './pages/common/student-login/student-login.component';
import { ManageUserComponent } from './pages/admin/manage-user/manage-user.component';
import { ManageStreamComponent } from './pages/admin/manage-stream/manage-stream.component';
import { ManageRoomComponent } from './pages/admin/manage-room/manage-room.component';
import { ContactAdminComponent } from './pages/common/contact-admin/contact-admin.component';
import { AddIconComponent } from './components/add.component';
import { EditIconComponent } from './components/edit.component';
import { ManageStaffComponent } from './pages/admin/manage-staff/manage-staff.component';
import { StudentDetailComponent } from './pages/common/student-detail/student-detail.component';
import { StaffRegisterComponent } from './pages/admin/manage-staff/staff-register/staff-register.component';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './pages/common/login/login.component';
import { authReducer } from 'src/ngrx/auth/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    AdminRegisterComponent,
    StudentRegisterComponent,
    RoomRegisterComponent,
    NoticesComponent,
    SidenavComponent,
    AdminLoginComponent,
    StudentLoginComponent,
    ManageUserComponent,
    ManageStreamComponent,
    ManageRoomComponent,
    ContactAdminComponent,
    AddIconComponent,
    EditIconComponent,
    ManageStaffComponent,
    StudentDetailComponent,
    StaffRegisterComponent,
    ManageStaffComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ auth: authReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
