import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffOrAdminGuard } from './guard/staffOrAdmin.guard';
import { StudentGuard } from './guard/student.guard';

import { AdminHomeComponent } from './pages/admin/home/home.component';
import { AllQueriesComponent } from './pages/common/all-queries/all-queries.component';
import { ContactAdminComponent } from './pages/common/contact-admin/contact-admin.component';
import { ChangePasswordUserComponent } from './pages/common/login/change-password-user/change-password-user.component';
import { LoginComponent } from './pages/common/login/login.component';
import { NoticeDetailComponent } from './pages/common/notices/notice-detail/notice-detail.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { StudentDetailComponent } from './pages/student/student-detail/student-detail.component';

const routes: Routes = [
  {path:"admin", canActivate:[StaffOrAdminGuard] ,loadChildren:()=>import('./pages/admin/admin.module').then(module=>module.AdminModule)
  },
  {path:"student",canActivate:[StudentGuard],children:[
    {path:"",component:StudentDashboardComponent},
    {path:"allqueries",component:AllQueriesComponent}
  ]},
  {path:"auth/resetpassword",component:ChangePasswordUserComponent},
  {path:"studentDetail/:username",component:StudentDetailComponent},
  {path:"auth/login",component:LoginComponent},
  {path:"home",component:AdminHomeComponent},
  {path:'noticeDetail/:id',component:NoticeDetailComponent},
  {path:"createMessage",component:ContactAdminComponent},
  {path:"",redirectTo:"/home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
