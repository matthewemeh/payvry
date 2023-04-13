import { PaymentType, TransactionStatus, TransactionType } from './types';

export interface HistoryData {
  _id: string;
  __v?: number;
  vendor: string;
  amount: number;
  user_id: string;
  date_time: string;
  alert: TransactionType;
  transaction_ref: string;
  status: TransactionStatus;
}

export interface ExtraStyle {
  [key: string]: string | number;
}

export interface Student {
  _id: string;
  __v?: number;
  pin: string;
  balance: number;
  fullName: string;
  password: string;
  phoneNumber: string;
  matricNumber: string;
  verificationStatus: boolean;
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

export interface Transaction {
  to: string;
  from: string;
  date: string;
  studentName: string;
  paymentType: PaymentType;
}

export interface AlertProps {
  msg: string;
  zIndex?: string;
  bgColor?: string;
  duration?: number;
  textColor?: string;
}

export interface InfoProps {
  xPos?: number;
  yPos?: number;
  classTarget?: string;
}

export interface UserResponse {
  message: string;
  student: Student;
  studentTransaction: HistoryData[];
}
