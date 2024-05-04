import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';

import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryCardComponent } from './category-card/category-card.component';

@NgModule({
  declarations: [
    CategoryDetailComponent,
    CreateEditCategoryComponent,
    CategoryListComponent,
    CategoryCardComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
