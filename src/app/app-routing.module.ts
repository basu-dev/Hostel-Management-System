import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessInfoComponent } from './components/mess-info/mess-info.component';
import { LoginGuard } from './guard/login.guard';
import { StaffOrAdminGuard } from './guard/staffOrAdmin.guard';
import { StudentGuard } from './guard/student.guard';

import { AdminHomeComponent } from './pages/admin/home/home.component';
import { AllQueriesComponent } from './pages/common/all-queries/all-queries.component';
import { ContactAdminComponent } from './pages/common/contact-admin/contact-admin.component';
import { ChangePasswordUserComponent } from './pages/common/login/change-password-user/change-password-user.component';
import { LoginComponent } from './pages/common/login/login.component';
import { MessageComponent } from './pages/common/message/message.component';
import { NoticeDetailComponent } from './pages/common/notices/notice-detail/notice-detail.component';
import { NoticesComponent } from './pages/common/notices/notices.component';
import { QueryMainComponent } from './pages/common/query-main/query-main.component';
import { DailyConsumptionComponent } from './pages/mesh/daily-consumption/daily-consumption.component';
import { EnrollStudentComponent } from './pages/mesh/enroll-student/enroll-student.component';
import { MakePaymentComponent } from './pages/mesh/make-payment/make-payment.component';
import { MessHomeComponent } from './pages/mesh/mess-home/mess-home.component';
import { MessNoticesComponent } from './pages/mesh/mess-notices/mess-notices.component';
import { PaymentHistoryComponent } from './pages/mesh/payment-history/payment-history.component';
import { PriceTableComponent } from './pages/mesh/price-table/price-table.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { StudentDetailComponent } from './pages/student/student-detail/student-detail.component';
import { StudentMeshmenuComponent } from './pages/student/student-meshmenu/student-meshmenu.component';
import { StudentNoticesComponent } from './pages/student/student-notices/student-notices.component';
import { StudentPaymentComponent } from './pages/student/student-payment/student-payment.component';
import { StudentPricetableComponent } from './pages/student/student-pricetable/student-pricetable.component';

const routes: Routes = [
  {path:"admin", canActivate:[StaffOrAdminGuard] ,loadChildren:()=>import('./pages/admin/admin.module').then(module=>module.AdminModule)
  },
  {path:"student",canActivate:[StudentGuard],children:[
    {path:"",component:StudentDashboardComponent},
    {path:"allqueries",component:QueryMainComponent},
    {path:"notices",component:StudentNoticesComponent},
    {path:"payment",component:StudentPaymentComponent},
    {path:"priceTable",component:StudentPricetableComponent},
    {path:"messMenu",component:StudentMeshmenuComponent}

  ]},
  {
    path:"mess",children:[
      {
        path:"",redirectTo:"/enrollStudent", pathMatch:'full',
      },
      {path:"enrollStudent",component:EnrollStudentComponent},
      {path:"priceTable",component:PriceTableComponent},
      {path:"dailyConsumption",component:DailyConsumptionComponent },
      {path:"makePayment",component:MakePaymentComponent},
      {path:"paymentHistory",component:PaymentHistoryComponent},
      {path:"notices",component:MessNoticesComponent}
    ]
  },
  {path:"messinfo",component:MessInfoComponent},
  {path:"messages",component:MessageComponent},
  {path:"auth/resetpassword",component:ChangePasswordUserComponent},
  {path:"studentDetail/:username",component:StudentDetailComponent},
  {path:"auth/login",canActivate:[LoginGuard],component:LoginComponent},
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
