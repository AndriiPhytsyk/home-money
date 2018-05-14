import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply =  new EventEmitter<any>();
  @Input() categories: CategoryModel;
  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Тиждень'},
    {type: 'M', label: 'Місяць'}
    ];

  types = [
    {type: 'income', label: 'Дохід'},
    {type: 'outcome', label: 'Витрата'}
  ];

  constructor() { }

  ngOnInit() {
  }

  closeFilter() {
    this.onFilterCancel.emit();
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].fill(i => i !== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
      }
    );
  }
}
