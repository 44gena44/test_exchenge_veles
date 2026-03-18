"use client";

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Separator } from './ui/separator';
import { useRouter } from 'next/navigation';

export function ExchangeStatusModal({
  isOpen,
  onOpenChange,
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
  paymentMethod,
  receivingBank,
  usdtAddress,
  phoneNumber,
  isRubToUsdt,
  isUsdtToRub,
  paymentLink,
  finalAmount,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
  paymentMethod?: string;
  receivingBank?: string;
  usdtAddress?: string;
  phoneNumber?: string;
  isRubToUsdt?: boolean;
  isUsdtToRub?: boolean;
  paymentLink?: string;
  finalAmount?: number | null;
}) {

  const router = useRouter()

  const handlePaymentButton = () => {
console.log(paymentLink)
    window.open(paymentLink, 'blank')
    router.push('/history')
  }

  React.useEffect(() => {
    if (isOpen) {
      return () => {
        router.push('/history')
      }
    }
  }, [isOpen])
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background p-24">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Статус обмена</DialogTitle>
          <DialogDescription className="text-center">
            Ваша заявка на обмен принята в обработку.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-16 py-16">
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Вы отдаете</span>
                <span className="font-bold text-foreground">{fromAmount} {fromCurrency}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Вы получаете</span>
                <span className="font-bold text-foreground">{finalAmount} {toCurrency}</span>
            </div>

            <Separator className='my-16' />

            {isRubToUsdt && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Способ оплаты</span>
                  <span className="font-bold text-foreground">{paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Адрес получения</span>
                  <span className="font-bold text-foreground truncate max-w-[150px]">{usdtAddress}</span>
                </div>
              </>
            )}

            {isUsdtToRub && (
                <>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Номер телефона</span>
                        <span className="font-bold text-foreground">{phoneNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Банк для получения</span>
                        <span className="font-bold text-foreground">{receivingBank}</span>
                    </div>
                </>
            )}

            <Separator className='my-16' />

            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Статус</span>
                <div className="flex items-center gap-8 font-bold text-yellow-500">
                    <Clock className="h-16 w-16" />
                    <span>Ожидание оплаты</span>
                </div>
            </div>
        </div>

        <DialogFooter className="flex-col gap-8">
            {isRubToUsdt && (
                <Button onClick={handlePaymentButton} className="w-full">Оплатить</Button>
            )}
            <Button onClick={() => onOpenChange(false)} className="w-full" variant="secondary">
                Закрыть
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
