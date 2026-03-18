"use client";

import * as React from "react";
import { CheckCircle, Clock, Inbox, SlidersHorizontal, XCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/shared/ui";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/shared/model/store";
import { useServerAction, valueMask } from "@/shared/lib";
import { getFastExchangeHistoryAction } from "@/d__features/mockApi/api/actions";
import RequestStoryItem from "@/entities/shortRequestDetails/ui/RequestStoryItem";
import type { FastExchangeTransaction, FastExchangeTransactionStatus } from "@/shared/model/api";

const statusMap: Record<
  FastExchangeTransactionStatus,
  { colorClass: string; Icon: React.ElementType }
> = {
  "Завершено": { colorClass: "text-primary", Icon: CheckCircle },
  "Возвращено": { colorClass: "text-primary", Icon: CheckCircle },

  "В процессе": { colorClass: "text-muted-foreground", Icon: Clock },
  "Ждем ответ банка": { colorClass: "text-muted-foreground", Icon: Clock },
  "Запрошен возврат": { colorClass: "text-muted-foreground", Icon: Clock },

  "Отменено": { colorClass: "text-destructive", Icon: XCircle },
  "Удержано": { colorClass: "text-destructive", Icon: XCircle },
  "Ошибка ANTIFRAUD": { colorClass: "text-destructive", Icon: XCircle },
  "Ошибка банка": { colorClass: "text-destructive", Icon: XCircle },
  "Ошибка инициализации": { colorClass: "text-destructive", Icon: XCircle },
  "Время вышло": { colorClass: "text-muted-foreground", Icon: Clock },
};

type HistoryItem = {
  id: string;
  type: string;
  date: string;
  amount: string;
  status: string;
  paymentUrl?: string | null;
  isPaymentProceed?: boolean;
};



const TransactionItem = ({ transaction }: { transaction: FastExchangeTransaction }) => {
  const statusInfo =
    statusMap[transaction.status] ?? statusMap["В процессе"];

    console.log(transaction)

  return (
    <Card className="p-16 mb-12 transition-colors hover:bg-muted/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div
            className={cn(
              "h-40 w-40 rounded-full flex items-center justify-center bg-primary/10",
            )}
          >
            <statusInfo.Icon className={cn("h-20 w-20", statusInfo.colorClass)} />
          </div>
          <div>
            <p className="font-semibold text-foreground">Покупка USDT</p>
            { (transaction.payment_url && transaction.status !== 'Возвращено' && transaction.status !== 'Время вышло' && transaction.status !== 'Отменено'&& transaction.status !== 'Завершено') ?  (
              <Button
                asChild
                size="sm"
                className="mt-4 text-xs h-24 px-8"
                variant="outline"
              >
                <a
                  href={transaction.payment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  На страницу оплаты
                </a>
              </Button>
            ) : <p className="text-xs text-muted-foreground mt-1">{transaction.date}</p>}

          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-16">
          <p
            className={cn(
              "font-bold text-primary flex items-center justify-end gap-4",
            )}
          >
          {valueMask(Number(Number(transaction.amount).toFixed(2)))} 
        
          </p>
          <p className={cn("text-xs font-medium", statusInfo.colorClass)}>
            {transaction.status}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default function HistoryPage() {
  const [isInstantExchange, setIsInstantExchange] = React.useState(true);

  const instantExchangeRef = React.createRef<HTMLDivElement>();
  const regularExchangeRef = React.createRef<HTMLDivElement>();
  const [getFastHistory, fastHistory] = useServerAction({
    action: getFastExchangeHistoryAction,
  });

  const userData = useAppSelector((state) => state.user.data);
  const userId = useAppSelector(state => state.user.id)

  React.useEffect(() => {
    if (userId)
      getFastHistory(userId);
  }, [userId]);

React.useEffect(() => {console.log(fastHistory)}, [fastHistory])


  const regularItems = React.useMemo(
    () => (userData?.requests_all ?? []),
    [userData]
  );

  return (
    <div className="w-full">

      <PageHeader>История обменов</PageHeader>

      <div className="mb-16">
        <Toggle
          firstButtonText="Мгновенные"
          secondButtonText="Классические"
          isFirstSelected={isInstantExchange}
          setIsFirstSelected={setIsInstantExchange}
        />
      </div>

      <div className="relative min-h-[400px]">
        {/* Мгновенные обмены */}
        <div
          ref={instantExchangeRef}
          className={`transition-opacity duration-500 ${isInstantExchange ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
        >
          {fastHistory?.transactions && fastHistory?.transactions?.length > 0 ? (
            fastHistory?.transactions?.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Inbox className="mx-auto h-12 w-12" />
              <p className="mt-4 font-semibold">Обменов не найдено</p>
            </div>
          )}
        </div>

        {/* Обычные обмены */}
        <div
          ref={regularExchangeRef}
          className={`transition-opacity duration-500 ${!isInstantExchange ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
        >
          {regularItems.length > 0 ? (
            regularItems.map((request) => (
              <RequestStoryItem key={request.id} data={request} />
            ))
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Inbox className="mx-auto h-12 w-12" />
              <p className="mt-4 font-semibold">Обменов не найдено</p>
              <p className="text-sm">Попробуйте изменить фильтры</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
