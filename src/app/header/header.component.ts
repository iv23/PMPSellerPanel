import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public _user: UserService, private router: Router) { }

  logoutClicked() {
    this._user.logoutUser();
    this.router.navigate(['']);
  }

  ngOnInit() {
  }

}
