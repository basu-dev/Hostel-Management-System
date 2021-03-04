import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Query } from 'src/app/model/query';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NoticeService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private studentService:StudentsService,private fb:FormBuilder,
    private alertify:AlertifyService,
    private authService:AuthService,
    private noticeService:NoticeService
    
    ) { }
  queryForm:FormGroup;
  @Input() query:Query;
  editForm=false;
  myRoomNo:String;
  ngOnInit() {
    this.myRoomNo = this.authService.authCredentials.roomNo;
    // if(this.query){
    //   this.editForm=true;
    //   this.queryForm = this.fb.group({
    //     queryTitle:[this.query.queryTitle,[Validators.required]],
    //     queryContent:[this.queryContent],
    //     roomNo:[this.myRoomNo]
    //   });
    // }else{
      this.queryForm = this.fb.group({
        queryTitle:['',[Validators.required]],
        queryContent:['',Validators.required],
        roomNo:[this.myRoomNo]
      });
    // }
    }
  submit():void{
    if(this.editForm){
      this.studentService.editPost(this.query._id, this.queryForm.value).subscribe(
        (data:any)=>{
          this.reloadQueries()
          this.queryForm.reset();
          this.alertify.success("Issue Edited Successfully.")
        },
        (err:any)=>this.alertify.error(err)
      )
      return;
    }
    this.studentService.addPost(this.queryForm.value).subscribe(
      (data:any)=>{
        this.reloadQueries();
        this.queryForm.reset();
        this.alertify.success("Issue Added Successfully.")
      },
      (err:any)=>this.alertify.error(err)
    )

  }
  reloadQueries(){
    this.noticeService.refreshQuerySub.next(true);
  }
get queryTitle(){
  return this.queryForm.get("queryTitle")
}
get queryContent(){
  return this.queryForm.get("queryContent")
}


}
