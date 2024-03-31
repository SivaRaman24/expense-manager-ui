export enum TransactionType {
  INCOME = 'I',
  EXPENSE = 'E'
}

export interface Transaction {
  id?: string;
  name: string;
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  category?: { name: string }
  type: TransactionType;
}
