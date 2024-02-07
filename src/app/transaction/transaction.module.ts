import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateEditTransactionComponent } from './create-edit-transaction/create-edit-transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionRoutingModule } from './transaction-routing.module';

@NgModule({
  declarations: [
    CreateEditTransactionComponent,
    TransactionListComponent,
    TransactionDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransactionRoutingModule
  ]
})
export class TransactionModule { }
