import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base.api';
import {Http} from '@angular/http';
import {EventModel} from '../models/event.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventService extends BaseApi{

  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: EventModel): Observable<EventModel> {
    return this.post('events', event);
  }

  getEvents(): Observable<EventModel[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<EventModel> {
    return this.get(`events/${id}`);
  }
}
