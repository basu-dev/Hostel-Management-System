import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { authReducer } from 'src/ngrx/auth/auth.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { LinearLoaderComponent } from './components/linear-loader/linear-loader.component';
import { ModalComponent } from './components/Modal/Modal.component';
import { SidenavItemComponent } from './components/sidenav/sidenav-item.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StudentRegisterComponent } from './pages/admin/manage-user/student-register/student-register.component';
import { AllQueriesComponent } from './pages/common/all-queries/all-queries.component';
import { ChangePasswordUserComponent } from './pages/common/login/change-password-user/change-password-user.component';
import { LoginComponent } from './pages/common/login/login.component';
import { NoticeDetailComponent } from './pages/common/notices/notice-detail/notice-detail.component';
import { NoticesComponent } from './pages/common/notices/notices.component';
import { AddPostComponent } from './pages/student/add-post/add-post.component';
import { ShowQueryComponent } from './pages/student/show-query/show-query.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
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

    ChangePasswordUserComponent,
    FloatingButtonComponent,
    ModalComponent,
    ShowQueryComponent,
    AllQueriesComponent,
    StudentRegisterComponent,
    //admin

    //student
    StudentDashboardComponent,
    AddPostComponent,
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
