import {Component, Input, OnInit} from '@angular/core';
import {BillModel} from '../../shared/models/bill-model';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  @Input('bill') bill: BillModel;
  @Input('currency') currency: any;
  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const {rates} = this.currency;
    this.dollar = rates['USD'] * this.bill.value;
    this.euro = rates['EUR']* this.bill.value;
  }

}
