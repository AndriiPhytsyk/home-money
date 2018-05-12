import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {CategoryModel} from '../../shared/models/category.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{

  @Output() onCategoryAdd = new EventEmitter<CategoryModel>();

  sub1: Subscription;

  constructor(private categoryService: CategoriesService) { }


  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if ( capacity < 0 ) capacity *= -1;
    const category = new CategoryModel(name, capacity);
    this.sub1 = this.categoryService.addCategory(category)
      .subscribe((category: CategoryModel) => {
      form.reset();
      form.form.patchValue({capacity: 1});
      this.onCategoryAdd.emit(category);
    });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }

}
