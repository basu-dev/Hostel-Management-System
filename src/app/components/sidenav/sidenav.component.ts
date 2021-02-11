import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  userName:String | null='';
  constructor(public authService: AuthService) { }

  ngOnInit() {
    // $('#menu-toggle').click(function(e) {
    //   e.preventDefault();
    //   $('#wrapper').toggleClass('toggled');
    // });

    this.userName = localStorage.getItem('userName');
  }

  ngDoCheck() {
    this.userName = localStorage.getItem('userName');
  }

}
