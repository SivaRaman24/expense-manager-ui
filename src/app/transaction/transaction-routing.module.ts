import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { CreateEditTransactionComponent } from './create-edit-transaction/create-edit-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionListComponent
  },
  {
    path:'create',
    component: CreateEditTransactionComponent
  },
  {
    path:'edit/:id',
    component: CreateEditTransactionComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: TransactionDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
