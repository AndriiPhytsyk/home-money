import { Component, OnInit } from '@angular/core';
import {User} from '../../../../shared/model/user.model';
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date;

  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
