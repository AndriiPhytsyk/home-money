import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {Observable} from 'rxjs/Observable';
import {BillModel} from '../shared/models/bill-model';
import {CategoryModel} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  bill: BillModel;
  categories: CategoryModel[] = [];
  events: EventModel[] = [];
  isLoaded = false;
  s1: Subscription;

  constructor(private billService: BillService,
              private categoryService: CategoriesService,
              private eventService: EventService
  ) { }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [BillModel, CategoryModel[], EventModel[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    })
  }

  categoryCost(cat: CategoryModel) {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    },0);
  }

  private catPercent(cat: CategoryModel): number {
    const catPercent = 100 * this.categoryCost(cat) / cat.capacity;
    return catPercent > 100 ? 100 : catPercent;
  }

  getCatPercent(c: CategoryModel): string {
    return this.catPercent(c) + '%';
  }

  getCatColor(cat: CategoryModel): string {
    const percent = this.catPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
  }

}
