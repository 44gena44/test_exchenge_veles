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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { currencies } from '@/lib/data';
import { ArrowRight, RefreshCw, ChevronDown } from 'lucide-react';

export function ConversionModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [fromCurrency, setFromCurrency] = React.useState('USDT');
  const [toCurrency, setToCurrency] = React.useState('RUB');
  const [fromAmount, setFromAmount] = React.useState('');
  const [toAmount, setToAmount] = React.useState('');
  const [demoRate, setDemoRate] = React.useState(() =>
    Number((76 + Math.random() * 8).toFixed(2))
  );

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  // Dummy conversion rate
  React.useEffect(() => {
    if (fromAmount) {
      const parsed = parseFloat(fromAmount);
      if (Number.isNaN(parsed)) {
        setToAmount('');
        return;
      }
      const converted = fromCurrency === 'USDT'
        ? parsed * demoRate
        : parsed / demoRate;
      setToAmount(converted.toFixed(2));
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromCurrency, toCurrency, demoRate]);

  React.useEffect(() => {
    if (!isOpen) return;
    setDemoRate(Number((76 + Math.random() * 8).toFixed(2)));
  }, [isOpen, fromCurrency, toCurrency]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Мгновенный обмен</DialogTitle>
          <DialogDescription>
            Быстрый обмен криптовалют по выгодному курсу.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <div className="grid grid-cols-1 gap-2">
               <div className="bg-card p-4 rounded-xl border">
                   <p className="text-xs text-muted-foreground mb-1">Вы отправляете</p>
                    <div className="flex items-center justify-between">
                         <Input 
                           type="number"
                           placeholder="0.00" 
                           value={fromAmount}
                           onChange={(e) => setFromAmount(e.target.value)}
                           className="text-2xl font-bold border-none p-0 focus-visible:ring-0" 
                         />
                         <Select value={fromCurrency} onValueChange={setFromCurrency}>
                             <SelectTrigger className="w-auto border-none focus:ring-0 gap-2 font-semibold">
                                 <SelectValue placeholder="Валюта" />
                             </SelectTrigger>
                             <SelectContent>
                                 {currencies.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                             </SelectContent>
                         </Select>
                    </div>
               </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Button variant="ghost" size="icon" className="bg-background hover:bg-muted rounded-full border" onClick={handleSwap}>
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>

             <div className="bg-card p-4 rounded-xl border mt-2">
                   <p className="text-xs text-muted-foreground mb-1">Вы получаете</p>
                    <div className="flex items-center justify-between">
                         <Input 
                           type="number"
                           placeholder="0.00" 
                           value={toAmount}
                           readOnly
                           className="text-2xl font-bold border-none p-0 focus-visible:ring-0" 
                         />
                         <Select value={toCurrency} onValueChange={setToCurrency}>
                             <SelectTrigger className="w-auto border-none focus:ring-0 gap-2 font-semibold">
                                 <SelectValue placeholder="Валюта" />
                             </SelectTrigger>
                             <SelectContent>
                                 {currencies.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                             </SelectContent>
                         </Select>
                    </div>
               </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Курс: 1 USDT ≈ {demoRate.toFixed(2)} RUB
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full h-12 text-base font-bold">
            Обменять
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
