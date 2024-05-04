import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'create',
    component: CreateEditCategoryComponent
  },
  {
    path: 'edit/:id',
    component: CreateEditCategoryComponent
  },
  {
    path: ':id',
    component: CategoryDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
