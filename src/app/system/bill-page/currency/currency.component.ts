import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {

  currencies: string[] = ['USD'];

  @Input('currency') currency: any;

}
