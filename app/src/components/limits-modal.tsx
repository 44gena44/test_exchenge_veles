"use client";

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { LimitsInfoApiResponse, LimitsInfoItem } from '@/shared/model/api';
import { valueMask } from '@/shared/lib';

const ADDITIONAL_LIMITS_BASE = {
  limit_icon: '/images/icons/card.svg',
  title: 'Общие условия',
} as const;

const parseNumberString = (str: string | number): { number: number | null; string: string } => {
  const strValue = String(str ?? '');
  const numberMatch = strValue.match(/\d+/);
  const stringMatch = strValue.match(/\D+/);
  
  return {
    number: numberMatch ? Number(numberMatch[0]) : null,
    string: stringMatch ? stringMatch[0] : '',
  };
};

const parseDescirption = (str: string) => {
  return `${valueMask(parseNumberString(str).number)} ${parseNumberString(str).string}`
}

const LimitItem = ({ item }: { item:LimitsInfoItem }) => (
    <Card className="p-16 bg-card border-none shadow-none">
       {(item.limit_icon && item.title) && <div className="flex items-center gap-12 mb-16">
            <img src={item.limit_icon} alt="" className='w-40 h-40' />
            <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
        </div>}
        <div className="space-y-12">
            {item.info_list.map((limit, index) => (
                <div key={index} className={limit.title ? 'flex justify-between items-start text-sm gap-8' : 'mt-4'}>
                    {limit.title ? (
                      <>
                        <span className="text-muted-foreground">{limit.title}</span>
                        <span className="font-medium text-foreground">
                          {!!limit.limit_left
                            ? `${valueMask(limit.limit_left)} / ${item.ignoreParseDesc ? limit.description : parseDescirption(limit.description)}`
                            : item.ignoreParseDesc ? limit.description : parseDescirption(limit.description)
                          }
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-foreground text-xs block">
                        {parseDescirption(limit.description)}
                      </span>
                    )}
                </div>
            ))}
        </div>
    </Card>
);

export function LimitsModal({
  isOpen,
  onOpenChange,
  limitsInfo,
  additionalData
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  limitsInfo?: LimitsInfoApiResponse;
  additionalData?: LimitsInfoItem[]
}) {
  // const displayInfoList = React.useMemo(() => {
  //   const backendList = limitsInfo?.info_list ?? [];
  //   const additionalItem: LimitsInfoItem = {
  //     ignoreParseDesc: true,
  //     info_list: [
  //       { title: 'Минимальная сумма', description: `${minAmount.toLocaleString('ru-RU')} ₽` },
  //       { title: 'Комиссия', description: '1–2 USDT' },
  //       { title: '', description: 'Точная сумма будет рассчитана после ввода адреса кошелька' },
  //     ],
  //   };
  //   return [additionalItem, ...backendList];
  // }, [limitsInfo?.info_list, minAmount]);

  const displayInfoList = React.useMemo(() => {
    const backendList = limitsInfo?.info_list ?? [];
    const additionalList = additionalData ?? [];
    return [...additionalList, ...backendList];
  }, [limitsInfo?.info_list, additionalData]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background p-16">
        <DialogHeader className='px-8'>
          <DialogTitle className="text-2xl font-bold">{limitsInfo?.title}</DialogTitle>
          <DialogDescription>
            {limitsInfo?.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 py-16">
          {displayInfoList.map((item, index) => (
            <React.Fragment key={index}>
              <LimitItem item={item} />
              {index < displayInfoList.length - 1 && <Separator className="my-8"/>}
            </React.Fragment>
          ))}
        </div>
    
      </DialogContent>
    </Dialog>
  );
}
