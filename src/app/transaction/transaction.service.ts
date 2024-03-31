import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Transaction } from './model/transaction.items';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  API_BASE_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  createTransaction(transactionDetail: Transaction) {
    console.log('transactionDetail', transactionDetail);
    // return false;
    return this.httpClient.post(`${this.API_BASE_URL}/transactions`, transactionDetail);
  }

  updateTransaction(transactionDetail: Transaction) {
    return this.httpClient.patch(`${this.API_BASE_URL}/transactions/${transactionDetail.id}`, transactionDetail);
  }

  getTransactions() {
    return this.httpClient.get(`${this.API_BASE_URL}/transactions`);
  }

  getTransactionDetail(id: string | null) {
    return this.httpClient.get(`${this.API_BASE_URL}/transactions/${id}`).pipe(
      catchError((error) => {
        throw new Error(
          `There is some error while fetching transaction detail, ${error.message}`
        );
      })
    );
  }

  deleteTransaction(id: string | null) {
    console.log('deleteTransaction', id);
    if(!id) {
      throw new Error('Transaction id is mandatory');
    }

    return this.httpClient.delete(`${this.API_BASE_URL}/transactions/${id}`).pipe(
      catchError((error) => {
        throw new Error(
          `There is some error while fetching transaction detail, ${error.message}`
        );
      })
    );
  }

}
