import { environment } from './../environments/environment';
import { CreateUserComponent } from './pages/users-list/create-user/create-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { StreamListComponent } from './pages/stream-list/stream-list.component';
import { CreateStreamComponent } from './pages/stream-list/create-stream/create-stream.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomsListComponent } from './pages/rooms-list/rooms-list.component';
import { CreateRoomComponent } from './pages/rooms-list/create-room/create-room.component';
import { RoomAllocationComponent } from './pages/room-allocation/room-allocation.component';
import { AllocateUserComponent } from './pages/room-allocation/allocate-user/allocate-user.component';
import { StaffListComponent } from './pages/staff-list/staff-list.component';
import { CreateStaffComponent } from './pages/staff-list/create-staff/create-staff.component';
import { ContactMessageComponent } from './pages/contact-message/contact-message.component';
import { CreateMessageComponent } from './pages/contact-message/create-message/create-message.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminRegisterComponent } from './pages/admin-login/admin-register/admin-register.component';
import { HomeComponent } from './pages/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersListComponent,
    CreateUserComponent,
    StreamListComponent,
    CreateStreamComponent,
    RoomsListComponent,
    CreateRoomComponent,
    RoomAllocationComponent,
    AllocateUserComponent,
    StaffListComponent,
    CreateStaffComponent,
    ContactMessageComponent,
    CreateMessageComponent,
    UserDetailComponent,
    UserLoginComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    HomeComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 500,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
