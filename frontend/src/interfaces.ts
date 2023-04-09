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

export interface Student {
  pin: string;
  name: string;
  balance: number;
  password: string;
  phoneNumber: string;
  matricNumber: string;
  history: HistoryData[];
}

export interface Vendor {
  pin: string;
  name: string;
  username: string;
  balance: number;
  password: string;
  vendorName: string;
  phoneNumber: string;
  history: HistoryData[];
}
