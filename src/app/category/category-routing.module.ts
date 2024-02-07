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
    path: ':id',
    component: CategoryDetailComponent
  },
  {
    path: 'create',
    component: CreateEditCategoryComponent
  },
  {
    path: 'edit/:id',
    component: CreateEditCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
