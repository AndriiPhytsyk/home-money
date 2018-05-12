import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {EventModel} from '../shared/models/event.model';
import {CategoryModel} from '../shared/models/category.model';
import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  s1: Subscription;
  chartData = [];
  categories: CategoryModel[] = [];
  events: EventModel[] = [];
  isLoaded = false;
  isFilterVisable = false;
  filteredEvents = [];

  constructor(private categoriesService: CategoriesService,
              private eventService: EventService) { }

  ngOnInit() {
     this.s1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
     ).subscribe((data: [CategoryModel[], EventModel[]]) => {
          this.categories = data[0];
          this.events = data[1];
          this.isLoaded = true;
          this.setOriginalEvents();
          this.calculateChartData();
        });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
}

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
  }

  private toggleFilterVisability(dir: boolean) {
    this.isFilterVisable = dir;
  }

  openFilter() {
    this.toggleFilterVisability(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisability(false);
    this.setOriginalEvents();
    const startPeriod = moment().startOf(filterData.period).startOf('d').startOf('d');
    const endPeriod = moment().endOf(filterData.period).startOf('d').endOf('d');
    this.filteredEvents = this.filteredEvents.filter(e => {
      return filterData.types.indexOf(e.type) !== -1;
    })
        .filter(e => {
          return filterData.categories.indexOf(e.category.toString()) !== -1;
        })
      .filter(e => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisability(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

}
