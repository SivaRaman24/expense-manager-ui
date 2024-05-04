import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryService } from '../category.service';
import { Category, CategoryEvent } from '../model/category.items';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categoryTitle: string;
  categories: Array<Category>;

  constructor(private router: Router, private categoryService: CategoryService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getCategories();
  }

  trackCategoryById(index: number, category: Category) {
    return category?.id;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: Array<Category>) => {
      this.categories = [...res];
      this.changeDetectorRef.markForCheck();
    });
  }

  handleCategoryEvents(evt: CategoryEvent) {
    if(evt && evt.action) {
      switch(evt.action) {
        case 'viewCategory':
          this.viewCategory(evt?.id);
          break;
        case 'editCategory':
          this.editCategory(evt?.id);
          break;
        case 'deleteCategory':
          this.deleteCategory(evt?.id);
          break;
      }
    }
  }

  goToAddNewCategory() {
    this.router.navigate(['categories/create']);
  }

  viewCategory(id: string | undefined) {
    // this.categoryTitle = this.categories[0].name + '_' + id;
    this.categories[0].name = 'Updated category name';
  }

  editCategory(id: string | undefined) {
    this.router.navigate([`/categories/edit/${id}`])
  }

  deleteCategory(id: string | undefined) {
    this.categories.pop();
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
  }
}
