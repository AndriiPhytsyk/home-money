import {Http, Response} from '@angular/http';
import {User} from '../model/user.model';
import {Observable} from 'rxjs/Observable';
import * as url from 'url';

export class BaseApi {

  constructor(public http: Http){}

  base = 'https://home-money-db.herokuapp.com/';

  getUrl(url: string) {
    return this.base + url;
  }

  get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
      .map((response: Response) => response.json());
  }

  post(url: string, data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }

  put(url: string, data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }
}
