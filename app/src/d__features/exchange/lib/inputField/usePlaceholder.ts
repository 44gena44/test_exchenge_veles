"use client"
import { calculatePlaceholder } from "@/d__features/exchange/lib/inputField/calculatePlaceholder";
import { valueMask } from "@/shared/lib/string/valueMask";
import { ExchangeCurrencyPosition, ExchangeCurrencyType } from "@/shared/model/exchange";
import { useAppSelector } from "@/shared/model/store/hooks";
import { selectRate } from "@/shared/model/store/selectors";
import { useEffect, useMemo } from "react";

export const usePlaceholder = (position: ExchangeCurrencyPosition, currencyType:ExchangeCurrencyType) => {
  const minValue = useAppSelector((state) => state.exchange.exchangeRate?.currency_give_min_value);
  const rate = useAppSelector(state => state.exchange.exchangeRate?.course);
  const placeholder = useMemo(() => {
    return valueMask(calculatePlaceholder({ minValue: minValue || 0, rate, position, currencyType }));
  }, [minValue, rate, position]);

  return placeholder
};
