export type TransactionType = 'credit' | 'debit';

export type TransactionStatus = 'completed' | 'pending';

export type HistoryDuration =
  | 'all-time'
  | 'last 7 days'
  | 'last 14 days'
  | 'last 30 days'
  | 'last 3 months';
