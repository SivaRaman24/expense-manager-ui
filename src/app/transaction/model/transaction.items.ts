export enum TransactionType {
  INCOME = 'I',
  EXPENSE = 'E'
}

export interface Transaction {
  name: string;
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: TransactionType;
}
