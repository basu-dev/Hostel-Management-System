import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notice } from 'src/app/model/notices';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NoticeService } from 'src/app/services/app.service';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.scss']
})
export class AddNoticeComponent implements OnInit {

  constructor(private noticeService:NoticeService,private fb:FormBuilder,
    private alertify:AlertifyService) { }
    @Input() notice:Notice;
    noticeForm:FormGroup;
    ngOnInit() {
      if(this.notice){
        this.noticeForm = this.fb.group({
          noticeTitle:[this.notice.noticeTitle,[Validators.required]],
          noticeContent:[this.notice.noticeContent,Validators.required],
        });
      }else{
        this.noticeForm = this.fb.group({
          noticeTitle:['Meeting Tomorrow',[Validators.required]],
          noticeContent:[`This notice is to notify all of you that
          tomorrow we all are going to have a meeting at 11AM about the proper functioning of 
          the hostel mess.
          All students and staffs are requsted to be there on time.
          `,Validators.required],
        });
      }
    }
    submit():void{
      if(this.notice){
        this.noticeService.editNotice(this.notice._id!,this.noticeForm.value).subscribe(
          (data:any)=>{
            this.noticeService.refreshNotices();
            this.alertify.success("Notice Edited Successfully");
          },
          (err:any)=>this.alertify.error(err)
        )
      }
      this.noticeService.postNotice(this.noticeForm.value).subscribe(
        (data:any)=>{
          this.noticeService.refreshNotices();
          this.alertify.success("Notice Posted Successfully")
        },
        (err:any)=>this.alertify.error(err)
      )
    }
  get noticeTitle(){
    return this.noticeForm.get("noticeTitle")
  }
  get noticeContent(){
    return this.noticeForm.get("noticeContent")
  }

}
