import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../model/transaction.items';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  transactionId: string | null;
  paramMapSub$: Subscription;
  transaction: Transaction | null = null;

  constructor(private activatedRoute: ActivatedRoute, private transactionService: TransactionService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.paramMapSub$ = this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.transactionId = params.get('id');
        this.getTransactionDetail();
      }
    );
  }

  getTransactionDetail() {
    return this.transactionService.getTransactionDetail(this.transactionId).subscribe((res) => {
      this.transaction = res as Transaction;
    });
  }
}
