import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import  * as auth from 'src/ngrx/auth/auth.reducer' ;
import { NbIconLibraries } from '@nebular/theme';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  username:String | null='Basu Dev Adhikari';
  constructor(public authService: AuthService,
    private store: Store<{ auth: auth.State }>,
    private iconLibraries: NbIconLibraries
    ) { 
      this.iconLibraries.registerSvgPack('social-networks', {
        'facebook': '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"> ... </svg>',
        'home':'<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" class="eva eva-home-outline" fill="currentColor"><g data-name="Layer 2"><g data-name="home"><rect width="24" height="24" opacity="0"></rect><path d="M20.42 10.18L12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2h14.22A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5v-8.42l7-7.15 7 7.19z"></path></g></g></svg>',
        'twitter': '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"> ... </svg>',
        // ...
  });
    }
    showLogout= false;
    IsAdmin= true;
    IsAuthenticated= true;
    IsHostelStaff= false;
    IsMeshStaff=false;
    IsStudent= false;
     adminSidenav:{name:String,link:string,icon:String,directory:boolean,items?:any}[]=[
       {
         name:"Home",
         link:"/home",
         icon:"fas-hotel",
         directory:false,
       },
       {
         name:"Students",
         directory:true,
         icon:"fas-users",
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
         icon:"fas-home",
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
         icon:"fas-users",
         link:"/admin/manageStaffs",
         directory:false,
       },
       {
         name:"Messages",
         icon:"fas-message",
         link:"/admin/messages",
         directory:false
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
        this.IsHostelStaff = data.IsHostelStaff,
        this.IsMeshStaff = data.IsMeshStaff,
        this.IsAuthenticated = data.IsAuthenticated
        console.log(this.IsAdmin)
     }
      
    )
   
    
    // this.username = localStorage.getItem('username');
  }
  
  logout(){
    this.authService.logout();
  }
  // sidebarClicked(item){
  //   if(item.direcotry){
      
  //   }
  // }



}



