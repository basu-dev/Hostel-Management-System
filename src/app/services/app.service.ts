import { Injectable } from "@angular/core";
import { Observable ,of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    student = {
        name: "Basu Dev ahikari",
        roll: 12
    }
    notices = [
        {
            id: 1,
            date: 234 / 234 / 23,
            title: "New Hostel Attendees rules",
            description: "This is new notice and it should be followed by all.",
            images: [
                "https://www.tripsavvy.com/thmb/FmrjoQFUDsIkG0tTT68BcTgbQ0M=/950x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Dorm-room-in-a-hostel-5786ab2b3df78c1e1f9ceac5.jpg"
            ]
        },
        {
            id: 2,
            date: 234 / 234 / 23,
            title: "New Hostel Attendees rules Two",
            description: "This is new notice and it should be followed by all.",
            images: [
                "https://www.tripsavvy.com/thmb/FmrjoQFUDsIkG0tTT68BcTgbQ0M=/950x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Dorm-room-in-a-hostel-5786ab2b3df78c1e1f9ceac5.jpg"
            ]
        },
    ]

    getNotices(): Observable<any> {
        return of(this.notices);
    }
}