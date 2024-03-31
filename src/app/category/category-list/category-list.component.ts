import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
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
  timer: any;
  timer2: any;
  timer3: any;

  constructor(private categoryService: CategoryService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // console.log('CategoryListComponent');
    this.getCategories();

    this.timer = setTimeout(() => {
      // console.log('Timeout - adding additional category');
      this.categories.push({ id: 'test', name: 'Test category', isDefault: false });
      this.changeDetectorRef.markForCheck();
    }, 3000);
  }

  trackCategoryById(index: number, category: Category) {
    return category?.id;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: Array<Category>) => {
      this.categories = [...res];
      this.changeDetectorRef.markForCheck();
      // console.log('this.categories', this.categories);
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

  viewCategory(id: string | undefined) {
    console.log('View Category', id);
    // this.categoryTitle = this.categories[0].name + '_' + id;
    this.categories[0].name = 'Updated category name';
  }

  editCategory(id: string | undefined) {
    console.log('Edit Category', id);
    this.categories[0].name = 'Updated category name';
    this.timer2 = setTimeout(() => {
      this.changeDetectorRef.markForCheck();
    }, 100);
  }

  deleteCategory(id: string | undefined) {
    console.log('Delete Category', id);
    this.categories.pop();
    this.timer3 = setTimeout(() => {
      this.changeDetectorRef.markForCheck();
    }, 100);
  }

  // ngDoCheck() {
  //   console.log('Category List Component - doCheck');
  // }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
    clearTimeout(this.timer2);
    clearTimeout(this.timer3);
  }
}
