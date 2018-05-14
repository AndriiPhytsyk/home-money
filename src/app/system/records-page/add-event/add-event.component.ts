import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {EventModel} from '../../shared/models/event.model';
import {EventService} from '../../shared/services/event.service';
import {BillService} from '../../shared/services/bill.service';
import {MessageModels} from '../../../shared/model/message.models';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: CategoryModel[] = [];
  types = [
    {type: 'income', label: 'Дохід'},
    {type: 'outcome', label: 'Витрата'}
  ];

  sub1: Subscription;
  sub2: Subscription;

  message: MessageModels;

  constructor(private eventService: EventService,
              private billService: BillService) {
  }

  ngOnInit() {
    this.message = new MessageModels('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(form: NgForm) {
    let {category, amount, description, type} = form.value;
    const event = new EventModel(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
    let value = 0;
    const currency = '';
    this.sub1 = this.billService.getBill()
      .subscribe(bill => {
          if (type === 'outcome') {
            if (bill.value < amount) {
              this.showMessage(`Недостатньо коштів! Вам не вистачає ${amount - bill.value}`);
              return;
            } else {
              value = bill.value - amount;
            }
          } else {
            value = bill.value + amount;
          }

          this.sub2 = this.billService.updateBill({value, currency: bill.currency})
            .mergeMap(() => this.eventService.addEvent(event))
            .subscribe(() => {
              form.setValue({
                amount: 0,
                description: ' ',
                category: 1,
                type: 'outcome'
              });
            });
        }
      );

  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }

}
