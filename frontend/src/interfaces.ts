import { PaymentResponseMessage, PaymentType, TransactionStatus, TransactionType } from './types';

interface HistoryData {
  _id: string;
  __v?: number;
  amount: number;
  user_id: string;
  date_time: string;
  alert: TransactionType;
  transaction_ref: string;
  status: TransactionStatus;
}

export interface StudentHistoryData extends HistoryData {
  vendor: string;
}

export interface VendorHistoryData extends HistoryData {
  student: string;
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
  _id: string;
  __v?: number;
  pin: string;
  balance: number;
  password: string;
  vendorName: string;
  vendorOwner: string;
  phoneNumber: string;
  vendorUsername: string;
  verificationStatus: boolean;
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

export interface StudentResponse {
  message: string;
  student: Student;
  studentTransaction: StudentHistoryData[];
}

export interface VendorResponse {
  message: string;
  vendor: Vendor;
  vendorTransaction: StudentHistoryData[];
}

export interface StudentLoginPayload {
  password: string;
  matricNumber: string;
}

export interface VendorLoginPayload {
  password: string;
  vendorUsername: string;
}

export interface StudentSignupPayload {
  fullName: string;
  password: string;
  phoneNumber: string;
  matricNumber: string;
}

export interface VendorSignupPayload {
  password: string;
  vendorName: string;
  phoneNumber: string;
  vendorOwner: string;
  vendorUsername: string;
}

export interface CreatePinPayload {
  pin: string;
  token: string;
}

export interface StudentProfileUpdatePayload {
  pin: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  matricNumber: string;
}

export interface VendorProfileUpdatePayload {
  password: string;
  vendorName: string;
  phoneNumber: string;
  vendorOwner: string;
  vendorUsername: string;
}

export interface PaymentPayload {
  pin: string;
  token: string;
  amount: string;
  matricNumber: string;
}

export interface VerifyAccountPayload {
  token: string;
  matricNumber: string;
}

export interface PaymentResponse {
  message: PaymentResponseMessage;
  vendorTransaction: VendorHistoryData;
}
