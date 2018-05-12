import {Component, HostBinding, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {fadeTrigger} from '../shared/animations/fade.animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  animations: [fadeTrigger]
})

export class AuthComponent implements OnInit {

  @HostBinding('@fade') a = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}
