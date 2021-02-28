import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable ,of, Subject, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { Notice } from "../model/notices";
import { Url } from "../urls";
import { AlertifyService } from "./alertify.service";

@Injectable({
    providedIn: 'root'
})
export class NoticeService {
    student = {
        name: "Basu Dev ahikari",
        roll: 12
    }
    notices :Notice[]= [
        // {
        //     _id: "1",
        //     createdTime: "2asdf",
        //     title: "New Hostel Attendees rules",
        //     body: "This is new notice and it should be followed by all.",
        //     images: [
        //         "https://www.tripsavvy.com/thmb/FmrjoQFUDsIkG0tTT68BcTgbQ0M=/950x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Dorm-room-in-a-hostel-5786ab2b3df78c1e1f9ceac5.jpg"
        //     ]
        // },
        // {
        //     _id: "2",
        //     createdTime: "234 / 234 / 23",
        //     title: "New Hostel Attendees rules Two",
        //     body: "This is new notice and it should be followed by all.",
        //     images: [
        //         "https://www.tripsavvy.com/thmb/FmrjoQFUDsIkG0tTT68BcTgbQ0M=/950x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Dorm-room-in-a-hostel-5786ab2b3df78c1e1f9ceac5.jpg"
        //     ]
        // },
    ]

    constructor(private http:HttpClient,
        private alertify:AlertifyService
        ){}
    getNotices(): Observable<Notice[]> {
        return of(this.notices);
    }
    whoseNoticeReq:String;
    public hostelNoticeSub = new Subject<Notice[]>();
    public meshNoticeSub = new Subject<Notice[]>();
    sendNotices(notices:Notice[]):void{
        switch (this.whoseNoticeReq){
            case 'hostel':
                this.hostelNoticeSub.next(notices);
                break;
            case 'mess':
                this.meshNoticeSub.next(notices);
                break;
        }
    }
    fetchAllNotices(name:String):void{
        this.whoseNoticeReq = name;
        this.http.get<{data:Notice[]}>(Url.getNotices+"?noticefrom="+name).subscribe(
            (data)=>this.sendNotices(data.data),
            (err:any)=>this.alertify.error(err)
        )
    }
    getNoticeById(id:String):Observable<Notice>{
        return of (this.notices.filter(e=>e._id == id)[0]);
    }
    getAllQueries():Observable<any>{
        return this.http.get(Url.studentquery+"/search/latest");
    }

}