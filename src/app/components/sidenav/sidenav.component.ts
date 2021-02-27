import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { authEnum } from 'src/app/model/auth.enum';
import { AuthCredentials } from 'src/app/model/authCredentials';
import { AuthService } from 'src/app/services/auth.service';
import  * as auth from 'src/ngrx/auth/auth.reducer' ;



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  username:String | null='Basu Dev Adhikari';
  constructor(public authService: AuthService,
    private store: Store<{ auth: auth.State }>) { 
  
    }
    showLogout= false;
    currentNavItems :{name:String,link:string,icon:String,directory:boolean,items?:any}[];
    currentUser:AuthCredentials; 
    currentAuth = authEnum.IsUnauthenticated;
     adminSidenav:{name:String,link:string,icon:String,directory:boolean,items?:any}[]=[
       {
         name:"Home",
         link:"/admin",
         icon:"fa-hotel",
         directory:false,
       },
       {
         name:"Students",
         directory:true,
         icon:"fa-users",
         link:"",
         items:[
           {
           name:"Electronices & Communication",
           link:"admin/manageStudents/BEX",

           },
           {
            name:"Electrical Engineering",
            link:"admin/manageStudents/BEE",
            },
            {
              name:"Computer Engineering",
              link:"admin/manageStudents/BCT",
              },
              {
                name:"Civil Engineering",
                link:"admin/manageStudents/BCE",
                },
                {
                  name:"Geomatics Engineering",
                  link:"admin/manageStudents/BGE",
                  },
                  {
                    name:"Automobile Engineering",
                    link:"admin/manageStudents/BAE",
                    },
                    {
                      name:"Mechanical Engineering",
                      link:"admin/manageStudents/BME",
                      },
    
  

         ]
       },
       {
         name:"Manage Rooms",
         directory:true,
         icon:"fa-home",
         link:"",
         items:[
          {
            name:"Block A",
            link:"admin/manageRooms/A",
            },
            {
             name:"Block B",
             link:"admin/manageRooms/B",
             },
             {
               name:"Block C",
               link:"admin/manageRooms/C",
               },
               {
                 name:"Block E",
                 link:"admin/manageRooms/E",
                 },
         ]
       },
       {
         name:"Staffs",
         icon:"fa-users",
         link:"/admin/manageStaffs",
         directory:false,
       },
       {
         name:"Messages",
         icon:"fa-comment-dots",
         link:"/admin/messages",
         directory:false
       },
       {
         name:"Credentials",
         icon:"fa-key",
         link:"/admin/authcredentials",
         directory:false
       },
       {
         name:"Available Rooms",
         icon:"fa-room",
         link:"/admin/availableRooms",
         directory:false
       }
    
      ]
      studentSidenav=[
        {
          name:"Dashboard",
          icon:"fa-user",
          link:"/home",
          directory:false,
        },
        {
          name:"Notices",
          icon:"fa-notice",
          link:"/notices",
          directory:false,
        },
        {
          name:"Mess",
          icon:"fa-",
          link:"/student/mess",
          directory:false
        }
      ]
  ngOnInit() {
    this.authService.authSub.subscribe(
      (data)=>{this.currentAuth = data.role;
        this.currentUser = data.user;
      this.decideSideNav();
      }
    )

    this.authService.startupAuthenticate();


    // this.username = localStorage.getItem('username');
  }
  decideSideNav():void{
    console.log(this.currentAuth);
    switch (this.currentAuth){
      case authEnum.IsAdmin:
        console.log("admin")
        this.currentNavItems = this.adminSidenav
        break;
      case authEnum.IsHostelStaff:
        this.currentNavItems = this.adminSidenav;
        break;
      case authEnum.IsStudent:
        this.currentNavItems = this.studentSidenav;
    }
  }
  loadProfile():void{
    console.log("Profile loading")
  }
  logout(){
    this.authService.logout();
  }

}



