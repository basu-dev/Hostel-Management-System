import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import  * as auth from 'src/ngrx/auth/auth.reducer' ;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  username:String | null='';
  constructor(public authService: AuthService,
    private store: Store<{ auth: auth.State }>,
    ) { }
    IsAdmin= true;
    IsAuthenticated= true;
    IsStaff= false;
    IsStudent= false;
     adminSidenav=[
       {
         name:"Home",
         link:"/home",
         icon:"fas-hotel"
       },
       {
         name:"Students",
         directory:true,
         icon:"fas-users",
         link:"",
         items:[
           {
           name:"Block A",
           link:"/admin/manageStudents/A",

           },
           {
            name:"Block B",
            link:"/admin/manageStudents/C",
            },
            {
              name:"Block C",
              link:"/admin/manageStudents/C",
              },
              {
                name:"Block E",
                link:"/admin/manageStudents/E",
                },

         ]
       },
       {
         name:"Manage Rooms",
         directory:true,
         icon:"fas-home",
         link:"",
         items:[
          {
            name:"Block A",
            link:"/admin/manageRooms/A",
            },
            {
             name:"Block B",
             link:"/admin/manageRooms/C",
             },
             {
               name:"Block C",
               link:"/admin/manageRooms/C",
               },
               {
                 name:"Block E",
                 link:"/admin/manageRooms/E",
                 },
         ]
       },
       {
         name:"Staffs",
         icon:"fas-users",
         link:"/admin/manageStaffs"
       }
    
      ]
      studentSidenav=[
        {
          name:"User Profile",

        }
      ]
  ngOnInit() {
    
    this.store.pipe(
      map(data=>data.auth)
    ).subscribe(
     data=> {
        this.IsAdmin = data.IsAuthenticated,
        this.IsStudent = data.IsStudent,
        this.IsStaff = data.IsStaff,
        this.IsAuthenticated = data.IsAuthenticated
        console.log(this.IsAdmin)
     }
      
    )
   
    
    // this.username = localStorage.getItem('username');
  }
}



