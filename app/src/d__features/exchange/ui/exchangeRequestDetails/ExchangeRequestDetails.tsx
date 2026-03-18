import React, {memo} from "react";
import clsx from "clsx";
import {CardIcon, CashIcon, CryptoIcon, Details, DetailsDescription} from "@/shared/ui";
import {ExchangeCurrencyDetails} from "@/shared/model/exchange/exchangeCurrencyDetails";
import {SectionHeading} from "@/shared/model/sectionHeading";

export type ExchangeRequestDetailsProps = {
    currency: ExchangeCurrencyDetails;
    giveOperationDescription?: string;
    receiveOperationDescription?: string;
};

export const ExchangeRequestDetails: React.FC<ExchangeRequestDetailsProps> = memo(
    ({currency, giveOperationDescription = 'отдаете', receiveOperationDescription = 'получаете'}) => {
        return (
            <>
                <Details
                    currency={{
                        icon: currency.icon,
                        name: currency.name,
                        position: currency.position,
                        description: currency.position === 'given' ? giveOperationDescription : receiveOperationDescription,
                    }}
                    currencyAmount={currency.value}
                    details={{
                        description: currency.typeLabel,
                        icon: (() => {
                            switch (currency.type) {
                                case 'BANK':
                                    return <CardIcon className={'w-16 h-16'}></CardIcon>
                                case 'CASH':
                                    return <CashIcon className={'w-21 h-21 '}></CashIcon>
                                case 'COIN':
                                    return <CryptoIcon className={'w-16 h-16'}></CryptoIcon>
                            }
                        })(),
                    }
                    }
                >
                    <>
                        {currency.wayDetails && (
                            <DetailsDescription
                                title={currency.wayDetails.title}
                                description={currency.wayDetails.value}
                                descriptionClassName={clsx({
                                    "max-w-250 [&]:leading-normal break-all": currency.type === "COIN",
                                    "tracking-[3px] break-all": currency.type === "BANK",
                                })}
                            />

                        )}
                    </>
                </Details>

            </>
        );
    }
);

ExchangeRequestDetails.displayName = "ExchangeRequestDetails";
