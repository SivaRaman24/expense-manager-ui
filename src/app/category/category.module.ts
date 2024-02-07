import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryRoutingModule } from './category-routing.module';



@NgModule({
  declarations: [
    CategoryDetailComponent,
    CreateEditCategoryComponent,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
