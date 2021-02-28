
import {NgModule } from "@angular/core"
import { NoticeDetailComponent } from "./pages/common/notices/notice-detail/notice-detail.component";
import { NoticesComponent } from "./pages/common/notices/notices.component";
@NgModule({
    declarations: [
        NoticesComponent,
        NoticeDetailComponent,
    ],
    exports: [
        NoticesComponent,
        NoticeDetailComponent,
    ]
})
export class SharedModule{}