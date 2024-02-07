import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Transaction, TransactionType } from '../model/transaction.items';

@Component({
  selector: 'app-create-edit-transaction',
  templateUrl: './create-edit-transaction.component.html',
  styleUrls: ['./create-edit-transaction.component.scss'],
  styles: [
    `.class1 {
      color: red;
    }`
  ]
})
export class CreateEditTransactionComponent implements OnInit {

  transaction!: Transaction;
  transactionForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.transaction = {
      name: '',
      description: '',
      amount: 0,
      date: '',
      type: TransactionType.INCOME,
      categoryId: ''
    };

    this.transactionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      amount: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
    });
  }

}
