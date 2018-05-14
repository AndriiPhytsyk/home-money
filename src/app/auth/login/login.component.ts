import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/model/user.model';
import { AuthService } from '../../shared/services/auth.service';
import {Meta, Title} from '@angular/platform-browser';
import {MessageModels} from '../../shared/model/message.models';
import {fadeTrigger} from '../../shared/animations/fade.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: MessageModels;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private meta: Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'логин, вхід, система'},
      {name: 'description', content: 'Сторінка входа в систему'}
    ]);
  }

  ngOnInit() {
    this.message = new MessageModels('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Тепер ви можете ввійти в систему',
            type: 'success'
          });
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'Для работи з системою вам потрібно ввійти',
            type: 'warning'
          });
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: MessageModels) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.logIn();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({
              text: 'Неправильний пароль',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Такий користувач не існує',
            type: 'danger'
          });
        }
      });
  }

}
