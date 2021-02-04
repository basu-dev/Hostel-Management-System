import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }
name:String='Shilaj';
students:String[] = ['Shilaj',"Basu","Santosh","Susshant"]
  ngOnInit(): void {
    this.name="Shilaj";

  }
addStudent(e:any):void{
  console.log(e.target.value);
  this.students.push(e.target.value);
}
  clicked():void{
    console.log("Clicked");
    this.name="Basu";
  }

}
