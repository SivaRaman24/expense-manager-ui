import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../model/transaction.items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: any = [];
  tableHeaderClass = 'border-b dark:border-slate-600 font-medium p-2 pl-2 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left';
  tableDataClass = 'border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400';

  constructor(private router: Router, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe(
      (res) => {
        this.transactions = res;
      }
    )
  }

  trackByFn(_index: any, item: Transaction) {
    return item?.id;
  }

  goToAddNewTransaction() {
    this.router.navigate(['transactions/create']);
  }

  deleteTransaction(id: string) {
    if(!id) return false;

    this.transactionService.deleteTransaction(id).subscribe(res => {
      this.transactions = [...this.transactions.filter((transaction: Transaction) => {
        return transaction.id !== id;
      })];
    });
  }

  handleEvent(evt: Event) {
    const id = (evt.target as HTMLInputElement).getAttribute('data-id');
    const action = (evt.target as HTMLInputElement).getAttribute('data-action');

    if(!id || !action) {
      return false;
    }

    switch(action) {
      case 'view':
        this.router.navigate([`/transactions/${id}`])
        break;
      case 'edit':
        console.log('Edit transaction', id);
        this.router.navigate([`/transactions/edit/${id}`])
        break;
      case 'delete':
        this.deleteTransaction(id);
        break;
    }
  }
}
