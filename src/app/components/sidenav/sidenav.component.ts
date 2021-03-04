import { Component, OnInit } from '@angular/core';

import { authEnum } from 'src/app/model/auth.enum';
import { AuthCredentials } from 'src/app/model/authCredentials';
import { AuthService } from 'src/app/services/auth.service';
import { UiServiceService } from 'src/app/services/ui-service.service';




interface sidenav{
      
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  username:String | null='Basu Dev Adhikari';
  constructor(public authService: AuthService,private uiService:UiServiceService) { 
  
    }
    loading=false;

    showLogout= false;
    showNotification:boolean=false;
    currentNavItems :{name:String,link:string,icon:String,directory:boolean,items?:any}[];
    currentUser:AuthCredentials; 
    currentAuth = authEnum.IsUnauthenticated;
     adminSidenav:{name:String,link:string,icon:String,directory:boolean,items?:any}[]=[
      //  {
      //    name:"Home",
      //    link:"/admin",
      //    icon:"fa-hotel",
      //    directory:false,
      //  },
       {name:"Notices",
       link:"admin/notices",
       icon:"fa-envelope",
       directory:false
      
      },
       {
         name:"Students",
         directory:true,
         icon:"fa-users",
         link:"",
         items:[
           {
             name:"Add Student",
             link:"admin/studentRegister"
           },
           {
           name:"Electronices & Communication",
           link:"admin/manageStudents/BEX",

           },
           {
            name:"Electrical Engineering",
            link:"admin/manageStudents/BEL",
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
             name:"Add Room",
             link:"admin/roomRegister"
           },
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
      //  {
      //    name:"Messages",
      //    icon:"fa-comment-dots",
      //    link:"/messages",
      //    directory:false
      //  },
       {
         name:"Credentials",
         icon:"fa-key",
         link:"/admin/authcredentials",
         directory:false
       },
       {
         name:"Available Rooms",
         icon:"fa-bed",
         link:"/admin/availableRooms",
         directory:false
       },
       {
         name:"Student Resuls",
         icon:"fa-file",
         link:"/admin/studentResults",
         directory:false
       }
    
      ]
      studentSidenav=[
        {
          name:"Dashboard",
          icon:"fa-user",
          link:"/student",
          directory:false,
        },
        {
          name:"Notices",
          icon:"fa-thumbtack",
          link:"student/notices",
          directory:false,
        },
        {
          name:"Queries",
          icon:"far fa-question-circle",
          link:"/student/allqueries",
          directory:false,
        },
        {
          name:"Hostel Info",
          icon:"fa-home",
          link:"/hostelinfo",
          directory:false
        },
        {
          name:"Mess",
          icon:"fa-utensils",
          link:"",
          directory:true,
          items:[
            {
              name:"My Payment",
              icon:"fa-wallet",
              link:"student/payment",
            },
            {
              name:"Price Table",
              link:"/student/priceTable"
            },
            {
              name:"Mess Info",
              link:"/messinfo"
            }
            

          ]
        },
        // {
        //   name:"Messages",
        //   link:"/messages",
        //   icon:"fa-comment-dots",
        //   directory:false,
        // },
        {
          name:"My Results",
          link:"/student/result",
          icon:"fa-file-alt",
          directory:false
        }
      ]
      messSideNav:any[]=[
        // {
        //   name:"Dashboard",
        //   link:"/mess",
        //   icon:"fa-utensils",
        //   directory:false
        // },
        {
          name:"Enroll/Remove",
          link:"/mess/enrollStudent",
          icon:"fa-user-plus",
          directory:false
        },
        { 
          name:"Notices",
          link:"/mess/notices",
          icon:"fa-thumbtack",
          directory:false

        },
        {
          name:"Price Table",
          link:"/mess/priceTable",
          icon:"fa-table",
          directory:false
        },
        {
          name:"Daily Consumption",
          link:"/mess/dailyConsumption",
          icon:"fa-arrows-alt",
          directory:false
        },
        {
          name:"Payment",
          link:"/mess/payment",
          icon:"fa-dollar-sign",
          directory:true,
          items:[
            {
              name:"Make Payment",
              link:"/mess/makePayment"
            },
            {
              name:"Payment History",
              link:"/mess/paymentHistory"
            }
          ]
        }
      
      ]
  ngOnInit() {
   this.listenLoading();
    this.authService.authSub.subscribe(
      (data)=>{this.currentAuth = data.role;
        this.currentUser = data.user;
        console.log(this.currentUser);
      this.decideSideNav();
      }
    )

    this.authService.startupAuthenticate();


    // this.username = localStorage.getItem('username');
  }
  listenLoading(){
    this.uiService.loadingSub.subscribe(
      data=>this.loading=data
    )
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
        break;
        case authEnum.IsMeshStaff:
        this.currentNavItems = this.messSideNav;
    }
  }

  toggleNotification(){
    console.log(this.showNotification);
    if(this.showNotification==false){
      this.showNotification=true
      this.uiService.notificationSub.next(true)
    }else{
      this.uiService.notificationSub.next(false)
      this.showNotification=false;
    }
  }

  loadProfile():void{
    console.log("Profile loading")
  }
  logout(){
    this.authService.logout();
  }

}



