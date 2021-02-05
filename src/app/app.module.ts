import { RoomRegisterComponent } from './pages/admin/room-register/room-register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { StudentRegisterComponent } from './pages/admin/student-register/student-register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './components/test/test.component';
import { NoticesComponent } from './pages/common/notices/notices.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AdminLoginComponent } from './pages/common/admin-login/admin-login.component';
import { StudentLoginComponent } from './pages/common/student-login/student-login.component';
import { ManageUserComponent } from './pages/admin/manage-user/manage-user.component';
import { ManageStreamComponent } from './pages/admin/manage-stream/manage-stream.component';
import { ManageRoomComponent } from './pages/admin/manage-room/manage-room.component';
import { ContactAdminComponent } from './pages/common/contact-admin/contact-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminRegisterComponent,
    StudentRegisterComponent,
    RoomRegisterComponent,
    TestComponent,
    NoticesComponent,
    SidenavComponent,
    AdminLoginComponent,
    StudentLoginComponent,
    ManageUserComponent,
    ManageStreamComponent,
    ManageRoomComponent,
    ContactAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
