export type TransactionType = 'credit' | 'debit';

export type ClientType = 'student' | 'vendor';

export type TransactionDescription = 'money received' | 'service payment' | 'withdrawal';

export type HistoryDuration =
  | 'all-time'
  | 'last 7 days'
  | 'last 14 days'
  | 'last 30 days'
  | 'last 3 months';
