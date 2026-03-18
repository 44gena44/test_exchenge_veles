import { NextResponse } from 'next/server';
import { transactionHistory } from '@/shared/lib/mock';

export const dynamic = 'force-dynamic';

const transactions = transactionHistory.map((transaction) => ({
  id: transaction.id,
  date: transaction.date,
  status: transaction.status,
  is_payment_proceed: transaction.status !== 'Ожидает оплаты' ,
  payment_url:
    transaction.status === 'Ожидает оплаты'
      ? `https://example.com/pay/${transaction.id}`
      : null,
  amount: transaction.amount,
}));

export async function GET() {
  return NextResponse.json({ transactions });
}
