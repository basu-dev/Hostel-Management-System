import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Query } from 'src/app/model/query';
import { AlertifyService } from 'src/app/services/alertify.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private studentService:StudentsService,private fb:FormBuilder,
    private alertify:AlertifyService
    
    ) { }
  queryForm:FormGroup;
  @Input() query:Query;
  editForm=false;
  ngOnInit() {
    if(this.query){
      this.editForm=true;
      this.queryForm = this.fb.group({
        queryTitle:[this.query.queryTitle,[Validators.required]],
        queryContent:[this.queryContent],
        roomNo:["A301"]
      });
    }else{
      this.queryForm = this.fb.group({
        queryTitle:['Washroom Tap Not Working',[Validators.required]],
        queryContent:[`The tap in our washroom is not working for 3 days now. I have
        posted complaints on the hostel register but there is not any actions taken to this.
        Please fix it soon.
  
        Block: A (Top Floor)
        `],
        roomNo:["A301"]
      });
    }
    }
  submit():void{
    if(this.editForm){
      this.studentService.editPost(this.query._id, this.queryForm.value).subscribe(
        (data:any)=>{
          this.alertify.success("Issue posted Successfully.")
        },
        (err:any)=>this.alertify.error(err)
      )
      return;
    }
    this.studentService.addPost(this.queryForm.value).subscribe(
      (data:any)=>{
        this.alertify.success("Issue Edited Successfully.")
      },
      (err:any)=>this.alertify.error(err)
    )
  }
get queryTitle(){
  return this.queryForm.get("queryTitle")
}
get queryContent(){
  return this.queryForm.get("queryContent")
}


}
