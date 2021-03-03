import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCredentials } from 'src/app/model/authCredentials';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MessService } from 'src/app/services/mess.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {

  constructor(private messService:MessService,
    private alertify:AlertifyService,
    private fb:FormBuilder) { }
    messStudents:AuthCredentials[];
    selectedStudent:AuthCredentials;
    paymentForm:FormGroup;
    currentStudentDue:number;
  ngOnInit() {
    this.getAllStudents();
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
  initForm(){
    this.paymentForm=this.fb.group({
      studentId:[this.selectedStudent._id],
      
      paymentReceived:[,Validators.required]
    })
  }
  isSelected(student:AuthCredentials){
    return this.selectedStudent == student;
  }
  selectStudent(student:AuthCredentials){
    this.getDue(student)
    this.selectedStudent= student;
    this.initForm();
    console.log(this.paymentForm.value)
  }
  getDue(student:any){
    this.messService.getDueAmount(student._id).subscribe(
      (res:any)=>{
        this.currentStudentDue=res.data.dueAmount;
      },
      (err:any)=>this.alertify.error(err)
    )
  }
  submit(){
    this.messService.makePayment(this.paymentForm.value).subscribe(
      (data:any)=>{
        this.alertify.success("Payment Successful")
        console.log(data)
        this.getDue(this.selectedStudent);
      },
      (err:any)=>this.alertify.error(err)
    )
  }
  get getPaymentField(){
    return this.paymentForm.get('paymentReceived');
  }

}
