import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinearLoaderComponent } from './components/linear-loader/linear-loader.component';
import { MessInfoComponent } from './components/mess-info/mess-info.component';
import { SidenavItemComponent } from './components/sidenav/sidenav-item.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StudentRegisterComponent } from './pages/admin/manage-user/student-register/student-register.component';
import { ChangePasswordUserComponent } from './pages/common/login/change-password-user/change-password-user.component';
import { LoginComponent } from './pages/common/login/login.component';
import { MessageComponent } from './pages/common/message/message.component';
import { QueryMainComponent } from './pages/common/query-main/query-main.component';
import { DailyConsumptionComponent } from './pages/mesh/daily-consumption/daily-consumption.component';
import { EnrollStudentComponent } from './pages/mesh/enroll-student/enroll-student.component';
import { MakePaymentComponent } from './pages/mesh/make-payment/make-payment.component';
import { MessHomeComponent } from './pages/mesh/mess-home/mess-home.component';
import { MessNoticesComponent } from './pages/mesh/mess-notices/mess-notices.component';
import { PaymentHistoryComponent } from './pages/mesh/payment-history/payment-history.component';
import { PaymentTableComponent } from './pages/mesh/payment-table/payment-table.component';
import { AddPriceComponent } from './pages/mesh/price-table/add-price/add-price.component';
import { PriceTableComponent } from './pages/mesh/price-table/price-table.component';
import { AddPostComponent } from './pages/student/add-post/add-post.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { StudentMeshmenuComponent } from './pages/student/student-meshmenu/student-meshmenu.component';
import { StudentNoticesComponent } from './pages/student/student-notices/student-notices.component';
import { StudentPaymentComponent } from './pages/student/student-payment/student-payment.component';
import { StudentPricetableComponent } from './pages/student/student-pricetable/student-pricetable.component';
import { TokenInterceptorService } from './services/token-interceptor';
import { SharedModule } from './shared.module';



@NgModule({
  declarations: [
    //common
    AppComponent,
    SidenavItemComponent,
    LoginComponent,
    SidenavComponent,
    ChangePasswordUserComponent,
    LinearLoaderComponent,
    MessageComponent,
    ChangePasswordUserComponent,

    
    StudentRegisterComponent,
    QueryMainComponent,
    //admin

    //student
    StudentDashboardComponent,
    
    StudentNoticesComponent,
    StudentPaymentComponent,
    StudentPricetableComponent,
    StudentMeshmenuComponent,
    //Mess

    EnrollStudentComponent,
    MessHomeComponent,
    PriceTableComponent,
    AddPriceComponent,
    DailyConsumptionComponent,
    MakePaymentComponent,
    PaymentHistoryComponent,
    PaymentTableComponent,
    MessNoticesComponent,
    MessInfoComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule,
    FormsModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,

    // StoreModule.forRoot({ auth: authReducer }),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 10
    // }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 2000
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
