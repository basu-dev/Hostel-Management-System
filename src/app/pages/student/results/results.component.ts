import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthCredentials } from 'src/app/model/authCredentials';
import { Student } from 'src/app/model/student';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { StudentsService } from 'src/app/services/student.service';
import { Url } from 'src/app/urls';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private authService:AuthService,
    private studentService:StudentsService,
    private alertify:AlertifyService,
    private modalService:ModalService
    ) { }
  currentUser:AuthCredentials;
  currentSudent:Student;
  currentImage:String;
  images:string[]=["../../../../assets/icons/result1.jpg",
  "../../../../assets/icons/result2.jpg",
  "../../../../assets/icons/result3.jpg",
  "../../../../assets/icons/result4.jpg"


    
]
  ngOnInit() {
    this.currentUser = this.authService.authCredentials;
    this.fetchResults();
    this.serverUrl = Url.rootUrl;
  }
  
  serverUrl:String;
  fetchResults(){
    this.studentService.getStudentByUsername(this.currentUser.rollNo!)
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.currentSudent = data.data;
        // data.data.resultImages.forEach((im:any)=>{
        //   this.images.push(`${Url.rootUrl}${im}`)
        // })
      },
      (err:any)=>this.alertify.error(err)
    );
  }

  selectImage(src:String){
    this.currentImage=src;
    this.openModal();
  }
  openModal(){
    this.modalService.open("custom-modal-image");
  }

}
