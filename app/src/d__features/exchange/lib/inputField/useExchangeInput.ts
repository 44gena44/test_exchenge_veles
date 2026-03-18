"use client"

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/model/store/hooks";
import {
  selectInputValue,
  selectValueError,
  selectAreErrorsVisible,
  selectCurrencyTypes,
  selectCurrency
} from "@/shared/model/store/selectors";
import { setActiveInputType, setCurrencyBuyAmountValue, setCurrencySellAmountValue, setSelectedCurrencyBuy, setSelectedCurrencySell } from "@/d__features/exchange/model/store/reducer/exchangeReducer/exchangeReducer";
import { Currency } from "@/shared/model/api/exchange/types";
import { ExchangeCurrencyPosition } from "@/shared/model/exchange";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

export type ExchangeInputType = "BANK" | "CASH" | "COIN";

export const useExchangeInput = (position: ExchangeCurrencyPosition) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const dispatch = useAppDispatch();
  const { givenType, receivedType } = useAppSelector(selectCurrencyTypes);
  const globalStateValue = useAppSelector(selectInputValue(position));
  const valueError = useAppSelector(selectValueError(position));
  const areErrorsVisible = useAppSelector(selectAreErrorsVisible);
  const selectedCurrency = useAppSelector(selectCurrency(position));
  const currenciesSell = useAppSelector(state => state.exchange.currenciesSell);  
  const currenciesBuy = useAppSelector(state => state.exchange.currenciesBuy);

  const { trackInputChange } = useTrackUserAction();

  const onSelectChange = useCallback((option: Currency) => {
      trackInputChange(`Валюта ${position === 'received' ? 'продажи' : 'покупки'}`, option.name);

    const currency = position === 'given' 
      ? currenciesSell.find((currency) => currency.id === option.id)
      : currenciesBuy.find((currency) => currency.id === option.id);

    if (currency) {
      dispatch(position === 'given' ? setSelectedCurrencySell(currency) : setSelectedCurrencyBuy(currency));
    }
  }, [dispatch, position, currenciesSell, currenciesBuy]);

  const onInputChange = useCallback((value: number | null) => {
    dispatch(setActiveInputType(position));
    switch (position) {
      case "given":
        dispatch(setCurrencySellAmountValue(value));
        break;
      case "received":
        dispatch(setCurrencyBuyAmountValue(value));
        break;

    }
  }, [dispatch, position]);

  useEffect(() => {
    setIsInitialLoad(true);
  }, [givenType, receivedType]);

  useEffect(() => {
    setIsInitialLoad(true);
  }, []);

  return {
    selectedCurrency,
    isInitialLoad,
    setIsInitialLoad,
    globalStateValue,
    valueError,
    areErrorsVisible,
    onSelectChange,
    onInputChange
  };
}; 