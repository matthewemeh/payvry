import { ClientType, TransactionType, TransactionDescription } from './types';

export interface HistoryData {
  id: string;
  date: string;
  title: string;
  transactionAmount: number;
  transactionType: TransactionType;
  description: TransactionDescription;
}

export interface ExtraStyle {
  [key: string]: string | number;
}

export interface User {
  name: string;
  balance: number;
  clientType: ClientType;
  history: HistoryData[];
}
