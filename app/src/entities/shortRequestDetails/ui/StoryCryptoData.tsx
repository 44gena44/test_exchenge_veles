import React from "react";
import  { ArrowRightIcon } from "../../../shared/ui/icon";
import clsx from "clsx";
import {ExchangeCurrencyPosition} from "@/shared/model/exchange";

export type StoryCryptoDataProps = {
  icon: string;
  name: string;
  value: string;
  position?: ExchangeCurrencyPosition,
    description?: string;
  isBigFormat?: boolean;
};

const StoryCryptoData: React.FC<StoryCryptoDataProps> = ({
  icon,
  name,
  value,
    position,
    description,
    isBigFormat,
}) => {
  return (
    <div className="flex items-end">
    <div className="relative mr-13">
        <img src={icon} className={clsx("w-25 h-25 shrink-0", {'[&]:w-39 [&]:h-39':isBigFormat})}></img>
        { position && <img src={position === 'given' ? '/images/icons/arrow_outcome.svg' : '/images/icons/arrow_income.svg'}
              className={clsx('absolute bottom-[-1px] right-[-6px] w-15 h-15', {'[&]:w-23 [&]:h-23 [&]:bottom-[-3px] [&]:right-[-10px]':isBigFormat})}></img>
        }
    </div>
     <div className={'flex flex-col gap-2'}>
         <span className={'text-13 text-[var(--text-light)]'}>{description || ''}</span>
         <div className="flex items-end">
             <span className={'text-21 text-[var(--text-main)] leading-normal mr-8'}>{value}</span>
             <span className={'text-13 text-[var(--text-light)] leading-normal'}>{name}</span>
         </div>
     </div>
    </div>
  );
};

export default StoryCryptoData;
