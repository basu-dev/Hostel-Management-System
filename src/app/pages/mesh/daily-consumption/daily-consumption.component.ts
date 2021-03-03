import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCredentials } from 'src/app/model/authCredentials';
import { FoodMenu } from 'src/app/model/foodMenu';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MessService } from 'src/app/services/mess.service';

@Component({
  selector: 'app-daily-consumption',
  templateUrl: './daily-consumption.component.html',
  styleUrls: ['./daily-consumption.component.scss']
})
export class DailyConsumptionComponent implements OnInit {

  constructor(private messService:MessService,
    private alertify:AlertifyService,
    private fb:FormBuilder
    ) { }
  messStudents:AuthCredentials[];
  selectedStudent:AuthCredentials;
  foodMenu:FoodMenu[];

  consumptionForm:FormGroup;
  partOfDay="morning"
  ngOnInit() {
    this.getAllStudents();
    this.getAllMenus();
  }
  initForm(){
    this.consumptionForm=this.fb.group({
      studentId:[this.selectedStudent._id],
      foodDetails:this.fb.array(this.foodMenu.map(menu=>this.generateMenuForm(menu)
      )),
      partOfDay:[this.partOfDay,Validators.required]
    })
  }
  generateMenuForm(menu:FoodMenu){
    var tick=false;
    if(menu.foodName == "Dal & Bhat"){
      tick=true;
    }
    return this.fb.group({
      foodId:[menu._id],
      count:[1],
      selected:[tick]
    });
  }
  getAllStudents(){
    this.messService.getAllMessStudents().subscribe(
      (data:any)=>{
        // console.log(data)
        this.messStudents=data.data
        console.log(this.messStudents);
      },
      (err:any)=>this.alertify.error(err)
    )
  }

  get getFoodDetails(){
    return this.consumptionForm.get("foodDetails") as FormArray;
  }
  getAllMenus(){
    this.messService.getPriceTable().subscribe(
      (data:any)=>{
        console.log(data)
        this.foodMenu=data.data
      },
      (err:any)=>this.alertify.error(err)
    )
  }
   isSelected(student:AuthCredentials){
    return this.selectedStudent == student;
  }
  selectStudent(student:AuthCredentials){
    this.selectedStudent= student;
    this.initForm();
    console.log(this.consumptionForm.value)
  }
  submit(){
    this.messService.registerDailyConsumption(this.consumptionForm.value).subscribe(
      (data:any)=>{
        this.alertify.success("Consumption Saved")
        console.log(data)
      },
      (err:any)=>this.alertify.error(err)
    )
  }
  setPartofDay(part:string){
    this.partOfDay=part;
  }
  get isMorning(){
    return this.partOfDay=="morning";
  }


 


}
