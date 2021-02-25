import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { authReducer } from 'src/ngrx/auth/auth.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddIconComponent } from './components/add.component';
import { EditIconComponent } from './components/edit.component';
import { SidenavItemComponent } from './components/sidenav/sidenav-item.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TableFooterComponent } from './components/table-footer/table-footer.component';
import { TableSkeletonLoaderComponent } from './components/table-skeleton-loader/table-skeleton-loader.component';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { AdminHomeComponent } from './pages/admin/home/home.component';
import { ManageRoomComponent } from './pages/admin/manage-room/manage-room.component';
import { RoomRegisterComponent } from './pages/admin/manage-room/room-register/room-register.component';
import { ManageStaffComponent } from './pages/admin/manage-staff/manage-staff.component';
import { StaffRegisterComponent } from './pages/admin/manage-staff/staff-register/staff-register.component';
import { ManageStreamComponent } from './pages/admin/manage-stream/manage-stream.component';
import { ManageUserComponent } from './pages/admin/manage-user/manage-user.component';
import { StudentRegisterComponent } from './pages/admin/manage-user/student-register/student-register.component';
import { ContactAdminComponent } from './pages/common/contact-admin/contact-admin.component';
import { ChangePasswordUserComponent } from './pages/common/login/change-password-user/change-password-user.component';
import { LoginComponent } from './pages/common/login/login.component';
import { MessageComponent } from './pages/common/message/message.component';
import { NoticeDetailComponent } from './pages/common/notices/notice-detail/notice-detail.component';
import { NoticesComponent } from './pages/common/notices/notices.component';
import { StudentDetailComponent } from './pages/common/student-detail/student-detail.component';
import { TokenInterceptorService } from './services/token-interceptor';



@NgModule({
  declarations: [
    AppComponent,
    AdminRegisterComponent,
    StudentRegisterComponent,
    RoomRegisterComponent,
    NoticesComponent,
    SidenavComponent,
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
    NoticeDetailComponent,
    TableFooterComponent,
    SidenavItemComponent,
    MessageComponent,
    AdminHomeComponent,
    ChangePasswordUserComponent,
    TableSkeletonLoaderComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,

    ReactiveFormsModule,
    StoreModule.forRoot({ auth: authReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1000
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
