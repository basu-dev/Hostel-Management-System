import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ngOnInit() {
    this.queryForm = this.fb.group({
      queryTitle:['Thsi is my first post',[Validators.required]],
      queryContent:[`Lolkjf a;ldkfj lkj lkjd flkj ;lkj lkj kj ;lkkj ;lk j;lk jlk j;lk jk lkj ;lkjk kj
      adkfj lkj lkj lk jlk j lkj ;lkj ;lkj ;lkj ;lj ;l kj;l j;lk jl;k j;lk jl;k j;lk j;l kjl; kjjk 
      lk j;lkj ;lkj ;lk j;lk j;lk j;lkj ;lkjdf;lasjkd ;ie4wroij ojwer ijwoer jowqej  woejr ij wjeorj 
      
      `],
      roomNo:["A301"]
    });
  }
  submit():void{
    this.studentService.addPost(this.queryForm.value).subscribe(
      (data:any)=>console.log(data),
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
