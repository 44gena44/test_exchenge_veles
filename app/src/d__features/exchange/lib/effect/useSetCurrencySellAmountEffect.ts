import {
  selectExchangeInputsState,
  setCurrencyBuyAmountValue,
} from "@/d__features/exchange/model";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { useEffect } from "react";
import { calculateInputAmountBasedOnAnotherOne } from "../inputField";

export const useSetCurrencySellAmountEffect = () => {
  const dispatch = useAppDispatch();
  const {
    selectedCurrencySellType,
    selectedCurrencyBuyType,
    selectedCurrencyBuy,
    selectedCurrencySell,
    currencySellAmount,
    rate,
    activeInputType,
  } = useAppSelector(selectExchangeInputsState);

  useEffect(() => {
    if (
      !selectedCurrencySellType ||
      !selectedCurrencyBuyType ||
      !selectedCurrencySell ||
      !selectedCurrencyBuy ||
      !rate ||
      activeInputType !== "given"
    )
      return;

    const currencyBuyAmount = calculateInputAmountBasedOnAnotherOne(
      currencySellAmount.value,
      rate,
      "given"
    );
    dispatch(setCurrencyBuyAmountValue(currencyBuyAmount));
  }, [currencySellAmount.value]);
};
