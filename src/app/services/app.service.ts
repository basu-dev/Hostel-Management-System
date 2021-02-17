import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable ,of, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { Notice } from "../model/notices";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    student = {
        name: "Basu Dev ahikari",
        roll: 12
    }
    notices :Notice[]= [
        {
            _id: "1",
            createdTime: "2asdf",
            title: "New Hostel Attendees rules",
            body: "This is new notice and it should be followed by all.",
            images: [
                "https://www.tripsavvy.com/thmb/FmrjoQFUDsIkG0tTT68BcTgbQ0M=/950x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Dorm-room-in-a-hostel-5786ab2b3df78c1e1f9ceac5.jpg"
            ]
        },
        {
            _id: "2",
            createdTime: "234 / 234 / 23",
            title: "New Hostel Attendees rules Two",
            body: "This is new notice and it should be followed by all.",
            images: [
                "https://www.tripsavvy.com/thmb/FmrjoQFUDsIkG0tTT68BcTgbQ0M=/950x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Dorm-room-in-a-hostel-5786ab2b3df78c1e1f9ceac5.jpg"
            ]
        },
    ]

    getNotices(): Observable<Notice[]> {
        return of(this.notices);
    }
    getNoticeById(id:String):Observable<Notice>{
        return of (this.notices.filter(e=>e._id == id)[0]);
    }

}