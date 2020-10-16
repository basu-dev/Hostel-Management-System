import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  username;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    $('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });

    this.username = localStorage.getItem('userName');
  }

  ngDoCheck() {
    this.username = localStorage.getItem('userName');
  }

}
