import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user.model';
import {BaseApi} from '../core/base.api';


@Injectable()
export class UsersService extends BaseApi{
  constructor(public http: Http) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .map((user: User) => user[0] ? user[0]: undefined )
  }


  createNewUser(user: User): Observable<User> {
    return this.post('services', user)
      .map((response: Response) => response.json());
  }
}
