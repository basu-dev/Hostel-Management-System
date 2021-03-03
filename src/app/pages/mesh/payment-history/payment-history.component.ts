import { Component, OnInit } from '@angular/core';
import { AuthCredentials } from 'src/app/model/authCredentials';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MessService } from 'src/app/services/mess.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  constructor(private messService:MessService,
    private alertify:AlertifyService
    ) { }

  ngOnInit() {
    this.getAllStudents();
  }
  messStudents:AuthCredentials[];
currentStudentPayment:any[];
selectedStudent:AuthCredentials;
getPaymentHistory(id:String){
  this.messService.getPaymentHistory(id).subscribe(
    (data:any)=>{
      console.log(data.data);
      this.currentStudentPayment=data.data;
    },
    (err:any)=>this.alertify.error(err)
  )
}
isSelected(student:AuthCredentials){
  return this.selectedStudent == student;
}
selectStudent(student:AuthCredentials){
  this.getPaymentHistory(student._id)
  this.selectedStudent= student;

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

}
