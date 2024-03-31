import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Category, CategoryEvent } from '../model/category.items';


@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent implements OnInit {

  @Input() categoryTitle: string;
  @Input() category: Category;
  @Output() handleCategoryEvents = new EventEmitter<CategoryEvent>();

  constructor() { }

  ngOnInit(): void {
    console.log('CategoryCardComponent');
  }

  view() {
    this.handleCategoryEvents.emit({ action: 'viewCategory', id: this.category?.id });
  }

  edit() {
    this.handleCategoryEvents.emit({action: 'editCategory', id: this.category?.id});
  }

  deleteCategory() {
    this.handleCategoryEvents.emit({action: 'deleteCategory', id: this.category?.id});
  }

  // ngDoCheck() {
  //   console.log('CategoryCard Component - doCheck');
  // }

}
