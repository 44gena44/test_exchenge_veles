import clsx from "clsx";
import type { SectionHeading as SectionHeadingProps } from "@/shared/model/sectionHeading";
import { ReactNode } from "react";
import { SvgFromUrl } from "../icon";
import { SectionHeading } from "../exchange";
import StoryCryptoData from "@/entities/shortRequestDetails/ui/StoryCryptoData";
import {ExchangeCurrencyPosition} from "@/shared/model/exchange";

type Props = {
  currency: {
    name: string;
    icon: string;
    position?: ExchangeCurrencyPosition;
    description?: string;
  };
  details?: {
      icon?: ReactNode,
      description: string;
  },
  currencyAmount: string;
  children: ReactNode;
};

export const Details = ({

  currency,
                            details,
  children,
  currencyAmount,
}: Props) => {
  return (
    <div className="">
      <div className="bg-[var(--background-secondary)] rounded-[21px] border border-[var(--border-placeholder)] px-20 py-24 flex flex-col gap-20">
        <div className={'flex flex-col gap-21'}>
<StoryCryptoData isBigFormat={true} {...currency} value={currencyAmount}></StoryCryptoData>
            {details &&<div className={'flex items-center px-16 py-3 gap-8 rounded-full border border-[var(--main-color)] w-fit'}>
                    {details?.icon && details?.icon}
                    {details?.description && <span className={'text-16 text-[var(--main-color)] pb-1'}>{details.description}</span>}
                </div>
          }
        </div>
        {children}
      </div>
    </div>
  );
};
