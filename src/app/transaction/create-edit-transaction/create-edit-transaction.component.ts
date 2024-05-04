import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';

import { Transaction, TransactionType } from '../model/transaction.items';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-create-edit-transaction',
  templateUrl: './create-edit-transaction.component.html',
  styleUrls: ['./create-edit-transaction.component.scss'],
  styles: [
    `
      .class1 {
        color: red;
      }
    `,
  ],
})
export class CreateEditTransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  categories: any;
  paramMapSub$: Subscription;
  isEdit = false;
  transaction: Transaction;
  transactionId: string | null;
  inputWrapperClass = 'col-span-full grid grid-cols-7';
  labelClass = 'col-span-2 text-sm font-medium leading-6 text-gray-900';
  inputClass = 'w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
  // inputClass = 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      amount: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
    });

    this.paramMapSub$ = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.transactionId = params.get('id');
      console.log('transactionId', this.transactionId);
      if(this.transactionId) {
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
    });

    // TODO: Fetch the categories list from API
    this.categories = of([
      {
        id: '87ebb7ab-d2d5-45eb-a48b-d802f3843ef9',
        name: 'Test 1',
      },
      {
        id: '87ebb7ab-d2d5-45eb-a48b-d802f3843ef9',
        name: 'Test 2',
      },
      {
        id: '87ebb7ab-d2d5-45eb-a48b-d802f3843ef9',
        name: 'Test 3',
      },
    ]);

    this.loadTransactionDetails();
  }

  goToTransactionList() {
    this.router.navigate(['transactions']);
  }

  loadTransactionDetails() {
    if(this.isEdit) {
      this.getTransactionDetail(this.transactionId);
    }
  }

  private formatDate(date: string | Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  getTransactionDetail(id: string | null) {
    if(!id) return false;

    this.transactionService.getTransactionDetail(id).subscribe((transaction) => {
      this.transaction = transaction as Transaction;
      this.transactionForm.patchValue({
        name: this.transaction.name,
        description: this.transaction.description,
        amount: this.transaction.amount,
        date: this.formatDate(this.transaction.date),
        type: this.transaction.type,
        categoryId: this.transaction.categoryId
      })
    });
  }

  onSubmit() {
    // console.log(this.transactionForm.value);
    if(this.isEdit) {
      this.transactionService
      .updateTransaction({ ...this.transactionForm.value, id: this.transaction?.id })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/transactions']);
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Transaction completed');
          },
        });
    } else {
      this.transactionService
      .createTransaction(this.transactionForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/transactions']);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Transaction completed');
        },
      });
    }

  }
}
