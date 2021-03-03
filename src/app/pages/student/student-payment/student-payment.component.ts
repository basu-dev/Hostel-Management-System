import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessService } from 'src/app/services/mess.service';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.scss']
})
export class StudentPaymentComponent implements OnInit {

  constructor(private messService:MessService,
    private authService:AuthService,
    private alertify:AlertifyService) { }
    currentStudentPayment:any[];
  ngOnInit() {
    var myId = this.authService.authCredentials._id;
    this.getPaymentHistory(myId);
  }
  getPaymentHistory(id:String){
    this.messService.getPaymentHistory(id).subscribe(
      (data:any)=>{
        console.log(data.data);
        this.currentStudentPayment=data.data;
      },
      (err:any)=>this.alertify.error(err)
    )
  }

}
