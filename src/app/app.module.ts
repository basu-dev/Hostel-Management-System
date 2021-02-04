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


@NgModule({
  declarations: [
    AppComponent,
    AdminRegisterComponent,
    StudentRegisterComponent,
    RoomRegisterComponent,
    TestComponent,
    NoticesComponent,
    SidenavComponent
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
