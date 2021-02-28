import { Component, Input, OnInit } from '@angular/core';
import { Query } from 'src/app/model/query';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-show-query',
  templateUrl: './show-query.component.html',
  styleUrls: ['./show-query.component.scss']
})
export class ShowQueryComponent implements OnInit {

  constructor(private studentService:StudentsService) { }
  @Input() query:Query | any;
  @Input() myQuery:boolean;
  ngOnInit() {
  }
  editQuery():void{
    
  }
deleteQuery(){

}
makeResolved(){

}
}
