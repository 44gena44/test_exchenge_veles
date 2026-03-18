import { SectionHeading } from "@/shared/ui";
import { memo, useEffect, useState } from "react";
import { LimitNote } from "./LimitNote";
import { CurrencyInput } from "@/entities/currency/ui";

import { useTransferCurrenciesOptions } from "../../lib";
import { useCurrencyAmountError } from "../../lib/useCurrencyAmountError";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import {
  setTransferAbroadCurrency,
  setTransferAbroadCurrencyAmount,
  setMaxCurrencyAmount,
} from "../../model";
import { TransferAbroadCurrency } from "@/shared/model/api";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

type Props = {
  isLimitInfoActive: boolean;
};

export const TransferCurrencyInput = memo(({ isLimitInfoActive }: Props) => {
  const { currencies } = useTransferCurrenciesOptions();

  const [currency, setCurrency] = useState<TransferAbroadCurrency>(
    currencies[0]
  );

  useEffect(() => {
    if (currencies) {
      setCurrency(currencies[0]);
    }
  }, [currencies]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currency) {
      dispatch(setTransferAbroadCurrency(currency));
    }
  }, [currency]);

  const currencyAmount = useAppSelector((state) => state.transferAbroad.amount);

  const handleAmountInput = (value: number | null) => {
    dispatch(setTransferAbroadCurrencyAmount(value));
  };

  const { isAmountInputError, isLimitError } = useCurrencyAmountError();

  useEffect(() => {
    if (isLimitInfoActive && currency?.limit)
      dispatch(setMaxCurrencyAmount(currency.limit));
    else dispatch(setMaxCurrencyAmount(null));
  }, [isLimitInfoActive, currency]);

  const { trackInputChange } = useTrackUserAction();

  const handleSelectCUrrency = (currency: TransferAbroadCurrency) => {
    setCurrency(currency);
    trackInputChange("Валюта", currency.name);
  };


  return (
    <div>
      <SectionHeading
        title="Сумма и валюта"
        minValue={isLimitInfoActive ? currency?.limit : null}
        conditionText="лимит"
        note={<LimitNote />}
        error={isLimitError}
      ></SectionHeading>
      <CurrencyInput
        options={currencies}
        inputValue={currencyAmount}
        onInputChange={handleAmountInput}
        selectValue={currency}
        onSelectChange={handleSelectCUrrency}
        error={isAmountInputError}
        placeholder="50 000"
      ></CurrencyInput>
    </div>
  );
});

TransferCurrencyInput.displayName = "TransferCurrencyInput";
