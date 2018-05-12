import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {MessageModels} from '../../../shared/model/message.models';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  currentCategoryId = 1;
  currentCategory: CategoryModel;
  message: MessageModels;

  @Input('categories') categories;
  @Output() onCategoryEdit = new EventEmitter<CategoryModel>();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new MessageModels('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form) {
    let {name, capacity} = form.value;
    if (capacity < 0) capacity *= -1;
    const category = new CategoryModel(name, capacity, +this.currentCategoryId);
    this.categoriesService.updateCategory(category)
      .subscribe((category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория успешно отредактирована';
        window.setTimeout(() => {
          this.message.text = '';
        }, 3000);
      });
  }



}
