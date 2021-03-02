
import { CommonModule } from "@angular/common";
import {NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { FloatingButtonComponent } from "./components/floating-button/floating-button.component";
import { ModalComponent } from "./components/Modal/Modal.component";
import { AddNoticeComponent } from "./pages/admin/add-notice/add-notice.component";
import { AllQueriesComponent } from "./pages/common/all-queries/all-queries.component";
import { NoticeDetailComponent } from "./pages/common/notices/notice-detail/notice-detail.component";
import { NoticesComponent } from "./pages/common/notices/notices.component";
import { ShowQueryComponent } from "./pages/student/show-query/show-query.component";
const components = [
    
    NoticesComponent,
    NoticeDetailComponent,
    AllQueriesComponent,
    ShowQueryComponent,
    ModalComponent,
    FloatingButtonComponent,
    AddNoticeComponent
]
@NgModule({
    imports:[
        ReactiveFormsModule,
        CommonModule,
        NgxPaginationModule,
    ],
    declarations: [
        components
    ],
    exports: [
  components
    ]
})
export class SharedModule{}