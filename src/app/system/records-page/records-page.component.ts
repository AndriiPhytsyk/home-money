import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {CategoryModel} from '../shared/models/category.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit, OnDestroy {

  categories: CategoryModel[] = [];
  isLoaded = false;
  sub1: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.sub1 = this.categoriesService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  addCategory(category) {
    this.categories.push(category);

  }

  categoryWasEdited(category: CategoryModel) {
    const ind = this.categories
      .findIndex(c => c.id === category.id);
    this.categories[ind] = category;
  }

  ngOnDestroy(){
    if (this.sub1) this.sub1.unsubscribe();
  }

}
