import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIconComponent } from 'src/app/components/add.component';
import { EditIconComponent } from 'src/app/components/edit.component';
import { TableFooterComponent } from 'src/app/components/table-footer/table-footer.component';
import { TableSkeletonLoaderComponent } from 'src/app/components/table-skeleton-loader/table-skeleton-loader.component';
import { ContactAdminComponent } from '../common/contact-admin/contact-admin.component';
import { ChangePasswordUserComponent } from '../common/login/change-password-user/change-password-user.component';
import { MessageComponent } from '../common/message/message.component';
import { StudentDetailComponent } from '../student/student-detail/student-detail.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AuthCredentialsComponent } from './auth-credentials/auth-credentials.component';
import { AdminHomeComponent } from './home/home.component';
import { ManageRoomComponent } from './manage-room/manage-room.component';
import { RoomRegisterComponent } from './manage-room/room-register/room-register.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { StaffRegisterComponent } from './manage-staff/staff-register/staff-register.component';
import { ManageStreamComponent } from './manage-stream/manage-stream.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AdminRoutingModule,
    NgxPaginationModule,
    SharedModule

  ],
  entryComponents:[
    AdminHomeComponent
  ],
  declarations: [
    AdminRegisterComponent,

    RoomRegisterComponent,
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
    TableFooterComponent,
    MessageComponent,
    AdminHomeComponent,
    TableSkeletonLoaderComponent,
    AuthCredentialsComponent,
  ]
})
export class AdminModule { }